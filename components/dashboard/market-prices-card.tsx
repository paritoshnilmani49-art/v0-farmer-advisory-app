"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { useEffect, useState } from "react"

interface MarketPrice {
  crop_name: string
  price_per_kg: number
  change: number
  market_name: string
}

interface MarketPricesCardProps {
  location?: string
}

export function MarketPricesCard({ location }: MarketPricesCardProps) {
  const [prices, setPrices] = useState<MarketPrice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching market prices
    const fetchPrices = async () => {
      setLoading(true)
      // Mock market data
      setTimeout(() => {
        setPrices([
          { crop_name: "Wheat", price_per_kg: 2.45, change: 0.12, market_name: "Local Market" },
          { crop_name: "Corn", price_per_kg: 1.89, change: -0.05, market_name: "Regional Hub" },
          { crop_name: "Soybeans", price_per_kg: 3.21, change: 0.08, market_name: "Local Market" },
          { crop_name: "Rice", price_per_kg: 1.67, change: -0.02, market_name: "Regional Hub" },
        ])
        setLoading(false)
      }, 1000)
    }

    fetchPrices()
  }, [location])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Market Prices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-600" />
          Market Prices
        </CardTitle>
        <CardDescription>Current prices in {location || "your area"}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {prices.map((price, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <div className="font-medium text-gray-800">{price.crop_name}</div>
              <div className="text-xs text-gray-500">{price.market_name}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold">${price.price_per_kg.toFixed(2)}/kg</div>
              <div className="flex items-center gap-1">
                {price.change > 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={`text-xs ${price.change > 0 ? "text-green-600" : "text-red-600"}`}>
                  {price.change > 0 ? "+" : ""}
                  {price.change.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
