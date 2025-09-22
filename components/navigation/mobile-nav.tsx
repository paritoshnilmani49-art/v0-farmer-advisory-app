"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, MessageCircle, Bug, Sprout, TestTube, TrendingUp, CloudSun } from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "AI Assistant",
    href: "/chat",
    icon: MessageCircle,
  },
  {
    name: "Crop Advisory",
    href: "/crop-advisory",
    icon: Sprout,
  },
  {
    name: "Pest Detection",
    href: "/pest-detection",
    icon: Bug,
  },
  {
    name: "Soil Analysis",
    href: "/soil-analysis",
    icon: TestTube,
  },
  {
    name: "Market Prices",
    href: "/market-prices",
    icon: TrendingUp,
  },
  {
    name: "Weather",
    href: "/weather",
    icon: CloudSun,
  },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <div className="flex flex-col space-y-4 mt-8">
          <div className="flex items-center space-x-2 px-4">
            <div className="bg-green-600 p-2 rounded-full">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-green-800">FarmWise</span>
          </div>

          <nav className="flex flex-col space-y-2 px-4">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-green-100 text-green-600"
                      : "text-green-700/70 hover:text-green-600 hover:bg-green-50",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
