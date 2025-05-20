"use client"

import { useState, useEffect } from "react"
import { Settings } from "lucide-react"
import LoggedInUserProfile from "./logged-in-user-profile"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useUserStore } from "@/app/store/useUserStore"
import { connectionsApi } from "@/app/api/connections"

interface Connection {
  connectionId: string
  user: {
    _id: string
    firstName: string
    lastName: string
    username: string
    avatar: string
    status: string
  }
  lastMessage: { text: string } | null
  lastMessageTime: string | null
  unreadCount: number
}

interface LeftSidebarProps {
  onChatSelect: (chatId: string) => void
  selectedChatId?: string | null
}

export default function LeftSidebar({ onChatSelect, selectedChatId }: LeftSidebarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [connections, setConnections] = useState<Connection[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useUserStore()

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await connectionsApi.getUserConnections();
        console.log('API Response:', response);
        const connectionsData = response
        console.log('Connections data:', connectionsData);
        setConnections(connectionsData);
      } catch (err) {
        console.error('Error fetching connections:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch connections');
        setConnections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  const openProfile = () => setIsProfileOpen(true)
  const closeProfile = () => setIsProfileOpen(false)
  console.log("connexxxxx datga",)

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
                <AvatarImage src={user?.avatar?.replace(/[`\s]/g, '') || "/placeholder.svg"} alt={user?.firstName} />
                <AvatarFallback>{user?.firstName.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
            </div>
            <div>
              <h2 className="font-semibold">{user?.firstName}</h2>
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
        {loading ? (
          <div className="flex justify-center items-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">{error}</div>
        ) : connections.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No conversations yet</div>
        ) : (
          connections.map((connection) => (
            <div
              key={connection.connectionId}
              className={`flex items-center p-4 hover:bg-[var(--muted)] cursor-pointer transition-colors ${selectedChatId === connection.connectionId ? "bg-[var(--primary)]/5 border-l-4 border-[var(--primary)]" : ""}`}
              onClick={() => onChatSelect(connection.connectionId)}
            >
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={connection.user.avatar?.trim().replace(/[`]/g, '') || "/placeholder.svg?height=40&width=40"} alt={`${connection.user.firstName} ${connection.user.lastName}`} />
                  <AvatarFallback>{connection.user.firstName.charAt(0)}</AvatarFallback>
                </Avatar>
                {connection.user.status === "active" && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                )}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{`${connection.user.firstName} ${connection.user.lastName}`}</p>
                  <p className="text-xs text-gray-400">
                    {connection.lastMessageTime ? new Date(connection.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 truncate max-w-[150px]">
                    {connection.lastMessage?.text || "No messages yet"}
                  </p>
                  {connection.unreadCount > 0 && (
                    <Badge className="h-5 w-5 flex items-center justify-center rounded-full p-0 text-xs">
                      {connection.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Logged In User Profile Sheet */}
      <LoggedInUserProfile isOpen={isProfileOpen} onClose={closeProfile} />
    </div>
  )
}
