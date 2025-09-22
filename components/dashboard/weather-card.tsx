"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer } from "lucide-react"
import { useEffect, useState } from "react"

interface WeatherData {
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  forecast: Array<{
    day: string
    high: number
    low: number
    condition: string
  }>
}

interface WeatherCardProps {
  location?: string
}

export function WeatherCard({ location }: WeatherCardProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate weather API call
    const fetchWeather = async () => {
      setLoading(true)
      // Mock weather data
      setTimeout(() => {
        setWeather({
          temperature: 24,
          condition: "Partly Cloudy",
          humidity: 65,
          windSpeed: 12,
          forecast: [
            { day: "Today", high: 26, low: 18, condition: "Sunny" },
            { day: "Tomorrow", high: 28, low: 20, condition: "Partly Cloudy" },
            { day: "Wed", high: 25, low: 17, condition: "Rainy" },
            { day: "Thu", high: 23, low: 16, condition: "Cloudy" },
            { day: "Fri", high: 27, low: 19, condition: "Sunny" },
          ],
        })
        setLoading(false)
      }, 1000)
    }

    fetchWeather()
  }, [location])

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            Weather Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-5 gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
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
          <Cloud className="h-5 w-5 text-blue-500" />
          Weather Forecast
        </CardTitle>
        <CardDescription>Current conditions for {location || "your area"}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Weather */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
          <div className="flex items-center gap-4">
            {getWeatherIcon(weather?.condition || "sunny")}
            <div>
              <div className="text-3xl font-bold text-gray-800">{weather?.temperature}°C</div>
              <div className="text-sm text-gray-600">{weather?.condition}</div>
            </div>
          </div>
          <div className="text-right space-y-1">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Droplets className="h-4 w-4" />
              {weather?.humidity}%
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Wind className="h-4 w-4" />
              {weather?.windSpeed} km/h
            </div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="grid grid-cols-5 gap-2">
          {weather?.forecast.map((day, index) => (
            <div key={index} className="text-center p-2 rounded-lg bg-gray-50">
              <div className="text-xs font-medium text-gray-600 mb-1">{day.day}</div>
              <div className="flex justify-center mb-1">{getWeatherIcon(day.condition)}</div>
              <div className="text-xs">
                <div className="font-semibold">{day.high}°</div>
                <div className="text-gray-500">{day.low}°</div>
              </div>
            </div>
          ))}
        </div>

        {/* Weather Alerts */}
        <div className="space-y-2">
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Thermometer className="h-3 w-3 mr-1" />
            Optimal planting temperature expected tomorrow
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
