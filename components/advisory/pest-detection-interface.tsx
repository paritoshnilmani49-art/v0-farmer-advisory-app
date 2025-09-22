"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Camera, Upload, Loader2, Bug, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

interface PestDetectionInterfaceProps {
  farmer: {
    full_name: string
    location?: string
    primary_crops?: string[]
  } | null
  farmerId: string
}

interface DetectionResult {
  pest_identified: string
  confidence_score: number
  treatment_recommendations: string
  severity: "low" | "medium" | "high"
  urgency: string
}

export function PestDetectionInterface({ farmer, farmerId }: PestDetectionInterfaceProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [cropType, setCropType] = useState("")
  const [symptoms, setSymptoms] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedImage || !cropType) return

    setIsAnalyzing(true)

    try {
      // Simulate AI analysis (in real implementation, this would call an image recognition API)
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock detection result
      const mockResult: DetectionResult = {
        pest_identified: "Corn Borer (Ostrinia nubilalis)",
        confidence_score: 87,
        treatment_recommendations:
          "Apply Bacillus thuringiensis (Bt) spray in the evening. Consider using pheromone traps for monitoring. Remove crop residue after harvest to reduce overwintering sites.",
        severity: "medium",
        urgency: "Treatment recommended within 3-5 days",
      }

      setDetectionResult(mockResult)

      // Save to database
      await supabase.from("pest_detections").insert({
        farmer_id: farmerId,
        crop_type: cropType,
        pest_identified: mockResult.pest_identified,
        confidence_score: mockResult.confidence_score / 100,
        treatment_recommendations: mockResult.treatment_recommendations,
        image_url: "placeholder-url", // In real implementation, upload image to storage
      })
    } catch (error) {
      console.error("Error analyzing image:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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
              <div className="bg-orange-600 p-2 rounded-full">
                <Bug className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-green-800">Pest Detection</h1>
                <p className="text-sm text-green-600">AI-powered crop pest identification</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-orange-600" />
                Upload Crop Image
              </CardTitle>
              <CardDescription>Take a clear photo of the affected crop area for AI analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="crop-type">Crop Type *</Label>
                <Select value={cropType} onValueChange={setCropType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corn">Corn</SelectItem>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="soybeans">Soybeans</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="tomatoes">Tomatoes</SelectItem>
                    <SelectItem value="potatoes">Potatoes</SelectItem>
                    <SelectItem value="cotton">Cotton</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="symptoms">Describe Symptoms (Optional)</Label>
                <Textarea
                  id="symptoms"
                  placeholder="Describe what you're seeing: yellowing leaves, holes, spots, etc."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label>Crop Image *</Label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-orange-400 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imagePreview ? (
                    <div className="space-y-2">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Selected crop"
                        className="max-h-48 mx-auto rounded-lg"
                      />
                      <p className="text-sm text-gray-600">Click to change image</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                      <p className="text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={!selectedImage || !cropType || isAnalyzing}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing Image...
                  </>
                ) : (
                  <>
                    <Bug className="h-4 w-4 mr-2" />
                    Analyze for Pests
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                Detection Results
              </CardTitle>
              <CardDescription>AI analysis results and treatment recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <Loader2 className="h-12 w-12 animate-spin text-orange-600 mx-auto mb-4" />
                    <p className="text-gray-600">Analyzing your crop image...</p>
                    <p className="text-sm text-gray-500">This may take a few moments</p>
                  </div>
                  <Progress value={65} className="w-full" />
                </div>
              ) : detectionResult ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">Identified Pest</h3>
                      <Badge variant="outline" className={getSeverityColor(detectionResult.severity)}>
                        {detectionResult.severity} severity
                      </Badge>
                    </div>
                    <p className="text-lg font-medium text-orange-700 mb-2">{detectionResult.pest_identified}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Confidence:</span>
                      <Progress value={detectionResult.confidence_score} className="flex-1 h-2" />
                      <span className="text-sm font-medium">{detectionResult.confidence_score}%</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h4 className="font-medium text-gray-800">Treatment Recommendations</h4>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{detectionResult.treatment_recommendations}</p>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <span className="font-medium text-amber-800">Urgency</span>
                    </div>
                    <p className="text-sm text-amber-700">{detectionResult.urgency}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                    >
                      Save Report
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                    >
                      Consult Expert
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Bug className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Upload an image and select crop type to begin analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Detections */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Pest Detections</CardTitle>
            <CardDescription>Your previous pest identification results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { crop: "Corn", pest: "Corn Borer", date: "2 days ago", severity: "medium" },
                { crop: "Wheat", pest: "Aphids", date: "1 week ago", severity: "low" },
                { crop: "Soybeans", pest: "Bean Leaf Beetle", date: "2 weeks ago", severity: "high" },
              ].map((detection, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bug className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium text-gray-800">{detection.pest}</p>
                      <p className="text-sm text-gray-600">
                        {detection.crop} • {detection.date}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className={getSeverityColor(detection.severity)}>
                    {detection.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
