import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Sprout, Users, TrendingUp, Shield, MessageCircle, Smartphone, CheckCircle, Star } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 p-2 rounded-full">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-green-800">FarmWise</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" className="text-green-700 hover:text-green-800 hover:bg-green-100">
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white shadow-lg">
              <Link href="/auth/register">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4" />
              Trusted by 10,000+ farmers worldwide
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-6 text-balance">
            Grow Better Crops with
            <span className="text-green-600"> AI-Powered</span> Farming Advice
          </h1>
          <p className="text-xl text-green-600 mb-8 text-pretty max-w-3xl mx-auto leading-relaxed">
            Get instant answers to your farming questions, personalized crop recommendations, and expert guidance - all
            in simple language that every farmer can understand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 shadow-lg"
            >
              <Link href="/auth/register">Start Growing Smarter - Free</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-green-300 text-green-700 hover:bg-green-50 bg-white/80 text-lg px-8 py-4"
            >
              <Link href="#features">See How It Works</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium">100% Free to Start</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium">Works in Any Language</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium">Expert Agricultural Advice</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-800 mb-6">Everything You Need to Farm Better</h2>
          <p className="text-xl text-green-600 max-w-3xl mx-auto leading-relaxed">
            Our easy-to-use platform gives you all the tools and knowledge you need to grow healthier crops and increase
            your harvest - no technical experience required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-green-200 hover:shadow-xl transition-all duration-300 hover:border-green-300 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-green-800 text-xl">Ask Your AI Farming Assistant</CardTitle>
              <CardDescription className="text-green-600 text-base leading-relaxed">
                Get instant answers to any farming question - from "Why are my plants yellow?" to "When should I plant
                corn?" Available 24/7 in your language.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-green-200 hover:shadow-xl transition-all duration-300 hover:border-green-300 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="bg-amber-100 p-4 rounded-full w-fit mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-amber-600" />
              </div>
              <CardTitle className="text-green-800 text-xl">Personalized Crop Advice</CardTitle>
              <CardDescription className="text-green-600 text-base leading-relaxed">
                Get specific recommendations for your crops, soil, and location. Learn exactly when to plant, fertilize,
                and harvest for maximum yield.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-green-200 hover:shadow-xl transition-all duration-300 hover:border-green-300 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-green-800 text-xl">Identify Pests & Diseases</CardTitle>
              <CardDescription className="text-green-600 text-base leading-relaxed">
                Take a photo of sick plants and get instant identification with safe, effective treatment options.
                Protect your crops before it's too late.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-green-200 hover:shadow-xl transition-all duration-300 hover:border-green-300 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-fit mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-green-800 text-xl">Current Market Prices</CardTitle>
              <CardDescription className="text-green-600 text-base leading-relaxed">
                Know the best time to sell your crops with real-time market prices and trends. Maximize your profits
                with smart timing.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-green-200 hover:shadow-xl transition-all duration-300 hover:border-green-300 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="bg-red-100 p-4 rounded-full w-fit mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle className="text-green-800 text-xl">Weather Alerts & Forecasts</CardTitle>
              <CardDescription className="text-green-600 text-base leading-relaxed">
                Get weather warnings and forecasts specific to your farm location. Plan your farming activities and
                protect your crops from bad weather.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-green-200 hover:shadow-xl transition-all duration-300 hover:border-green-300 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-4">
                <Sprout className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-green-800 text-xl">Soil Health Monitoring</CardTitle>
              <CardDescription className="text-green-600 text-base leading-relaxed">
                Learn how to improve your soil for better crops. Get simple, practical advice on fertilizers, pH levels,
                and soil care.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="bg-white/60 backdrop-blur-sm py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-800 mb-6">Trusted by Farmers Everywhere</h2>
            <p className="text-xl text-green-600">See what farmers are saying about FarmWise</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-green-200 bg-white shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-gray-700 text-base">
                  "FarmWise helped me identify a pest problem early and saved my entire corn crop. The AI assistant is
                  like having an expert right in my pocket!"
                </CardDescription>
                <div className="mt-4">
                  <p className="font-semibold text-green-800">- Maria Rodriguez</p>
                  <p className="text-sm text-green-600">Corn & Soybean Farmer, Texas</p>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-green-200 bg-white shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-gray-700 text-base">
                  "I increased my wheat yield by 30% following FarmWise recommendations. The soil health advice was
                  exactly what I needed."
                </CardDescription>
                <div className="mt-4">
                  <p className="font-semibold text-green-800">- John Smith</p>
                  <p className="text-sm text-green-600">Wheat Farmer, Kansas</p>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-green-200 bg-white shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-gray-700 text-base">
                  "As a new farmer, FarmWise taught me everything I needed to know. The advice is simple to understand
                  and really works!"
                </CardDescription>
                <div className="mt-4">
                  <p className="font-semibold text-green-800">- Sarah Johnson</p>
                  <p className="text-sm text-green-600">Vegetable Farmer, California</p>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Grow Better Crops?</h2>
          <p className="text-green-100 mb-8 max-w-3xl mx-auto text-xl leading-relaxed">
            Join thousands of farmers who are already using FarmWise to increase their yields, reduce costs, and grow
            healthier crops. Start your free account today!
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-white text-green-600 hover:bg-green-50 text-lg px-8 py-4 shadow-lg"
          >
            <Link href="/auth/register">Create Your Free Account Now</Link>
          </Button>
          <p className="text-green-200 mt-4 text-sm">No credit card required • Free forever • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="bg-green-600 p-3 rounded-full">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">FarmWise</span>
            </div>
            <p className="text-green-200 text-lg mb-4">Empowering farmers with smart agricultural solutions</p>
            <p className="text-green-300 text-sm">© 2024 FarmWise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
