"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  MessageCircle,
  BookOpen,
  TrendingUp,
  Sprout,
  AlertTriangle,
  LogOut,
  Cloud,
  Thermometer,
  Droplets,
} from "lucide-react"
import Link from "next/link"

interface User {
  id: string
  email: string
  name: string
  location?: string
  farmSize?: string
  primaryCrops?: string[]
  phoneNumber?: string
  languagePreference?: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("farmwise_user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/auth/login")
    }
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("farmwise_user")
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <Sprout className="h-12 w-12 text-green-600 animate-pulse mx-auto mb-4" />
          <p className="text-green-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-green-600 p-2 rounded-full">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-800">FarmWise</h1>
              <p className="text-sm text-green-600">Agricultural Advisory Platform</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-200 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-green-800 mb-2">Welcome back, {user.name}! 👋</h1>
                <p className="text-green-600 text-lg">
                  {user.location ? `Managing your farm in ${user.location}` : "Ready to help you grow better crops"}
                </p>
                {user.primaryCrops && user.primaryCrops.length > 0 && (
                  <p className="text-sm text-green-500 mt-1">Growing: {user.primaryCrops.join(", ")}</p>
                )}
              </div>
              <div className="hidden md:block">
                <div className="bg-green-600 p-4 rounded-full">
                  <Sprout className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-green-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button asChild className="h-20 bg-green-600 hover:bg-green-700 text-white">
              <Link href="/chat" className="flex flex-col items-center justify-center space-y-2">
                <MessageCircle className="h-6 w-6" />
                <span className="text-sm font-medium">Ask AI Assistant</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 border-green-200 hover:bg-green-50 bg-transparent">
              <Link
                href="/crop-advisory"
                className="flex flex-col items-center justify-center space-y-2 text-green-700"
              >
                <BookOpen className="h-6 w-6" />
                <span className="text-sm font-medium">Crop Advisory</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 border-green-200 hover:bg-green-50 bg-transparent">
              <Link
                href="/market-prices"
                className="flex flex-col items-center justify-center space-y-2 text-green-700"
              >
                <TrendingUp className="h-6 w-6" />
                <span className="text-sm font-medium">Market Prices</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 border-green-200 hover:bg-green-50 bg-transparent">
              <Link
                href="/pest-detection"
                className="flex flex-col items-center justify-center space-y-2 text-green-700"
              >
                <AlertTriangle className="h-6 w-6" />
                <span className="text-sm font-medium">Pest Detection</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weather Card */}
            <Card className="border-green-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-blue-600" />
                  Weather Forecast
                </CardTitle>
                <CardDescription>Current conditions for {user.location || "your area"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <Thermometer className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">75°F</p>
                    <p className="text-sm text-gray-600">Temperature</p>
                  </div>
                  <div className="text-center">
                    <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">65%</p>
                    <p className="text-sm text-gray-600">Humidity</p>
                  </div>
                  <div className="text-center">
                    <Cloud className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">Partly Cloudy</p>
                    <p className="text-sm text-gray-600">Conditions</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Crop Advisory Card */}
            <Card className="border-green-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sprout className="h-5 w-5 text-green-600" />
                  Crop Advisory
                </CardTitle>
                <CardDescription>Personalized recommendations for your crops</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800">Planting Season Alert</h4>
                    <p className="text-sm text-green-600 mt-1">
                      Optimal time for spring planting is approaching. Consider soil temperature and moisture levels.
                    </p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-medium text-amber-800">Fertilizer Recommendation</h4>
                    <p className="text-sm text-amber-600 mt-1">
                      Based on your soil analysis, consider nitrogen-rich fertilizer for better crop yield.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="border-green-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Farm Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Farm Size:</span>
                    <span className="font-medium">{user.farmSize || "Not specified"} acres</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Primary Crops:</span>
                    <span className="font-medium">{user.primaryCrops?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{user.location || "Not set"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Prices */}
            <Card className="border-green-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Market Prices
                </CardTitle>
                <CardDescription>Current commodity prices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Wheat</span>
                    <span className="font-medium text-green-600">$6.50/bu ↑</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Corn</span>
                    <span className="font-medium text-red-600">$4.25/bu ↓</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Soybeans</span>
                    <span className="font-medium text-green-600">$12.80/bu ↑</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-green-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Account created</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Profile updated</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
