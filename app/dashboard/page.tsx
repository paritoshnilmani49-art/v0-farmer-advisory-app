import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { WeatherCard } from "@/components/dashboard/weather-card"
import { CropAdvisoryCard } from "@/components/dashboard/crop-advisory-card"
import { SoilHealthCard } from "@/components/dashboard/soil-health-card"
import { MarketPricesCard } from "@/components/dashboard/market-prices-card"
import { RecentActivityCard } from "@/components/dashboard/recent-activity-card"
import { QuickActionsCard } from "@/components/dashboard/quick-actions-card"
import { Button } from "@/components/ui/button"
import { MessageCircle, BookOpen, TrendingUp, Sprout, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const { data: farmer, error: farmerError } = await supabase
    .from("farmers")
    .select("*")
    .eq("id", data.user.id)
    .single()

  if (farmerError && farmerError.code === "PGRST116") {
    // No farmer profile found, create one from auth metadata
    const userMetadata = data.user.user_metadata
    const { data: newFarmer } = await supabase
      .from("farmers")
      .insert({
        id: data.user.id,
        full_name: userMetadata.full_name || data.user.email?.split("@")[0] || "Farmer",
        location: userMetadata.location || null,
        phone_number: userMetadata.phone_number || null,
        farm_size: userMetadata.farm_size || null,
        primary_crops: userMetadata.primary_crops || [],
        language_preference: userMetadata.language_preference || "english",
      })
      .select()
      .single()

    if (newFarmer) {
      return <DashboardContent farmer={newFarmer} userId={data.user.id} />
    }
  }

  return <DashboardContent farmer={farmer} userId={data.user.id} />
}

function DashboardContent({ farmer, userId }: { farmer: any; userId: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      <DashboardHeader farmer={farmer} />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-200 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-green-800 mb-2">
                  Welcome back, {farmer?.full_name || "Farmer"}! 👋
                </h1>
                <p className="text-green-600 text-lg">
                  {farmer?.location
                    ? `Managing your farm in ${farmer.location}`
                    : "Ready to help you grow better crops"}
                </p>
                {farmer?.primary_crops && farmer.primary_crops.length > 0 && (
                  <p className="text-sm text-green-500 mt-1">Growing: {farmer.primary_crops.join(", ")}</p>
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
              <Link href="/advisory" className="flex flex-col items-center justify-center space-y-2 text-green-700">
                <BookOpen className="h-6 w-6" />
                <span className="text-sm font-medium">Crop Advisory</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 border-green-200 hover:bg-green-50 bg-transparent">
              <Link href="/market" className="flex flex-col items-center justify-center space-y-2 text-green-700">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <WeatherCard location={farmer?.location} />
            <CropAdvisoryCard farmerId={userId} crops={farmer?.primary_crops} />
            <SoilHealthCard farmerId={userId} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <QuickActionsCard />
            <MarketPricesCard location={farmer?.location} />
            <RecentActivityCard farmerId={userId} />
          </div>
        </div>
      </main>
    </div>
  )
}
