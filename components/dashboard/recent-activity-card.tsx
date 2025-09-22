"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, MessageCircle, TestTube, Camera, Calendar } from "lucide-react"
import { useEffect, useState } from "react"

interface ActivityItem {
  id: string
  type: string
  description: string
  timestamp: string
  status: "completed" | "pending" | "in-progress"
}

interface RecentActivityCardProps {
  farmerId: string
}

export function RecentActivityCard({ farmerId }: RecentActivityCardProps) {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching recent activities
    const fetchActivities = async () => {
      setLoading(true)
      // Mock activity data
      setTimeout(() => {
        setActivities([
          {
            id: "1",
            type: "chat",
            description: "Asked about corn pest management",
            timestamp: "2 hours ago",
            status: "completed",
          },
          {
            id: "2",
            type: "soil_test",
            description: "Soil test results received",
            timestamp: "1 day ago",
            status: "completed",
          },
          {
            id: "3",
            type: "pest_detection",
            description: "Uploaded crop image for analysis",
            timestamp: "2 days ago",
            status: "in-progress",
          },
          {
            id: "4",
            type: "advisory",
            description: "Received fertilizer recommendation",
            timestamp: "3 days ago",
            status: "completed",
          },
        ])
        setLoading(false)
      }, 1000)
    }

    fetchActivities()
  }, [farmerId])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "chat":
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case "soil_test":
        return <TestTube className="h-4 w-4 text-purple-500" />
      case "pest_detection":
        return <Camera className="h-4 w-4 text-orange-500" />
      case "advisory":
        return <Calendar className="h-4 w-4 text-green-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200"
      case "in-progress":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-600" />
          Recent Activity
        </CardTitle>
        <CardDescription>Your latest farming activities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
            <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{activity.description}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">{activity.timestamp}</span>
                <Badge variant="outline" className={`text-xs ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
