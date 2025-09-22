import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const location = searchParams.get("location") || "New Delhi"

  try {
    // Mock weather data - in production, integrate with weather API
    const weatherData = {
      location,
      current: {
        temperature: 28,
        condition: "Partly Cloudy",
        humidity: 65,
        windSpeed: 12,
        uvIndex: 6,
      },
      forecast: [
        {
          date: "2024-01-15",
          high: 30,
          low: 18,
          condition: "Sunny",
          precipitation: 0,
        },
        {
          date: "2024-01-16",
          high: 32,
          low: 20,
          condition: "Partly Cloudy",
          precipitation: 10,
        },
        {
          date: "2024-01-17",
          high: 29,
          low: 17,
          condition: "Light Rain",
          precipitation: 70,
        },
        {
          date: "2024-01-18",
          high: 27,
          low: 16,
          condition: "Cloudy",
          precipitation: 30,
        },
        {
          date: "2024-01-19",
          high: 31,
          low: 19,
          condition: "Sunny",
          precipitation: 0,
        },
      ],
      alerts: [
        {
          type: "warning",
          title: "Heavy Rain Expected",
          description: "Heavy rainfall expected tomorrow. Consider postponing field activities.",
        },
      ],
    }

    return NextResponse.json(weatherData)
  } catch (error) {
    console.error("Weather API error:", error)
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}
