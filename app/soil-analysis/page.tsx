import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { SoilAnalysisInterface } from "@/components/advisory/soil-analysis-interface"

export default async function SoilAnalysisPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Fetch farmer profile and soil records
  const { data: farmer } = await supabase.from("farmers").select("*").eq("id", data.user.id).single()
  const { data: soilRecords } = await supabase
    .from("soil_health_records")
    .select("*")
    .eq("farmer_id", data.user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      <SoilAnalysisInterface farmer={farmer} farmerId={data.user.id} soilRecords={soilRecords || []} />
    </div>
  )
}
