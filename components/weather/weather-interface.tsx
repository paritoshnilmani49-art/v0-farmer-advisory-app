"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  Gauge,
  MapPin,
  Calendar,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

interface WeatherData {
  current: {
    temperature: number
    condition: string
    humidity: number
    windSpeed: number
    windDirection: string
    pressure: number
    visibility: number
    uvIndex: number
    feelsLike: number
  }
  forecast: Array<{
    date: string
    day: string
    high: number
    low: number
    condition: string
    precipitation: number
    humidity: number
    windSpeed: number
  }>
  alerts: Array<{
    type: string
    severity: string
    title: string
    description: string
    startTime: string
    endTime: string
  }>
  agricultural: {
    soilTemperature: number
    growingDegreeDays: number
    evapotranspiration: number
    recommendations: string[]
  }
}

interface WeatherInterfaceProps {
  farmer: {
    full_name: string
    location?: string
    primary_crops?: string[]
  } | null
  farmerId: string
}

export function WeatherInterface({ farmer, farmerId }: WeatherInterfaceProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState(farmer?.location || "")

  useEffect(() => {
    fetchWeatherData()
  }, [])

  const fetchWeatherData = async () => {
    setLoading(true)
    // Simulate weather API call
    setTimeout(() => {
      setWeather({
        current: {
          temperature: 24,
          condition: "Partly Cloudy",
          humidity: 65,
          windSpeed: 12,
          windDirection: "NW",
          pressure: 1013,
          visibility: 10,
          uvIndex: 6,
          feelsLike: 26,
        },
        forecast: [
          {
            date: "2024-01-20",
            day: "Today",
            high: 26,
            low: 18,
            condition: "Sunny",
            precipitation: 0,
            humidity: 60,
            windSpeed: 10,
          },
          {
            date: "2024-01-21",
            day: "Tomorrow",
            high: 28,
            low: 20,
            condition: "Partly Cloudy",
            precipitation: 10,
            humidity: 65,
            windSpeed: 12,
          },
          {
            date: "2024-01-22",
            day: "Wed",
            high: 25,
            low: 17,
            condition: "Rainy",
            precipitation: 80,
            humidity: 85,
            windSpeed: 15,
          },
          {
            date: "2024-01-23",
            day: "Thu",
            high: 23,
            low: 16,
            condition: "Cloudy",
            precipitation: 20,
            humidity: 70,
            windSpeed: 8,
          },
          {
            date: "2024-01-24",
            day: "Fri",
            high: 27,
            low: 19,
            condition: "Sunny",
            precipitation: 0,
            humidity: 55,
            windSpeed: 9,
          },
          {
            date: "2024-01-25",
            day: "Sat",
            high: 29,
            low: 21,
            condition: "Partly Cloudy",
            precipitation: 5,
            humidity: 60,
            windSpeed: 11,
          },
          {
            date: "2024-01-26",
            day: "Sun",
            high: 26,
            low: 18,
            condition: "Sunny",
            precipitation: 0,
            humidity: 58,
            windSpeed: 10,
          },
        ],
        alerts: [
          {
            type: "frost",
            severity: "moderate",
            title: "Frost Advisory",
            description: "Temperatures may drop below freezing tonight. Protect sensitive crops.",
            startTime: "2024-01-20T22:00:00Z",
            endTime: "2024-01-21T08:00:00Z",
          },
        ],
        agricultural: {
          soilTemperature: 18,
          growingDegreeDays: 145,
          evapotranspiration: 4.2,
          recommendations: [
            "Good conditions for field work today",
            "Consider irrigation in 2-3 days",
            "Monitor for frost protection tonight",
          ],
        },
      })
      setLoading(false)
    }, 1000)
  }

  const getWeatherIcon = (condition: string, size = "h-8 w-8") => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className={`${size} text-yellow-500`} />
      case "rainy":
        return <CloudRain className={`${size} text-blue-500`} />
      case "cloudy":
        return <Cloud className={`${size} text-gray-500`} />
      case "partly cloudy":
        return <Cloud className={`${size} text-gray-400`} />
      default:
        return <Sun className={`${size} text-yellow-500`} />
    }
  }

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case "severe":
        return "bg-red-50 text-red-700 border-red-200"
      case "moderate":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "minor":
        return "bg-blue-50 text-blue-700 border-blue-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getUVIndexColor = (uvIndex: number) => {
    if (uvIndex <= 2) return "text-green-600"
    if (uvIndex <= 5) return "text-yellow-600"
    if (uvIndex <= 7) return "text-orange-600"
    if (uvIndex <= 10) return "text-red-600"
    return "text-purple-600"
  }

  const getUVIndexLabel = (uvIndex: number) => {
    if (uvIndex <= 2) return "Low"
    if (uvIndex <= 5) return "Moderate"
    if (uvIndex <= 7) return "High"
    if (uvIndex <= 10) return "Very High"
    return "Extreme"
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
              <div className="bg-blue-600 p-2 rounded-full">
                <Cloud className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-green-800">Weather Center</h1>
                <p className="text-sm text-green-600">Agricultural weather insights</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-48"
            />
            <Button onClick={fetchWeatherData} variant="outline">
              Update
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Tabs defaultValue="current" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="current">Current</TabsTrigger>
              <TabsTrigger value="forecast">7-Day Forecast</TabsTrigger>
              <TabsTrigger value="agricultural">Farm Insights</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-6">
              {/* Current Weather Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getWeatherIcon(weather?.current.condition || "sunny", "h-6 w-6")}
                    Current Conditions
                  </CardTitle>
                  <CardDescription>{location || "Your location"} • Updated just now</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Temperature */}
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                      <Thermometer className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-gray-900">{weather?.current.temperature}°C</div>
                      <div className="text-sm text-gray-600">Feels like {weather?.current.feelsLike}°C</div>
                      <div className="text-xs text-gray-500 mt-1">{weather?.current.condition}</div>
                    </div>

                    {/* Humidity */}
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                      <Droplets className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-gray-900">{weather?.current.humidity}%</div>
                      <div className="text-sm text-gray-600">Humidity</div>
                      <Progress value={weather?.current.humidity} className="mt-2 h-2" />
                    </div>

                    {/* Wind */}
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                      <Wind className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-gray-900">{weather?.current.windSpeed}</div>
                      <div className="text-sm text-gray-600">km/h {weather?.current.windDirection}</div>
                      <div className="text-xs text-gray-500 mt-1">Wind Speed</div>
                    </div>

                    {/* UV Index */}
                    <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                      <Sun className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <div className={`text-3xl font-bold ${getUVIndexColor(weather?.current.uvIndex || 0)}`}>
                        {weather?.current.uvIndex}
                      </div>
                      <div className="text-sm text-gray-600">{getUVIndexLabel(weather?.current.uvIndex || 0)}</div>
                      <div className="text-xs text-gray-500 mt-1">UV Index</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gauge className="h-5 w-5 text-gray-600" />
                      Atmospheric Conditions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Pressure</span>
                      <span className="font-medium">{weather?.current.pressure} hPa</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Visibility</span>
                      <span className="font-medium">{weather?.current.visibility} km</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Dew Point</span>
                      <span className="font-medium">16°C</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-gray-600" />
                      Air Quality
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">AQI</span>
                      <Badge className="bg-green-50 text-green-700 border-green-200">Good (42)</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">PM2.5</span>
                      <span className="font-medium">12 μg/m³</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Ozone</span>
                      <span className="font-medium">65 μg/m³</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="forecast" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>7-Day Weather Forecast</CardTitle>
                  <CardDescription>Extended weather outlook for your area</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                    {weather?.forecast.map((day, index) => (
                      <div key={index} className="text-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="font-medium text-gray-800 mb-2">{day.day}</div>
                        <div className="flex justify-center mb-2">{getWeatherIcon(day.condition, "h-10 w-10")}</div>
                        <div className="space-y-1">
                          <div className="font-semibold text-lg">{day.high}°</div>
                          <div className="text-gray-500 text-sm">{day.low}°</div>
                          <div className="text-xs text-blue-600">{day.precipitation}% rain</div>
                          <div className="text-xs text-gray-500">{day.windSpeed} km/h</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agricultural" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Thermometer className="h-5 w-5 text-orange-600" />
                      Soil Temperature
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      {weather?.agricultural.soilTemperature}°C
                    </div>
                    <p className="text-sm text-gray-600">Optimal for most crop germination and root development</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      Growing Degree Days
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {weather?.agricultural.growingDegreeDays}
                    </div>
                    <p className="text-sm text-gray-600">Accumulated heat units for crop development tracking</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-blue-600" />
                      Evapotranspiration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {weather?.agricultural.evapotranspiration} mm
                    </div>
                    <p className="text-sm text-gray-600">Daily water loss from soil and plant surfaces</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Agricultural Recommendations</CardTitle>
                  <CardDescription>Weather-based farming advice</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {weather?.agricultural.recommendations.map((rec, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-green-800">{rec}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    Weather Alerts
                  </CardTitle>
                  <CardDescription>Active weather warnings and advisories</CardDescription>
                </CardHeader>
                <CardContent>
                  {weather?.alerts && weather.alerts.length > 0 ? (
                    <div className="space-y-4">
                      {weather.alerts.map((alert, index) => (
                        <div key={index} className={`p-4 border rounded-lg ${getAlertColor(alert.severity)}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="h-5 w-5" />
                            <h3 className="font-semibold">{alert.title}</h3>
                            <Badge variant="outline" className={getAlertColor(alert.severity)}>
                              {alert.severity}
                            </Badge>
                          </div>
                          <p className="text-sm mb-2">{alert.description}</p>
                          <div className="flex items-center gap-2 text-xs">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {new Date(alert.startTime).toLocaleString()} - {new Date(alert.endTime).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No active weather alerts</p>
                      <p className="text-sm">Current conditions are normal for your area</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  )
}
