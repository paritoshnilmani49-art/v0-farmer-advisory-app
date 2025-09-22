"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, Search, MapPin, Calendar, Bell } from "lucide-react"
import Link from "next/link"

interface MarketPrice {
  crop_name: string
  price_per_kg: number
  change: number
  change_percent: number
  market_name: string
  location: string
  last_updated: string
  volume: number
  quality_grade: string
}

interface MarketPricesInterfaceProps {
  farmer: {
    full_name: string
    location?: string
    primary_crops?: string[]
  } | null
  farmerId: string
}

export function MarketPricesInterface({ farmer, farmerId }: MarketPricesInterfaceProps) {
  const [prices, setPrices] = useState<MarketPrice[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCrop, setSelectedCrop] = useState("all")
  const [selectedMarket, setSelectedMarket] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchMarketPrices()
  }, [])

  const fetchMarketPrices = async () => {
    setLoading(true)
    // Simulate API call to market data service
    setTimeout(() => {
      setPrices([
        {
          crop_name: "Wheat",
          price_per_kg: 2.45,
          change: 0.12,
          change_percent: 5.1,
          market_name: "Central Grain Exchange",
          location: "Chicago, IL",
          last_updated: "2024-01-20T10:30:00Z",
          volume: 15420,
          quality_grade: "Grade A",
        },
        {
          crop_name: "Corn",
          price_per_kg: 1.89,
          change: -0.05,
          change_percent: -2.6,
          market_name: "Regional Commodity Hub",
          location: "Des Moines, IA",
          last_updated: "2024-01-20T10:15:00Z",
          volume: 23150,
          quality_grade: "Grade A",
        },
        {
          crop_name: "Soybeans",
          price_per_kg: 3.21,
          change: 0.08,
          change_percent: 2.6,
          market_name: "Local Farmers Market",
          location: "Springfield, IL",
          last_updated: "2024-01-20T09:45:00Z",
          volume: 8750,
          quality_grade: "Grade B",
        },
        {
          crop_name: "Rice",
          price_per_kg: 1.67,
          change: -0.02,
          change_percent: -1.2,
          market_name: "Agricultural Exchange",
          location: "Little Rock, AR",
          last_updated: "2024-01-20T10:00:00Z",
          volume: 12300,
          quality_grade: "Grade A",
        },
        {
          crop_name: "Wheat",
          price_per_kg: 2.38,
          change: 0.05,
          change_percent: 2.1,
          market_name: "Local Farmers Market",
          location: "Springfield, IL",
          last_updated: "2024-01-20T09:30:00Z",
          volume: 5200,
          quality_grade: "Grade B",
        },
        {
          crop_name: "Corn",
          price_per_kg: 1.92,
          change: 0.03,
          change_percent: 1.6,
          market_name: "Central Grain Exchange",
          location: "Chicago, IL",
          last_updated: "2024-01-20T10:20:00Z",
          volume: 18900,
          quality_grade: "Grade A",
        },
      ])
      setLoading(false)
    }, 1000)
  }

  const filteredPrices = prices.filter((price) => {
    const cropMatch = selectedCrop === "all" || price.crop_name.toLowerCase() === selectedCrop
    const marketMatch = selectedMarket === "all" || price.market_name === selectedMarket
    const searchMatch =
      searchTerm === "" ||
      price.crop_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      price.market_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      price.location.toLowerCase().includes(searchTerm.toLowerCase())

    return cropMatch && marketMatch && searchMatch
  })

  const getUniqueMarkets = () => {
    return Array.from(new Set(prices.map((p) => p.market_name)))
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "Grade A":
        return "bg-green-50 text-green-700 border-green-200"
      case "Grade B":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "Grade C":
        return "bg-orange-50 text-orange-700 border-orange-200"
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
              <div className="bg-green-600 p-2 rounded-full">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-green-800">Market Prices</h1>
                <p className="text-sm text-green-600">Real-time commodity pricing</p>
              </div>
            </div>
          </div>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Bell className="h-4 w-4 mr-2" />
            Set Price Alerts
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Market Data Filters</CardTitle>
            <CardDescription>Filter prices by crop, market, or location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search crops, markets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Crop Type</label>
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger>
                    <SelectValue placeholder="All crops" />
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
              <div className="space-y-2">
                <label className="text-sm font-medium">Market</label>
                <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                  <SelectTrigger>
                    <SelectValue placeholder="All markets" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Markets</SelectItem>
                    {getUniqueMarkets().map((market) => (
                      <SelectItem key={market} value={market}>
                        {market}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Actions</label>
                <Button onClick={fetchMarketPrices} variant="outline" className="w-full bg-transparent">
                  Refresh Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="current" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="current">Current Prices</TabsTrigger>
            <TabsTrigger value="trends">Price Trends</TabsTrigger>
            <TabsTrigger value="alerts">Price Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            {/* Price Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {["Wheat", "Corn", "Soybeans", "Rice"].map((crop) => {
                const cropPrices = prices.filter((p) => p.crop_name === crop)
                const avgPrice = cropPrices.reduce((sum, p) => sum + p.price_per_kg, 0) / cropPrices.length
                const avgChange = cropPrices.reduce((sum, p) => sum + p.change_percent, 0) / cropPrices.length

                return (
                  <Card key={crop}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-800">{crop}</h3>
                        <div className="flex items-center gap-1">
                          {avgChange > 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          )}
                          <span className={`text-sm font-medium ${avgChange > 0 ? "text-green-600" : "text-red-600"}`}>
                            {avgChange > 0 ? "+" : ""}
                            {avgChange.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">${avgPrice.toFixed(2)}/kg</div>
                      <p className="text-sm text-gray-500">Average across {cropPrices.length} markets</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Detailed Price Table */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Market Prices</CardTitle>
                <CardDescription>Showing {filteredPrices.length} price listings</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-16 bg-gray-200 rounded-lg"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredPrices.map((price, index) => (
                      <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div>
                              <h3 className="font-semibold text-gray-900">{price.crop_name}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPin className="h-3 w-3" />
                                <span>{price.market_name}</span>
                                <span>•</span>
                                <span>{price.location}</span>
                              </div>
                            </div>
                            <Badge variant="outline" className={getGradeColor(price.quality_grade)}>
                              {price.quality_grade}
                            </Badge>
                          </div>

                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">${price.price_per_kg.toFixed(2)}/kg</div>
                            <div className="flex items-center gap-2">
                              {price.change > 0 ? (
                                <TrendingUp className="h-4 w-4 text-green-500" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-red-500" />
                              )}
                              <span
                                className={`text-sm font-medium ${price.change > 0 ? "text-green-600" : "text-red-600"}`}
                              >
                                {price.change > 0 ? "+" : ""}${price.change.toFixed(2)} (
                                {price.change_percent > 0 ? "+" : ""}
                                {price.change_percent.toFixed(1)}%)
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                              <Calendar className="h-3 w-3" />
                              <span>Updated {formatTime(price.last_updated)}</span>
                              <span>•</span>
                              <span>{price.volume.toLocaleString()} kg volume</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Price Trends Analysis</CardTitle>
                <CardDescription>Historical price movements and market insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <TrendingUp className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Price Trends Coming Soon</h3>
                  <p>Historical charts and trend analysis will be available here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Price Alerts</CardTitle>
                <CardDescription>Set up notifications for price changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Bell className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Price Alerts Coming Soon</h3>
                  <p>Get notified when prices reach your target levels</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
