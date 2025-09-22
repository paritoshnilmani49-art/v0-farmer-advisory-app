"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, MessageCircle, Bug, Sprout, TestTube, TrendingUp, CloudSun } from "lucide-react"

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

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center space-x-6">
      {navigation.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-green-600",
              pathname === item.href ? "text-green-600" : "text-green-700/70",
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}
