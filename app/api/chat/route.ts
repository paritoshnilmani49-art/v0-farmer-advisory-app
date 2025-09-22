import { google } from "@ai-sdk/google"
import { convertToModelMessages, streamText, type UIMessage, tool } from "ai"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

export const maxDuration = 30

// Agricultural tools for the AI assistant
const getCropAdvisoryTool = tool({
  description: "Get specific crop advisory information based on crop type, location, and current conditions",
  inputSchema: z.object({
    cropType: z.string().describe("Type of crop (e.g., wheat, corn, rice)"),
    location: z.string().describe("Farmer location"),
    issue: z.string().describe("Specific farming issue or question"),
  }),
  execute: async ({ cropType, location, issue }) => {
    // Simulate crop advisory database lookup
    return {
      cropType,
      location,
      advisory: `For ${cropType} in ${location}: Based on current conditions, here's specific advice for ${issue}. Consider soil moisture levels, weather patterns, and seasonal timing.`,
      recommendations: [
        "Monitor soil moisture regularly",
        "Apply appropriate fertilizer based on soil test",
        "Watch for common pests in your region",
      ],
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
        "Test soil pH levels",
        "Check nutrient balance (N-P-K)",
        "Consider organic matter content",
        "Evaluate drainage conditions",
      ],
      nextSteps: "Schedule a comprehensive soil test for detailed analysis",
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
    return {
      likelyPest: `Based on description: ${pestDescription} on ${cropType}`,
      treatmentOptions: [
        "Organic treatment options",
        "Chemical control methods",
        "Integrated pest management approach",
      ],
      preventionTips: ["Regular crop monitoring", "Maintain field hygiene", "Use resistant varieties when available"],
      urgency: severity === "high" ? "Immediate action required" : "Monitor and treat as needed",
    }
  },
})

const tools = {
  getCropAdvisory: getCropAdvisoryTool,
  getSoilHealth: getSoilHealthTool,
  getPestControl: getPestControlTool,
}

export async function POST(req: Request) {
  const { messages, farmerId }: { messages: UIMessage[]; farmerId: string } = await req.json()

  // Get farmer context for personalized advice
  const supabase = await createClient()
  const { data: farmer } = await supabase.from("farmers").select("*").eq("id", farmerId).single()

  const systemPrompt = `You are FarmWise AI, an expert agricultural advisor helping farmers optimize their crop production. 

Farmer Context:
- Name: ${farmer?.full_name || "Farmer"}
- Location: ${farmer?.location || "Unknown"}
- Farm Size: ${farmer?.farm_size || "Unknown"} acres
- Primary Crops: ${farmer?.primary_crops?.join(", ") || "Various"}
- Language: ${farmer?.language_preference || "English"}

Your role:
- Provide practical, actionable farming advice
- Consider local conditions and farmer's specific crops
- Use simple, clear language appropriate for farmers
- Prioritize sustainable and cost-effective solutions
- Always ask clarifying questions when needed
- Use the available tools to provide specific recommendations

Guidelines:
- Be encouraging and supportive
- Explain the reasoning behind recommendations
- Consider seasonal timing and weather conditions
- Suggest both immediate actions and long-term strategies
- Emphasize safety when discussing chemicals or equipment`

  const prompt = convertToModelMessages([{ role: "system", content: systemPrompt }, ...messages])

  const result = streamText({
    model: google("gemini-1.5-flash"),
    messages: prompt,
    tools,
    maxOutputTokens: 2000,
    temperature: 0.7,
    abortSignal: req.signal,
  })

  // Save chat history to database
  try {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage && lastMessage.role === "user") {
      // We'll save the complete conversation after the AI responds
      result.then(async (response) => {
        const fullText = await response.text
        await supabase.from("chat_history").insert({
          farmer_id: farmerId,
          message: lastMessage.content as string,
          response: fullText,
          language: farmer?.language_preference || "english",
        })
      })
    }
  } catch (error) {
    console.error("Error saving chat history:", error)
  }

  return result.toUIMessageStreamResponse()
}
