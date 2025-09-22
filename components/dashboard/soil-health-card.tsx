"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { TestTube, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { useEffect, useState } from "react"

interface SoilData {
  ph_level: number
  nitrogen_level: string
  phosphorus_level: string
  potassium_level: string
  organic_matter: number
  test_date: string
}

interface SoilHealthCardProps {
  farmerId: string
}

export function SoilHealthCard({ farmerId }: SoilHealthCardProps) {
  const [soilData, setSoilData] = useState<SoilData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching soil data
    const fetchSoilData = async () => {
      setLoading(true)
      // Mock soil data
      setTimeout(() => {
        setSoilData({
          ph_level: 6.8,
          nitrogen_level: "medium",
          phosphorus_level: "high",
          potassium_level: "low",
          organic_matter: 3.2,
          test_date: "2024-01-15",
        })
        setLoading(false)
      }, 1000)
    }

    fetchSoilData()
  }, [farmerId])

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "high":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case "high":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "medium":
        return <Minus className="h-4 w-4 text-yellow-600" />
      case "low":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getLevelProgress = (level: string) => {
    switch (level.toLowerCase()) {
      case "high":
        return 80
      case "medium":
        return 50
      case "low":
        return 20
      default:
        return 0
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5" />
            Soil Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="h-5 w-5 text-purple-600" />
          Soil Health
        </CardTitle>
        <CardDescription>
          Latest soil analysis from {soilData?.test_date && new Date(soilData.test_date).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* pH Level */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-800">pH Level</span>
            <span className="text-2xl font-bold text-purple-600">{soilData?.ph_level}</span>
          </div>
          <Progress value={(soilData?.ph_level || 0) * 10} className="h-2" />
          <p className="text-xs text-gray-600 mt-1">Optimal range: 6.0 - 7.0</p>
        </div>

        {/* Nutrient Levels */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getLevelIcon(soilData?.nitrogen_level || "")}
              <span className="text-sm font-medium">Nitrogen</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${getLevelColor(soilData?.nitrogen_level || "")}`}>
                {soilData?.nitrogen_level}
              </span>
              <Progress value={getLevelProgress(soilData?.nitrogen_level || "")} className="w-20 h-2" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getLevelIcon(soilData?.phosphorus_level || "")}
              <span className="text-sm font-medium">Phosphorus</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${getLevelColor(soilData?.phosphorus_level || "")}`}>
                {soilData?.phosphorus_level}
              </span>
              <Progress value={getLevelProgress(soilData?.phosphorus_level || "")} className="w-20 h-2" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getLevelIcon(soilData?.potassium_level || "")}
              <span className="text-sm font-medium">Potassium</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${getLevelColor(soilData?.potassium_level || "")}`}>
                {soilData?.potassium_level}
              </span>
              <Progress value={getLevelProgress(soilData?.potassium_level || "")} className="w-20 h-2" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Organic Matter</span>
            <span className="text-sm font-medium text-green-600">{soilData?.organic_matter}%</span>
          </div>
        </div>

        <div className="pt-2">
          <Button
            variant="outline"
            className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
          >
            Schedule Soil Test
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
