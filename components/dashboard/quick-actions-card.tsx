"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Camera, TestTube, TrendingUp, Calendar, FileText } from "lucide-react"
import Link from "next/link"

export function QuickActionsCard() {
  const actions = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      label: "AI Assistant",
      description: "Get instant farming advice",
      href: "/chat",
      color: "bg-blue-50 text-blue-600 hover:bg-blue-100",
    },
    {
      icon: <Camera className="h-5 w-5" />,
      label: "Pest Detection",
      description: "Upload crop photos",
      href: "/pest-detection",
      color: "bg-orange-50 text-orange-600 hover:bg-orange-100",
    },
    {
      icon: <TestTube className="h-5 w-5" />,
      label: "Soil Analysis",
      description: "Schedule soil test",
      href: "/soil-analysis",
      color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      label: "Market Prices",
      description: "View current rates",
      href: "/market-prices",
      color: "bg-green-50 text-green-600 hover:bg-green-100",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Farm Calendar",
      description: "Plan activities",
      href: "/calendar",
      color: "bg-amber-50 text-amber-600 hover:bg-amber-100",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Reports",
      description: "View farm reports",
      href: "/reports",
      color: "bg-gray-50 text-gray-600 hover:bg-gray-100",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Access your most used farming tools</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              asChild
              variant="ghost"
              className={`h-auto p-3 flex flex-col items-center gap-2 ${action.color}`}
            >
              <Link href={action.href}>
                {action.icon}
                <div className="text-center">
                  <div className="text-xs font-medium">{action.label}</div>
                  <div className="text-xs opacity-75">{action.description}</div>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
