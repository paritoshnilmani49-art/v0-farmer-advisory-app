"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Wheat, Calendar, AlertTriangle, CheckCircle, TrendingUp, Droplets } from "lucide-react"
import Link from "next/link"

interface CropAdvisoryInterfaceProps {
  farmer: {
    full_name: string
    location?: string
    primary_crops?: string[]
  } | null
  farmerId: string
  advisories: Array<{
    id: string
    crop_type: string
    advisory_text: string
    advisory_type: string
    created_at: string
  }>
}

export function CropAdvisoryInterface({ farmer, farmerId, advisories }: CropAdvisoryInterfaceProps) {
  const [selectedCrop, setSelectedCrop] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "fertilizer":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pest_control":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "harvest":
        return <Calendar className="h-4 w-4 text-blue-600" />
      case "planting":
        return <Wheat className="h-4 w-4 text-amber-600" />
      case "irrigation":
        return <Droplets className="h-4 w-4 text-blue-500" />
      default:
        return <TrendingUp className="h-4 w-4 text-gray-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "fertilizer":
        return "bg-green-50 text-green-700 border-green-200"
      case "pest_control":
        return "bg-red-50 text-red-700 border-red-200"
      case "harvest":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "planting":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "irrigation":
        return "bg-cyan-50 text-cyan-700 border-cyan-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const filteredAdvisories = advisories.filter((advisory) => {
    const cropMatch = selectedCrop === "all" || advisory.crop_type.toLowerCase() === selectedCrop
    const typeMatch = selectedType === "all" || advisory.advisory_type === selectedType
    return cropMatch && typeMatch
  })

  // Mock current season advisories
  const currentSeasonAdvisories = [
    {
      id: "current-1",
      crop_type: "Wheat",
      advisory_text:
        "Spring wheat planting season is approaching. Prepare your fields by testing soil moisture and temperature. Optimal planting occurs when soil temperature reaches 40°F consistently.",
      advisory_type: "planting",
      priority: "high",
      timeframe: "Next 2 weeks",
    },
    {
      id: "current-2",
      crop_type: "Corn",
      advisory_text:
        "Begin preparing corn fields for planting. Apply pre-emergent herbicides if needed. Monitor weather forecasts for optimal planting windows.",
      advisory_type: "planting",
      priority: "medium",
      timeframe: "Next 3 weeks",
    },
    {
      id: "current-3",
      crop_type: "Soybeans",
      advisory_text:
        "Consider nitrogen fixation benefits when planning soybean rotation. Soil temperature should reach 50°F for optimal germination.",
      advisory_type: "planting",
      priority: "low",
      timeframe: "Next month",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="bg-amber-600 p-2 rounded-full">
                <Wheat className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-green-800">Crop Advisory</h1>
                <p className="text-sm text-green-600">Personalized farming recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Current Season Advisories */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-amber-600" />
              Current Season Recommendations
            </CardTitle>
            <CardDescription>Time-sensitive advice for {farmer?.location || "your area"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentSeasonAdvisories.map((advisory) => (
                <div key={advisory.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(advisory.advisory_type)}
                      <span className="font-medium text-gray-800">{advisory.crop_type}</span>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        advisory.priority === "high"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : advisory.priority === "medium"
                            ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                            : "bg-green-50 text-green-700 border-green-200"
                      }
                    >
                      {advisory.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700">{advisory.advisory_text}</p>
                  <div className="flex items-center justify-between text-xs">
                    <Badge variant="secondary" className="text-xs">
                      {advisory.advisory_type.replace("_", " ")}
                    </Badge>
                    <span className="text-gray-500">{advisory.timeframe}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Advisory History</CardTitle>
            <CardDescription>Filter and view your past recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Crops</SelectItem>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="corn">Corn</SelectItem>
                    <SelectItem value="soybeans">Soybeans</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="planting">Planting</SelectItem>
                    <SelectItem value="fertilizer">Fertilizer</SelectItem>
                    <SelectItem value="pest_control">Pest Control</SelectItem>
                    <SelectItem value="harvest">Harvest</SelectItem>
                    <SelectItem value="irrigation">Irrigation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Advisory List */}
            <div className="space-y-4">
              {filteredAdvisories.length > 0 ? (
                filteredAdvisories.map((advisory) => (
                  <div key={advisory.id} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(advisory.advisory_type)}
                        <span className="font-medium text-gray-800">{advisory.crop_type}</span>
                        <Badge variant="outline" className={getTypeColor(advisory.advisory_type)}>
                          {advisory.advisory_type.replace("_", " ")}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(advisory.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{advisory.advisory_text}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Wheat className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No advisories found for the selected filters</p>
                  <p className="text-sm">Try adjusting your filter criteria</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
