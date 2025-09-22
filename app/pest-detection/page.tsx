import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { PestDetectionInterface } from "@/components/advisory/pest-detection-interface"

export default async function PestDetectionPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Fetch farmer profile
  const { data: farmer } = await supabase.from("farmers").select("*").eq("id", data.user.id).single()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      <PestDetectionInterface farmer={farmer} farmerId={data.user.id} />
    </div>
  )
}
