"use client"

import type React from "react"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sprout, User, Send, Loader2, ArrowLeft, Mic, Camera, FileText } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"

interface ChatInterfaceProps {
  farmer: {
    full_name: string
    location?: string
    primary_crops?: string[]
  } | null
  farmerId: string
}

export function ChatInterface({ farmer, farmerId }: ChatInterfaceProps) {
  const [input, setInput] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { farmerId },
    }),
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: `Hello ${farmer?.full_name || "there"}! 👋 I'm your FarmWise AI assistant, here to help you with all your farming questions.

I can help you with:
🌱 Crop advisory and recommendations
🌾 Soil health analysis
🐛 Pest identification and control
🌤️ Weather-based farming advice
📊 Market insights and timing

What would you like to know about your farm today?`,
      },
    ],
  })

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && status !== "in_progress") {
      sendMessage({ text: input })
      setInput("")
    }
  }

  const formatMessageContent = (content: string) => {
    // Simple formatting for better readability
    return content.split("\n").map((line, index) => {
      if (line.startsWith("•") || line.startsWith("-")) {
        return (
          <li key={index} className="ml-4">
            {line.substring(1).trim()}
          </li>
        )
      }
      if (line.trim() === "") {
        return <br key={index} />
      }
      return (
        <p key={index} className="mb-2">
          {line}
        </p>
      )
    })
  }

  const suggestedQuestions = [
    "What's the best time to plant corn in my area?",
    "How do I improve my soil health?",
    "I see yellow spots on my wheat leaves, what could it be?",
    "When should I harvest my soybeans?",
    "What fertilizer should I use for better yield?",
  ]

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="bg-green-600 p-2 rounded-full">
                <Sprout className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-green-800">FarmWise AI Assistant</h1>
                <p className="text-sm text-green-600">Your personal farming advisor</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {farmer?.primary_crops && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {farmer.primary_crops.slice(0, 2).join(", ")}
                {farmer.primary_crops.length > 2 && ` +${farmer.primary_crops.length - 2}`}
              </Badge>
            )}
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 container mx-auto p-4 max-w-4xl">
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="text-green-800">Chat with AI Assistant</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback
                        className={
                          message.role === "user" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                        }
                      >
                        {message.role === "user" ? <User className="h-4 w-4" /> : <Sprout className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`flex-1 p-3 rounded-lg max-w-[80%] ${
                        message.role === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-50 text-gray-800"
                      }`}
                    >
                      <div className="text-sm">
                        {typeof message.content === "string" ? formatMessageContent(message.content) : message.content}
                      </div>
                    </div>
                  </div>
                ))}

                {status === "in_progress" && (
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-green-100 text-green-700">
                        <Sprout className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 p-3 rounded-lg bg-gray-50 text-gray-800 max-w-[80%]">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Suggested Questions (show when chat is empty) */}
            {messages.length <= 1 && (
              <div className="p-4 border-t bg-gray-50">
                <p className="text-sm text-gray-600 mb-3">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs bg-white hover:bg-green-50 border-green-200 text-green-700"
                      onClick={() => setInput(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t bg-white">
              <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <Button type="button" variant="ghost" size="sm" className="text-gray-500">
                    <Camera className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="text-gray-500">
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="text-gray-500">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about farming..."
                  className="flex-1 border-green-200 focus:border-green-500"
                  disabled={status === "in_progress"}
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || status === "in_progress"}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {status === "in_progress" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-2 text-center">
                AI responses are for guidance only. Always consult local agricultural experts for critical decisions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
