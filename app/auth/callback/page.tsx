"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Sprout } from "lucide-react"

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      const supabase = createClient()

      try {
        // Handle the auth callback
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Auth callback error:", error)
          router.push("/auth/login?error=callback_error")
          return
        }

        if (data.session) {
          // User is authenticated, redirect to dashboard
          router.push("/dashboard")
        } else {
          // No session, redirect to login
          router.push("/auth/login")
        }
      } catch (error) {
        console.error("Callback handling error:", error)
        router.push("/auth/login?error=callback_error")
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-600 p-3 rounded-full">
                <Sprout className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-4">Verifying Your Account</h2>
            <div className="flex items-center justify-center gap-2 text-green-600">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Please wait while we set up your account...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
