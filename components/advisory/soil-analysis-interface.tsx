"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TestTube, TrendingUp, TrendingDown, Minus, Calendar, Plus } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

interface SoilAnalysisInterfaceProps {
  farmer: {
    full_name: string
    location?: string
    primary_crops?: string[]
  } | null
  farmerId: string
  soilRecords: Array<{
    id: string
    ph_level: number
    nitrogen_level: string
    phosphorus_level: string
    potassium_level: string
    organic_matter: number
    recommendations: string
    test_date: string
    created_at: string
  }>
}

export function SoilAnalysisInterface({ farmer, farmerId, soilRecords }: SoilAnalysisInterfaceProps) {
  const [showAddTest, setShowAddTest] = useState(false)
  const [newTest, setNewTest] = useState({
    ph_level: "",
    nitrogen_level: "medium",
    phosphorus_level: "medium",
    potassium_level: "medium",
    organic_matter: "",
    test_date: new Date().toISOString().split("T")[0],
  })
  const supabase = createClient()

  const handleAddTest = async () => {
    try {
      const recommendations = generateRecommendations(newTest)

      await supabase.from("soil_health_records").insert({
        farmer_id: farmerId,
        ph_level: Number.parseFloat(newTest.ph_level),
        nitrogen_level: newTest.nitrogen_level,
        phosphorus_level: newTest.phosphorus_level,
        potassium_level: newTest.potassium_level,
        organic_matter: Number.parseFloat(newTest.organic_matter),
        recommendations,
        test_date: newTest.test_date,
      })

      setShowAddTest(false)
      setNewTest({
        ph_level: "",
        nitrogen_level: "medium",
        phosphorus_level: "medium",
        potassium_level: "medium",
        organic_matter: "",
        test_date: new Date().toISOString().split("T")[0],
      })

      // Refresh page to show new data
      window.location.reload()
    } catch (error) {
      console.error("Error adding soil test:", error)
    }
  }

  const generateRecommendations = (testData: any) => {
    const recommendations = []
    const ph = Number.parseFloat(testData.ph_level)

    if (ph < 6.0) {
      recommendations.push("Apply lime to raise soil pH")
    } else if (ph > 7.5) {
      recommendations.push("Apply sulfur to lower soil pH")
    }

    if (testData.nitrogen_level === "low") {
      recommendations.push("Apply nitrogen-rich fertilizer")
    }
    if (testData.phosphorus_level === "low") {
      recommendations.push("Add phosphorus fertilizer")
    }
    if (testData.potassium_level === "low") {
      recommendations.push("Apply potassium fertilizer")
    }

    const organicMatter = Number.parseFloat(testData.organic_matter)
    if (organicMatter < 3) {
      recommendations.push("Increase organic matter with compost")
    }

    return recommendations.join(". ") || "Soil levels are within optimal range"
  }

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

  const latestRecord = soilRecords[0]

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
              <div className="bg-purple-600 p-2 rounded-full">
                <TestTube className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-green-800">Soil Analysis</h1>
                <p className="text-sm text-green-600">Monitor and improve your soil health</p>
              </div>
            </div>
          </div>
          <Button onClick={() => setShowAddTest(true)} className="bg-purple-600 hover:bg-purple-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Test Results
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Current Soil Health */}
        {latestRecord && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5 text-purple-600" />
                Current Soil Health
              </CardTitle>
              <CardDescription>
                Latest analysis from {new Date(latestRecord.test_date).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* pH Level */}
                <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">pH Level</span>
                    <span className="text-2xl font-bold text-purple-600">{latestRecord.ph_level}</span>
                  </div>
                  <Progress value={latestRecord.ph_level * 10} className="h-2 mb-1" />
                  <p className="text-xs text-gray-600">Optimal: 6.0 - 7.0</p>
                </div>

                {/* Organic Matter */}
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">Organic Matter</span>
                    <span className="text-2xl font-bold text-green-600">{latestRecord.organic_matter}%</span>
                  </div>
                  <Progress value={latestRecord.organic_matter * 20} className="h-2 mb-1" />
                  <p className="text-xs text-gray-600">Target: 3-5%</p>
                </div>

                {/* Nutrient Summary */}
                <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-3">Nutrient Levels</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getLevelIcon(latestRecord.nitrogen_level)}
                        <span className="text-sm">Nitrogen</span>
                      </div>
                      <Badge variant="outline" className={`text-xs ${getLevelColor(latestRecord.nitrogen_level)}`}>
                        {latestRecord.nitrogen_level}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getLevelIcon(latestRecord.phosphorus_level)}
                        <span className="text-sm">Phosphorus</span>
                      </div>
                      <Badge variant="outline" className={`text-xs ${getLevelColor(latestRecord.phosphorus_level)}`}>
                        {latestRecord.phosphorus_level}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getLevelIcon(latestRecord.potassium_level)}
                        <span className="text-sm">Potassium</span>
                      </div>
                      <Badge variant="outline" className={`text-xs ${getLevelColor(latestRecord.potassium_level)}`}>
                        {latestRecord.potassium_level}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">Recommendations</h3>
                <p className="text-sm text-blue-700">{latestRecord.recommendations}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add Test Form */}
        {showAddTest && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Soil Test Results</CardTitle>
              <CardDescription>Enter your latest soil test data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ph">pH Level</Label>
                  <Input
                    id="ph"
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    placeholder="6.5"
                    value={newTest.ph_level}
                    onChange={(e) => setNewTest({ ...newTest, ph_level: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organic">Organic Matter (%)</Label>
                  <Input
                    id="organic"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="3.2"
                    value={newTest.organic_matter}
                    onChange={(e) => setNewTest({ ...newTest, organic_matter: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="test-date">Test Date</Label>
                  <Input
                    id="test-date"
                    type="date"
                    value={newTest.test_date}
                    onChange={(e) => setNewTest({ ...newTest, test_date: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleAddTest} className="bg-purple-600 hover:bg-purple-700">
                  Save Test Results
                </Button>
                <Button variant="outline" onClick={() => setShowAddTest(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Test History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-600" />
              Soil Test History
            </CardTitle>
            <CardDescription>Track your soil health over time</CardDescription>
          </CardHeader>
          <CardContent>
            {soilRecords.length > 0 ? (
              <div className="space-y-4">
                {soilRecords.map((record) => (
                  <div key={record.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-800">
                        Test from {new Date(record.test_date).toLocaleDateString()}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        pH {record.ph_level}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Nitrogen</p>
                        <p className={`font-medium ${getLevelColor(record.nitrogen_level)}`}>{record.nitrogen_level}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Phosphorus</p>
                        <p className={`font-medium ${getLevelColor(record.phosphorus_level)}`}>
                          {record.phosphorus_level}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Potassium</p>
                        <p className={`font-medium ${getLevelColor(record.potassium_level)}`}>
                          {record.potassium_level}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Organic Matter</p>
                        <p className="font-medium text-green-600">{record.organic_matter}%</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{record.recommendations}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <TestTube className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No soil test records yet</p>
                <p className="text-sm">Add your first soil test results to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
