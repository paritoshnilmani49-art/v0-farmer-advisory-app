import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, Sprout, RefreshCw, ArrowLeft } from "lucide-react"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-600 p-3 rounded-full">
              <Sprout className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">FarmWise</h1>
          <p className="text-green-600">Your Agricultural Advisory Partner</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <Mail className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl text-green-800">Check Your Email</CardTitle>
            <CardDescription className="text-green-600 text-lg">We've sent you a verification link</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-4">
              <p className="text-green-700 leading-relaxed">
                We've sent a verification email to your inbox. Please click the link in the email to activate your
                FarmWise account and start receiving personalized farming advice.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">What to do next:</h3>
                <ol className="text-sm text-green-700 text-left space-y-1">
                  <li>1. Check your email inbox</li>
                  <li>2. Look for an email from "FarmWise Team"</li>
                  <li>3. Click the "Confirm Email Address" button</li>
                  <li>4. You'll be redirected to your dashboard</li>
                </ol>
              </div>

              <p className="text-sm text-green-600">
                <strong>Can't find the email?</strong> Check your spam/junk folder. The email comes from{" "}
                <strong>laksh2003suthar@gmail.com</strong>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                asChild
                variant="outline"
                className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent flex items-center gap-2"
              >
                <Link href="/auth/login">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Sign In
                </Link>
              </Button>

              <Button asChild className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
                <Link href="/auth/register">
                  <RefreshCw className="h-4 w-4" />
                  Resend Email
                </Link>
              </Button>
            </div>

            <p className="text-xs text-green-500 mt-4">
              Need help? The verification email should arrive within a few minutes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
