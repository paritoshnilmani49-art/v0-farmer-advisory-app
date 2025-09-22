"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Sprout, CheckCircle, AlertCircle } from "lucide-react"

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const handleAuthCallback = async () => {
      const supabase = createClient()

      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Auth callback error:", error)
          setStatus("error")
          setMessage("There was an error verifying your email. Please try signing in again.")
          setTimeout(() => router.push("/auth/login?error=verification_failed"), 3000)
          return
        }

        if (data.session) {
          const { data: farmer, error: farmerError } = await supabase
            .from("farmers")
            .select("*")
            .eq("id", data.session.user.id)
            .single()

          if (farmerError && farmerError.code === "PGRST116") {
            const userMetadata = data.session.user.user_metadata
            await supabase.from("farmers").insert({
              id: data.session.user.id,
              email: data.session.user.email,
              full_name: userMetadata.full_name || "",
              phone_number: userMetadata.phone_number || "",
              location: userMetadata.location || "",
              farm_size: userMetadata.farm_size || 0,
              primary_crops: userMetadata.primary_crops || [],
              language_preference: userMetadata.language_preference || "english",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
          }

          setStatus("success")
          setMessage("Email verified successfully! Redirecting to your dashboard...")
          setTimeout(() => router.push("/dashboard"), 2000)
        } else {
          setStatus("error")
          setMessage("No active session found. Please try signing in again.")
          setTimeout(() => router.push("/auth/login"), 3000)
        }
      } catch (error) {
        console.error("Callback handling error:", error)
        setStatus("error")
        setMessage("An unexpected error occurred. Please try again.")
        setTimeout(() => router.push("/auth/login?error=callback_error"), 3000)
      }
    }

    handleAuthCallback()
  }, [router, searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div
                className={`p-3 rounded-full ${
                  status === "success" ? "bg-green-600" : status === "error" ? "bg-red-600" : "bg-green-600"
                }`}
              >
                {status === "loading" && <Sprout className="h-8 w-8 text-white" />}
                {status === "success" && <CheckCircle className="h-8 w-8 text-white" />}
                {status === "error" && <AlertCircle className="h-8 w-8 text-white" />}
              </div>
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              {status === "loading" && "Verifying Your Account"}
              {status === "success" && "Account Verified!"}
              {status === "error" && "Verification Failed"}
            </h2>
            <div className="flex items-center justify-center gap-2 text-green-600">
              {status === "loading" && <Loader2 className="h-5 w-5 animate-spin" />}
              <span className={status === "error" ? "text-red-600" : "text-green-600"}>
                {message || "Please wait while we set up your account..."}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
