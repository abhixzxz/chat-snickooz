"use client"

import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Mail,
  Phone,
  FileText,
  Share2,
  Ban,
  Settings,
  X,
  Calendar,
  MapPin,
  Clock,
  MessageSquare,
  MoreHorizontal,
  Download,
  ExternalLink,
  Briefcase,
  Globe,
  Twitter,
  Linkedin,
  Github,
  Instagram,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { users } from "@/app/data/mockData"

interface UserProfileSheetProps {
  isOpen: boolean
  onClose: () => void
  userId: number | null
}

export default function UserProfileSheet({ isOpen, onClose, userId }: UserProfileSheetProps) {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("info")


  const user = users.find((u) => u.id === userId)

  useEffect(() => {
    if (isOpen) {
      setLoading(true)
      const timer = setTimeout(() => {
        setLoading(false)
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [isOpen, userId])

  if (!user) return null

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const userStatus = user.status === "active" ? "Active now" : "Last seen 2h ago"

  const mediaItems = [
    { type: "image", url: "https://abhirajk.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdjv4xa6wu%2Fimage%2Fupload%2Fv1737831467%2Fabhiraj_tdwxdf.webp&w=3840&q=75", date: "2 days ago" },
    { type: "image", url: "https://abhirajk.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdjv4xa6wu%2Fimage%2Fupload%2Fv1737831467%2Fabhiraj_tdwxdf.webp&w=3840&q=75", date: "3 days ago" },
    { type: "image", url: "https://abhirajk.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdjv4xa6wu%2Fimage%2Fupload%2Fv1737831467%2Fabhiraj_tdwxdf.webp&w=3840&q=75", date: "1 week ago" },
    { type: "image", url: "https://abhirajk.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdjv4xa6wu%2Fimage%2Fupload%2Fv1737831467%2Fabhiraj_tdwxdf.webp&w=3840&q=75", date: "2 weeks ago" },
    { type: "image", url: "https://abhirajk.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdjv4xa6wu%2Fimage%2Fupload%2Fv1737831467%2Fabhiraj_tdwxdf.webp&w=3840&q=75", date: "3 weeks ago" },
    { type: "image", url: "https://abhirajk.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdjv4xa6wu%2Fimage%2Fupload%2Fv1737831467%2Fabhiraj_tdwxdf.webp&w=3840&q=75", date: "1 month ago" },
    { type: "image", url: "https://abhirajk.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdjv4xa6wu%2Fimage%2Fupload%2Fv1737831467%2Fabhiraj_tdwxdf.webp&w=3840&q=75", date: "1 month ago" },
    { type: "image", url: "https://abhirajk.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdjv4xa6wu%2Fimage%2Fupload%2Fv1737831467%2Fabhiraj_tdwxdf.webp&w=3840&q=75", date: "2 months ago" },
    { type: "image", url: "https://abhirajk.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdjv4xa6wu%2Fimage%2Fupload%2Fv1737831467%2Fabhiraj_tdwxdf.webp&w=3840&q=75", date: "2 months ago" },
  ]

  const fileItems = [
    { name: "Project Proposal.pdf", type: "PDF", size: "2.4 MB", icon: FileText, date: "2 days ago" },
    { name: "Meeting Notes.docx", type: "DOCX", size: "1.2 MB", icon: FileText, date: "1 week ago" },
    { name: "Budget Report.xlsx", type: "XLSX", size: "3.5 MB", icon: FileText, date: "2 weeks ago" },
    { name: "Presentation.pptx", type: "PPTX", size: "5.7 MB", icon: FileText, date: "1 month ago" },
    { name: "Research Paper.pdf", type: "PDF", size: "4.2 MB", icon: FileText, date: "2 months ago" },
  ]

  const linkItems = [
    { title: "Project Dashboard", url: "https://dashboard.example.com", date: "3 days ago" },
    { title: "Team Meeting Notes", url: "https://notes.example.com", date: "1 week ago" },
    { title: "Design Resources", url: "https://design.example.com", date: "2 weeks ago" },
    { title: "Company Wiki", url: "https://wiki.example.com", date: "1 month ago" },
    { title: "Product Roadmap", url: "https://roadmap.example.com", date: "2 months ago" },
  ]


  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-[540px] p-0 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
            <p className="text-sm text-muted-foreground">Loading profile...</p>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <SheetHeader className="px-6 pt-6 pb-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-2 py-0.5 text-xs">
                    Profile
                  </Badge>
                  <Badge variant={user.status === "active" ? "success" : "secondary"} className="px-2 py-0.5 text-xs">
                    {user.status === "active" ? "Online" : "Offline"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Share2 className="h-4 w-4" /> Share Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" /> Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                        <Ban className="h-4 w-4" /> Block User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </SheetHeader>

            <div className="relative mt-6 px-6">
              <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 rounded-xl"></div>
              <div className="absolute -bottom-12 left-6 flex items-end gap-4">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-background">
                    <AvatarImage src={user.avatar || "/placeholder.svg?height=96&width=96"} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-background"></span>
                </div>
                <div className="pb-2">
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {userStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 px-6 flex justify-between items-center">
              <div className="flex gap-3">
                <Button size="sm" variant="default" className="gap-1.5">
                  <MessageSquare className="h-4 w-4" /> Message
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5">
                  <Share2 className="h-4 w-4" /> Share
                </Button>
              </div>
              <Button size="sm" variant="ghost" className="text-destructive gap-1.5">
                <Ban className="h-4 w-4" /> Block
              </Button>
            </div>

            <Separator className="my-6" />

            <div className="px-6 flex-1 overflow-hidden">
              <Tabs
                defaultValue="info"
                value={activeTab}
                onValueChange={handleTabChange}
                className="w-full h-full flex flex-col"
              >
                <TabsList className=" w-full mb-6">
                  <TabsTrigger value="info">Info</TabsTrigger>
                  <TabsTrigger value="media">Media</TabsTrigger>
                  <TabsTrigger value="files">Files</TabsTrigger>
                  <TabsTrigger value="links">Links</TabsTrigger>
                </TabsList>

                <div className="flex-1 overflow-hidden">
                  <TabsContent value="info" className="h-full mt-0">
                    <ScrollArea className="h-[calc(100vh-320px)]">
                      <div className="space-y-6 pr-4">
                        <div className="space-y-3">
                          <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
                          <div className="grid grid-cols-1 gap-3">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                              <Mail className="h-4 w-4 text-primary" />
                              <div>
                                <p className="text-sm font-medium">{user?.email || "abhi88@example.com"}</p>
                                <p className="text-xs text-muted-foreground">Email</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                              <Phone className="h-4 w-4 text-primary" />
                              <div>
                                <p className="text-sm font-medium">{user?.phone || "+91 88333399"}</p>
                                <p className="text-xs text-muted-foreground">Phone</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                              <MapPin className="h-4 w-4 text-primary" />
                              <div>
                                <p className="text-sm font-medium">Mumbai, India</p>
                                <p className="text-xs text-muted-foreground">Location</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-3">
                          <h3 className="text-sm font-medium text-muted-foreground">Professional Information</h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <Briefcase className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm">Senior Product Designer at Acme Inc.</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm">Joined January 2022</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-3">
                          <h3 className="text-sm font-medium text-muted-foreground">Social Profiles</h3>
                          <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" size="sm" className="justify-start gap-2">
                              <Twitter className="h-4 w-4 text-sky-500" />
                              Twitter
                            </Button>
                            <Button variant="outline" size="sm" className="justify-start gap-2">
                              <Linkedin className="h-4 w-4 text-blue-600" />
                              LinkedIn
                            </Button>
                            <Button variant="outline" size="sm" className="justify-start gap-2">
                              <Github className="h-4 w-4" />
                              GitHub
                            </Button>
                            <Button variant="outline" size="sm" className="justify-start gap-2">
                              <Instagram className="h-4 w-4 text-pink-600" />
                              Instagram
                            </Button>
                          </div>
                        </div>

                        <Separator />


                        <div className="space-y-3">
                          <h3 className="text-sm font-medium text-muted-foreground">Settings</h3>
                          <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                            <Settings className="h-4 w-4" />
                            Chat Settings
                          </Button>
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  

                  <TabsContent value="media" className="h-full mt-0">
                    <ScrollArea className="h-[calc(100vh-320px)]">
                      <div className="space-y-6 pr-4">
                        <div className="space-y-1">
                          <h3 className="text-sm font-medium">Shared Media</h3>
                          <p className="text-xs text-muted-foreground">Photos and videos shared in your conversation</p>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          {mediaItems.map((item, index) => (
                            <div key={index} className="group relative aspect-square rounded-md overflow-hidden">
                              <img
                                src={item.url || "/placeholder.svg"}
                                alt={`Media ${index}`}
                                className="object-cover w-full h-full transition-transform group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-white">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-white">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 text-white text-xs">
                                {item.date}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="files" className="h-full mt-0">
                    <ScrollArea className="h-[calc(100vh-320px)]">
                      <div className="space-y-6 pr-4">
                        <div className="space-y-1">
                          <h3 className="text-sm font-medium">Shared Files</h3>
                          <p className="text-xs text-muted-foreground">
                            Documents and files shared in your conversation
                          </p>
                        </div>

                        <div className="space-y-3">
                          {fileItems.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-md bg-primary/10">
                                  <file.icon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{file.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {file.type} • {file.size}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button size="icon" variant="ghost" className="h-8 w-8">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button size="icon" variant="ghost" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Download</DropdownMenuItem>
                                    <DropdownMenuItem>Share</DropdownMenuItem>
                                    <DropdownMenuItem>Copy Link</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="links" className="h-full mt-0">
                    <ScrollArea className="h-[calc(100vh-320px)]">
                      <div className="space-y-6 pr-4">
                        <div className="space-y-1">
                          <h3 className="text-sm font-medium">Shared Links</h3>
                          <p className="text-xs text-muted-foreground">Web links shared in your conversation</p>
                        </div>

                        <div className="space-y-3">
                          {linkItems.map((link, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-md bg-primary/10">
                                  <Globe className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{link.title}</p>
                                  <p className="text-xs text-muted-foreground">{link.url}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button size="icon" variant="ghost" className="h-8 w-8">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button size="icon" variant="ghost" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Open Link</DropdownMenuItem>
                                    <DropdownMenuItem>Copy Link</DropdownMenuItem>
                                    <DropdownMenuItem>Share</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
