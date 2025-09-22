"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Sprout, User, Settings, LogOut, MessageCircle } from "lucide-react"
import Link from "next/link"
import { MainNav } from "@/components/navigation/main-nav"
import { MobileNav } from "@/components/navigation/mobile-nav"

interface DashboardHeaderProps {
  farmer: {
    full_name: string
    location?: string
  } | null
}

export function DashboardHeader({ farmer }: DashboardHeaderProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              <MobileNav />
              <Link href="/dashboard" className="flex items-center space-x-2">
                <div className="bg-green-600 p-2 rounded-full">
                  <Sprout className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-green-800">FarmWise</span>
              </Link>
            </div>
            <MainNav />
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <h1 className="text-lg font-semibold text-green-800">Welcome back, {farmer?.full_name || "Farmer"}!</h1>
              {farmer?.location && <p className="text-sm text-green-600">{farmer.location}</p>}
            </div>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
            >
              <Link href="/chat">
                <MessageCircle className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">AI Assistant</span>
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-green-100 text-green-700">
                      {farmer?.full_name ? getInitials(farmer.full_name) : "F"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{farmer?.full_name || "Farmer"}</p>
                    {farmer?.location && <p className="text-xs text-muted-foreground">{farmer.location}</p>}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
