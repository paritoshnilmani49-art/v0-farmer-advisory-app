import { google } from "@ai-sdk/google"
import { convertToModelMessages, streamText, type UIMessage, tool } from "ai"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

export const maxDuration = 30

const getCropAdvisoryTool = tool({
  description: "Get specific crop advisory information based on crop type, location, and current conditions",
  inputSchema: z.object({
    cropType: z.string().describe("Type of crop (e.g., wheat, corn, rice)"),
    location: z.string().describe("Farmer location"),
    issue: z.string().describe("Specific farming issue or question"),
  }),
  execute: async ({ cropType, location, issue }) => {
    // Enhanced crop advisory with more practical information
    const seasonalAdvice = {
      wheat: "Monitor for rust diseases, ensure proper nitrogen application during tillering stage",
      corn: "Watch for corn borer, maintain adequate soil moisture during tasseling",
      rice: "Control water levels, watch for blast disease, ensure proper spacing",
      soybean: "Monitor for aphids, ensure proper inoculation, watch for sudden death syndrome",
    }

    return {
      cropType,
      location,
      advisory: `For ${cropType} in ${location}: ${seasonalAdvice[cropType.toLowerCase() as keyof typeof seasonalAdvice] || "General crop management advice"}. Specific to your issue: ${issue}`,
      recommendations: [
        "Monitor soil moisture levels daily",
        "Apply fertilizer based on soil test results",
        "Scout for pests and diseases weekly",
        "Maintain proper plant spacing and density",
      ],
      timing: "Best practices vary by season - consider current weather patterns",
    }
  },
})

const getSoilHealthTool = tool({
  description: "Provide soil health recommendations and analysis",
  inputSchema: z.object({
    soilType: z.string().describe("Type of soil"),
    cropType: z.string().describe("Crop being grown"),
    symptoms: z.string().describe("Any visible symptoms or concerns"),
  }),
  execute: async ({ soilType, cropType, symptoms }) => {
    return {
      analysis: `For ${soilType} soil growing ${cropType}: ${symptoms}`,
      recommendations: [
        "Test soil pH - ideal range is 6.0-7.0 for most crops",
        "Check N-P-K levels and adjust fertilization accordingly",
        "Add organic matter to improve soil structure",
        "Ensure proper drainage to prevent waterlogging",
        "Consider cover crops to improve soil health",
      ],
      nextSteps: "Schedule comprehensive soil test every 2-3 years",
      urgency:
        symptoms.toLowerCase().includes("yellowing") || symptoms.toLowerCase().includes("wilting")
          ? "Address immediately"
          : "Monitor regularly",
    }
  },
})

const getPestControlTool = tool({
  description: "Identify pests and provide treatment recommendations",
  inputSchema: z.object({
    pestDescription: z.string().describe("Description of the pest or damage observed"),
    cropType: z.string().describe("Affected crop"),
    severity: z.enum(["low", "medium", "high"]).describe("Severity of infestation"),
  }),
  execute: async ({ pestDescription, cropType, severity }) => {
    const organicTreatments = [
      "Neem oil spray for soft-bodied insects",
      "Beneficial insects like ladybugs for aphid control",
      "Diatomaceous earth for crawling insects",
      "Companion planting with pest-repelling plants",
    ]

    const chemicalTreatments = [
      "Targeted insecticides (follow label instructions)",
      "Systemic treatments for severe infestations",
      "Fungicides for disease-related issues",
    ]

    return {
      likelyPest: `Based on description: ${pestDescription} on ${cropType}`,
      organicOptions: organicTreatments,
      chemicalOptions: severity === "high" ? chemicalTreatments : ["Consider organic methods first"],
      preventionTips: [
        "Regular field scouting (2-3 times per week)",
        "Maintain field hygiene - remove crop residues",
        "Use resistant varieties when available",
        "Rotate crops to break pest cycles",
      ],
      urgency:
        severity === "high"
          ? "Immediate action required - treat within 24-48 hours"
          : "Monitor closely and treat as needed",
      safetyNote: "Always wear protective equipment when applying treatments",
    }
  },
})

const tools = {
  getCropAdvisory: getCropAdvisoryTool,
  getSoilHealth: getSoilHealthTool,
  getPestControl: getPestControlTool,
}

export async function POST(req: Request) {
  try {
    const { messages, farmerId }: { messages: UIMessage[]; farmerId?: string } = await req.json()

    // Get farmer context for personalized advice
    const supabase = await createClient()
    let farmer = null

    if (farmerId) {
      const { data } = await supabase.from("farmers").select("*").eq("id", farmerId).single()
      farmer = data
    }

    const systemPrompt = `You are FarmWise AI, a friendly and knowledgeable agricultural advisor helping farmers grow better crops and increase their yields. You speak in simple, clear language that farmers can easily understand.

${
  farmer
    ? `Farmer Information:
- Name: ${farmer.full_name}
- Location: ${farmer.location || "Not specified"}
- Farm Size: ${farmer.farm_size || "Not specified"} acres
- Primary Crops: ${farmer.primary_crops?.join(", ") || "Various crops"}
- Language: ${farmer.language_preference || "English"}`
    : ""
}

Your role as FarmWise AI:
- Give practical, easy-to-follow farming advice
- Use simple words that any farmer can understand
- Always consider the farmer's specific crops and location
- Provide step-by-step instructions when possible
- Be encouraging and supportive
- Focus on cost-effective and sustainable solutions
- Ask questions to better understand the farmer's situation

Guidelines for your responses:
- Start with a friendly greeting
- Give specific, actionable advice
- Explain WHY something works, not just what to do
- Consider weather, season, and timing
- Suggest both immediate actions and long-term strategies
- Always prioritize farmer safety
- Use the tools available to provide detailed recommendations
- End with encouragement or next steps

Remember: You're helping hardworking farmers feed their families and communities. Be patient, helpful, and always ready to explain things in different ways if needed.`

    const prompt = convertToModelMessages([{ role: "system", content: systemPrompt }, ...messages])

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      throw new Error("GOOGLE_GENERATIVE_AI_API_KEY environment variable is not set")
    }

    const result = streamText({
      model: google("gemini-1.5-flash"),
      messages: prompt,
      tools,
      maxOutputTokens: 2000,
      temperature: 0.7,
      abortSignal: req.signal,
    })

    // Save chat history to database
    if (farmerId) {
      try {
        const lastMessage = messages[messages.length - 1]
        if (lastMessage && lastMessage.role === "user") {
          result.then(async (response) => {
            try {
              const fullText = await response.text
              await supabase.from("chat_history").insert({
                farmer_id: farmerId,
                message: lastMessage.content as string,
                response: fullText,
                language: farmer?.language_preference || "english",
                message_type: "chat",
              })
            } catch (dbError) {
              console.error("Error saving chat history:", dbError)
            }
          })
        }
      } catch (error) {
        console.error("Error processing chat history:", error)
      }
    }

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("Chat API Error:", error)
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "An error occurred processing your request",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
