import { type NextRequest, NextResponse } from "next/server"
import { google } from "@ai-sdk/google"
import { generateObject } from "ai"
import { z } from "zod"

const pestAnalysisSchema = z.object({
  pestIdentified: z.string().describe("Name of the identified pest or disease"),
  confidence: z.number().min(0).max(100).describe("Confidence level in percentage"),
  severity: z.enum(["low", "medium", "high"]).describe("Severity of the infestation"),
  description: z.string().describe("Detailed description of the pest/disease"),
  symptoms: z.array(z.string()).describe("List of visible symptoms"),
  treatment: z.object({
    immediate: z.array(z.string()).describe("Immediate treatment steps"),
    longTerm: z.array(z.string()).describe("Long-term management strategies"),
    organic: z.array(z.string()).describe("Organic treatment options"),
    chemical: z.array(z.string()).describe("Chemical treatment options if needed"),
  }),
  prevention: z.array(z.string()).describe("Prevention measures for future"),
  economicImpact: z.string().describe("Potential economic impact if untreated"),
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get("image") as File
    const cropType = formData.get("cropType") as string
    const symptoms = formData.get("symptoms") as string

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    // Convert image to base64 for AI analysis
    const bytes = await image.arrayBuffer()
    const base64 = Buffer.from(bytes).toString("base64")

    // Use Gemini Vision to analyze the pest/disease
    const result = await generateObject({
      model: google("gemini-1.5-flash"),
      schema: pestAnalysisSchema,
      prompt: `Analyze this image of a ${cropType} plant showing these symptoms: ${symptoms}. 
               Identify any pests, diseases, or nutrient deficiencies visible in the image.
               Provide detailed treatment recommendations suitable for small-scale farmers.
               Consider both organic and chemical treatment options.
               Base64 image: data:image/jpeg;base64,${base64}`,
    })

    return NextResponse.json({
      success: true,
      analysis: result.object,
    })
  } catch (error) {
    console.error("Pest detection error:", error)
    return NextResponse.json({ error: "Failed to analyze image" }, { status: 500 })
  }
}
