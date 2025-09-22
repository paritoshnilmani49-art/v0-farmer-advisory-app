import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { WeatherCard } from "@/components/dashboard/weather-card"
import { CropAdvisoryCard } from "@/components/dashboard/crop-advisory-card"
import { SoilHealthCard } from "@/components/dashboard/soil-health-card"
import { MarketPricesCard } from "@/components/dashboard/market-prices-card"
import { RecentActivityCard } from "@/components/dashboard/recent-activity-card"
import { QuickActionsCard } from "@/components/dashboard/quick-actions-card"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Fetch farmer profile
  const { data: farmer } = await supabase.from("farmers").select("*").eq("id", data.user.id).single()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      <DashboardHeader farmer={farmer} />

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <WeatherCard location={farmer?.location} />
            <CropAdvisoryCard farmerId={data.user.id} crops={farmer?.primary_crops} />
            <SoilHealthCard farmerId={data.user.id} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <QuickActionsCard />
            <MarketPricesCard location={farmer?.location} />
            <RecentActivityCard farmerId={data.user.id} />
          </div>
        </div>
      </main>
    </div>
  )
}
