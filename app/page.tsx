import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Sprout, Users, TrendingUp, Shield, MessageCircle, Smartphone } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-green-600 p-2 rounded-full">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-green-800">FarmWise</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" className="text-green-700 hover:text-green-800">
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="/auth/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-green-800 mb-6 text-balance">
            Smart Farming Advice for Better Harvests
          </h1>
          <p className="text-xl text-green-600 mb-8 text-pretty">
            Get personalized crop recommendations, soil health insights, and real-time agricultural guidance powered by
            AI. Join thousands of farmers growing smarter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="/auth/register">Start Free Today</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
            >
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Everything You Need to Farm Smarter</h2>
          <p className="text-green-600 max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools and insights you need to maximize your crop yields and
            farm efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-green-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-green-100 p-3 rounded-full w-fit">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-green-800">AI-Powered Chatbot</CardTitle>
              <CardDescription className="text-green-600">
                Get instant answers to your farming questions with our intelligent assistant
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-green-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-amber-100 p-3 rounded-full w-fit">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
              <CardTitle className="text-green-800">Crop Advisory</CardTitle>
              <CardDescription className="text-green-600">
                Receive personalized recommendations for planting, fertilizing, and harvesting
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-green-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-blue-100 p-3 rounded-full w-fit">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-green-800">Pest Detection</CardTitle>
              <CardDescription className="text-green-600">
                Upload photos to identify pests and diseases with treatment suggestions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-green-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-purple-100 p-3 rounded-full w-fit">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-green-800">Market Prices</CardTitle>
              <CardDescription className="text-green-600">
                Stay updated with real-time crop prices and market trends
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-green-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-red-100 p-3 rounded-full w-fit">
                <Smartphone className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-green-800">Weather Alerts</CardTitle>
              <CardDescription className="text-green-600">
                Get location-specific weather forecasts and farming alerts
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-green-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-green-100 p-3 rounded-full w-fit">
                <Sprout className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-green-800">Soil Health</CardTitle>
              <CardDescription className="text-green-600">
                Monitor and improve your soil health with detailed analysis and recommendations
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Farming?</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already using FarmWise to increase their yields and reduce costs.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-green-50">
            <Link href="/auth/register">Create Your Free Account</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-green-600 p-2 rounded-full">
              <Sprout className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">FarmWise</span>
          </div>
          <p className="text-green-200">Empowering farmers with smart agricultural solutions</p>
        </div>
      </footer>
    </div>
  )
}
