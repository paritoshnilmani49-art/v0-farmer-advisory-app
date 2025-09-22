"use client"

import type React from "react"

import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sprout, User, Send, Loader2, ArrowLeft, Mic, Camera, FileText, AlertCircle } from "lucide-react"
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
  const [error, setError] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const {
    messages,
    handleSubmit,
    isLoading,
    input: chatInput,
    handleInputChange,
    error: chatError,
  } = useChat({
    api: "/api/chat",
    body: { farmerId },
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
    onError: (error) => {
      console.error("Chat error:", error)
      setError("Sorry, I'm having trouble connecting. Please check your internet connection and try again.")
    },
  })

  useEffect(() => {
    if (chatError) {
      setError(chatError.message || "An error occurred while chatting")
    }
  }, [chatError])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const formatMessageContent = (content: string) => {
    const lines = content.split("\n")
    const elements: React.ReactNode[] = []
    let currentList: string[] = []

    lines.forEach((line, index) => {
      const trimmedLine = line.trim()

      if (trimmedLine.startsWith("•") || trimmedLine.startsWith("-") || trimmedLine.startsWith("*")) {
        currentList.push(trimmedLine.substring(1).trim())
      } else {
        if (currentList.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc list-inside space-y-1 my-2 ml-4">
              {currentList.map((item, i) => (
                <li key={i} className="text-sm">
                  {item}
                </li>
              ))}
            </ul>,
          )
          currentList = []
        }

        if (trimmedLine === "") {
          elements.push(<br key={index} />)
        } else if (
          trimmedLine.includes("🌱") ||
          trimmedLine.includes("🌾") ||
          trimmedLine.includes("🐛") ||
          trimmedLine.includes("🌤️") ||
          trimmedLine.includes("📊")
        ) {
          elements.push(
            <p key={index} className="mb-2 font-medium text-green-700">
              {trimmedLine}
            </p>,
          )
        } else {
          elements.push(
            <p key={index} className="mb-2">
              {trimmedLine}
            </p>,
          )
        }
      }
    })

    if (currentList.length > 0) {
      elements.push(
        <ul key="final-list" className="list-disc list-inside space-y-1 my-2 ml-4">
          {currentList.map((item, i) => (
            <li key={i} className="text-sm">
              {item}
            </li>
          ))}
        </ul>,
      )
    }

    return elements
  }

  const suggestedQuestions = [
    "What should I plant this season?",
    "My plants have yellow leaves, what's wrong?",
    "How do I know when to water my crops?",
    "What's the best fertilizer for my soil?",
    "How can I protect my crops from pests naturally?",
    "When is the best time to harvest?",
  ]

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!chatInput.trim()) {
      setError("Please enter a message before sending")
      return
    }
    handleSubmit(e)
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-green-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-green-200 p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-green-700 hover:text-green-800 hover:bg-green-100"
            >
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-full">
                <Sprout className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-green-800">FarmWise AI Assistant</h1>
                <p className="text-sm text-green-600">Your personal farming advisor</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {farmer?.primary_crops && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Growing: {farmer.primary_crops.slice(0, 2).join(", ")}
                {farmer.primary_crops.length > 2 && ` +${farmer.primary_crops.length - 2} more`}
              </Badge>
            )}
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 container mx-auto p-4 max-w-5xl">
        <Card className="h-full flex flex-col shadow-lg border-green-200">
          <CardHeader className="pb-4 bg-green-50 border-b border-green-100">
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Sprout className="h-5 w-5" />
              Chat with Your AI Farming Assistant
            </CardTitle>
            <p className="text-sm text-green-600">Ask me anything about farming, crops, soil, pests, or weather!</p>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-4 ${
                      message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                      <AvatarFallback
                        className={message.role === "user" ? "bg-blue-500 text-white" : "bg-green-500 text-white"}
                      >
                        {message.role === "user" ? <User className="h-5 w-5" /> : <Sprout className="h-5 w-5" />}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`flex-1 p-4 rounded-2xl max-w-[85%] shadow-sm ${
                        message.role === "user"
                          ? "bg-blue-500 text-white ml-auto"
                          : "bg-white text-gray-800 border border-green-100"
                      }`}
                    >
                      <div className="text-sm leading-relaxed">
                        {typeof message.content === "string" ? formatMessageContent(message.content) : message.content}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                      <AvatarFallback className="bg-green-500 text-white">
                        <Sprout className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 p-4 rounded-2xl bg-white text-gray-800 max-w-[85%] border border-green-100 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <Loader2 className="h-5 w-5 animate-spin text-green-600" />
                        <span className="text-sm text-green-700">Your AI assistant is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Error Message */}
            {(error || chatError) && (
              <div className="mx-6 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-700">{error || chatError?.message}</span>
              </div>
            )}

            {/* Suggested Questions */}
            {messages.length <= 1 && (
              <div className="p-6 border-t bg-green-50/50">
                <p className="text-sm font-medium text-green-800 mb-3">💡 Try asking me:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-left justify-start h-auto p-3 bg-white hover:bg-green-50 border-green-200 text-green-700 hover:text-green-800"
                      onClick={() => handleInputChange({ target: { value: question } } as any)}
                    >
                      <span className="text-xs leading-relaxed">{question}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-6 border-t bg-white">
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <Button type="button" variant="ghost" size="sm" className="text-gray-400 hover:text-green-600">
                      <Camera className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="text-gray-400 hover:text-green-600">
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="text-gray-400 hover:text-green-600">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    value={chatInput}
                    onChange={handleInputChange}
                    placeholder="Type your farming question here... (e.g., 'My tomato plants are turning yellow')"
                    className="flex-1 border-green-200 focus:border-green-500 text-base py-3"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={!chatInput.trim() || isLoading}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  💡 AI responses are for guidance only. Always consult local agricultural experts for critical
                  decisions.
                </p>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
