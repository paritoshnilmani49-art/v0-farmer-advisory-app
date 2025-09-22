import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { CropAdvisoryInterface } from "@/components/advisory/crop-advisory-interface"

export default async function CropAdvisoryPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Fetch farmer profile and advisories
  const { data: farmer } = await supabase.from("farmers").select("*").eq("id", data.user.id).single()
  const { data: advisories } = await supabase
    .from("crop_advisories")
    .select("*")
    .eq("farmer_id", data.user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      <CropAdvisoryInterface farmer={farmer} farmerId={data.user.id} advisories={advisories || []} />
    </div>
  )
}
