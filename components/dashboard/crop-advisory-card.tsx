"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wheat, Calendar, AlertTriangle, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"

interface Advisory {
  id: string
  crop_type: string
  advisory_text: string
  advisory_type: string
  created_at: string
  priority: "high" | "medium" | "low"
}

interface CropAdvisoryCardProps {
  farmerId: string
  crops?: string[]
}

export function CropAdvisoryCard({ farmerId, crops }: CropAdvisoryCardProps) {
  const [advisories, setAdvisories] = useState<Advisory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching advisories
    const fetchAdvisories = async () => {
      setLoading(true)
      // Mock advisory data
      setTimeout(() => {
        setAdvisories([
          {
            id: "1",
            crop_type: "Wheat",
            advisory_text:
              "Consider applying nitrogen fertilizer this week. Soil conditions are optimal for nutrient absorption.",
            advisory_type: "fertilizer",
            created_at: new Date().toISOString(),
            priority: "high",
          },
          {
            id: "2",
            crop_type: "Corn",
            advisory_text: "Monitor for corn borer activity. Early detection can prevent significant crop damage.",
            advisory_type: "pest_control",
            created_at: new Date().toISOString(),
            priority: "medium",
          },
          {
            id: "3",
            crop_type: "Soybeans",
            advisory_text: "Harvest window opens in 2 weeks. Prepare equipment and check moisture levels.",
            advisory_type: "harvest",
            created_at: new Date().toISOString(),
            priority: "low",
          },
        ])
        setLoading(false)
      }, 1000)
    }

    fetchAdvisories()
  }, [farmerId])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-700 border-red-200"
      case "medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "low":
        return "bg-green-50 text-green-700 border-green-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "fertilizer":
        return <CheckCircle className="h-4 w-4" />
      case "pest_control":
        return <AlertTriangle className="h-4 w-4" />
      case "harvest":
        return <Calendar className="h-4 w-4" />
      default:
        return <Wheat className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wheat className="h-5 w-5" />
            Crop Advisory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
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
          <Wheat className="h-5 w-5 text-amber-600" />
          Crop Advisory
        </CardTitle>
        <CardDescription>Personalized recommendations for your crops</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {advisories.map((advisory) => (
          <div key={advisory.id} className="p-4 border rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getTypeIcon(advisory.advisory_type)}
                <span className="font-medium text-gray-800">{advisory.crop_type}</span>
                <Badge variant="outline" className={getPriorityColor(advisory.priority)}>
                  {advisory.priority} priority
                </Badge>
              </div>
              <Badge variant="secondary" className="text-xs">
                {advisory.advisory_type.replace("_", " ")}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">{advisory.advisory_text}</p>
          </div>
        ))}

        <div className="pt-2">
          <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50 bg-transparent">
            View All Recommendations
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
