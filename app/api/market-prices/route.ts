import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const location = searchParams.get("location") || "Delhi"

  try {
    // Mock market data - in production, integrate with market price APIs
    const marketData = {
      location,
      lastUpdated: new Date().toISOString(),
      prices: [
        {
          crop: "Wheat",
          variety: "HD-2967",
          price: 2150,
          unit: "per quintal",
          change: 50,
          changePercent: 2.4,
          market: "APMC Azadpur",
        },
        {
          crop: "Rice",
          variety: "Basmati",
          price: 4200,
          unit: "per quintal",
          change: -100,
          changePercent: -2.3,
          market: "APMC Azadpur",
        },
        {
          crop: "Sugarcane",
          variety: "Co-238",
          price: 350,
          unit: "per quintal",
          change: 15,
          changePercent: 4.5,
          market: "Local Market",
        },
        {
          crop: "Cotton",
          variety: "Bt Cotton",
          price: 5800,
          unit: "per quintal",
          change: 200,
          changePercent: 3.6,
          market: "Cotton Market",
        },
        {
          crop: "Maize",
          variety: "Hybrid",
          price: 1850,
          unit: "per quintal",
          change: -25,
          changePercent: -1.3,
          market: "APMC Azadpur",
        },
      ],
      trends: {
        rising: ["Wheat", "Sugarcane", "Cotton"],
        falling: ["Rice", "Maize"],
        stable: [],
      },
    }

    return NextResponse.json(marketData)
  } catch (error) {
    console.error("Market API error:", error)
    return NextResponse.json({ error: "Failed to fetch market data" }, { status: 500 })
  }
}
