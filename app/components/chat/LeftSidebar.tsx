"use client"

import { useState } from "react"
import { users } from "@/app/data/mockData"
import { Settings } from "lucide-react"
import LoggedInUserProfile from "./logged-in-user-profile"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface LeftSidebarProps {
  onChatSelect: (chatId: number) => void
  selectedChatId?: number | null
}

export default function LeftSidebar({ onChatSelect, selectedChatId }: LeftSidebarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const openProfile = () => setIsProfileOpen(true)
  const closeProfile = () => setIsProfileOpen(false)

  const currentUser = {
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
  }

  return (
    <div className="h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      {/* Top Profile Section */}
      <div className="p-4 border-b border-[var(--muted)]">
        <div
          className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--muted)] cursor-pointer transition-colors"
          onClick={openProfile}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
            </div>
            <div>
              <h2 className="font-semibold">{currentUser.name}</h2>
              <p className="text-xs text-gray-500">Available</p>
            </div>
          </div>
          <Settings className="w-5 h-5 text-gray-500" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-[var(--muted)]">
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full p-2 pl-8 bg-[var(--muted)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
          />
          <svg
            className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-xs font-medium text-gray-500 mb-2">RECENT CONVERSATIONS</h3>
        </div>
        {users.map((user) => (
          <div
            key={user.id}
            className={`flex items-center p-4 hover:bg-[var(--muted)] cursor-pointer transition-colors ${selectedChatId === user.id ? "bg-[var(--primary)]/5 border-l-4 border-[var(--primary)]" : ""}`}
            onClick={() => onChatSelect(user.id)}
          >
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar || "/placeholder.svg?height=40&width=40"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {user.status === "active" && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
              )}
            </div>
            <div className="ml-3 flex-1">
              <div className="flex justify-between items-center">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-gray-400">{user.lastMessageTime || "12:45 PM"}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500 truncate max-w-[150px]">
                  {user.lastMessage || "Hey, how are you doing?"}
                </p>
                {user.unreadCount && (
                  <Badge className="h-5 w-5 flex items-center justify-center rounded-full p-0 text-xs">
                    {user.unreadCount}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Logged In User Profile Sheet */}
      <LoggedInUserProfile isOpen={isProfileOpen} onClose={closeProfile} />
    </div>
  )
}
