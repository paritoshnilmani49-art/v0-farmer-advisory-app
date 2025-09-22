"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Sprout, User, Mail, Lock, Phone, MapPin, Wheat, AlertCircle, CheckCircle } from "lucide-react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    location: "",
    farmSize: "",
    primaryCrops: "",
    languagePreference: "english",
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: {
            full_name: formData.fullName,
            phone_number: formData.phoneNumber,
            location: formData.location,
            farm_size: Number.parseFloat(formData.farmSize) || 0,
            primary_crops: formData.primaryCrops.split(",").map((crop) => crop.trim()),
            language_preference: formData.languagePreference,
          },
        },
      })

      if (error) throw error

      setSuccess(true)
      setTimeout(() => {
        router.push("/auth/verify-email")
      }, 2000)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-green-600 p-3 rounded-full">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Registration Successful!</h2>
              <p className="text-green-600 mb-4">
                We've sent a verification email to <strong>{formData.email}</strong>
              </p>
              <p className="text-sm text-green-600">
                Please check your email and click the verification link to activate your account.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-600 p-3 rounded-full">
              <Sprout className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">Join FarmWise</h1>
          <p className="text-green-600 text-lg">Create your account to get personalized farming advice</p>
          <p className="text-sm text-green-500 mt-2">Fill out the form below - all fields marked with * are required</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-800">Farmer Registration</CardTitle>
            <CardDescription className="text-green-600">Tell us about yourself and your farm</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-green-700 font-medium">
                    Your Full Name *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      required
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="pl-10 border-green-200 focus:border-green-500 text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-green-700 font-medium">
                    Email Address *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10 border-green-200 focus:border-green-500 text-base"
                    />
                  </div>
                  <p className="text-xs text-green-600">We'll send verification email here</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-green-700 font-medium">
                    Create Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="At least 6 characters"
                      required
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pl-10 border-green-200 focus:border-green-500 text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-green-700 font-medium">
                    Confirm Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Type password again"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="pl-10 border-green-200 focus:border-green-500 text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-green-700 font-medium">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="Your phone number"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      className="pl-10 border-green-200 focus:border-green-500 text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-green-700 font-medium">
                    Your Location
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                    <Input
                      id="location"
                      type="text"
                      placeholder="City, State/Province"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="pl-10 border-green-200 focus:border-green-500 text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmSize" className="text-green-700 font-medium">
                    Farm Size (acres)
                  </Label>
                  <Input
                    id="farmSize"
                    type="number"
                    placeholder="e.g., 10"
                    value={formData.farmSize}
                    onChange={(e) => handleInputChange("farmSize", e.target.value)}
                    className="border-green-200 focus:border-green-500 text-base"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primaryCrops" className="text-green-700 font-medium">
                    What Crops Do You Grow?
                  </Label>
                  <div className="relative">
                    <Wheat className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                    <Input
                      id="primaryCrops"
                      type="text"
                      placeholder="e.g., Wheat, Corn, Soybeans"
                      value={formData.primaryCrops}
                      onChange={(e) => handleInputChange("primaryCrops", e.target.value)}
                      className="pl-10 border-green-200 focus:border-green-500 text-base"
                    />
                  </div>
                  <p className="text-xs text-green-600">Separate multiple crops with commas</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language" className="text-green-700 font-medium">
                  Preferred Language
                </Label>
                <Select
                  value={formData.languagePreference}
                  onValueChange={(value) => handleInputChange("languagePreference", value)}
                >
                  <SelectTrigger className="border-green-200 focus:border-green-500 text-base">
                    <SelectValue placeholder="Select your preferred language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="punjabi">Punjabi</SelectItem>
                    <SelectItem value="bengali">Bengali</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white text-base py-3"
                disabled={isLoading}
              >
                {isLoading ? "Creating Your Account..." : "Create My Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-green-600">
                Already have an account?{" "}
                <Link href="/auth/login" className="font-medium text-green-700 hover:text-green-800 underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
