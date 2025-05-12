"use client"

import { useState } from "react"
import Image from "next/image"
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Mail,
  Phone,
  Camera,
  Edit,
  Settings,
  Moon,
  Bell,
  LogOut,
  HelpCircle,
  ChevronRight,
  Globe,
  Smartphone,
  Save,
  Trash2,
  ImageIcon,
  Sun,
  Droplets,
  Flame,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Link as LinkIcon
} from "lucide-react"
import { useThemeStore } from "@/app/store/theme-store"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useUserStore } from "@/app/store/useUserStore"
import CoverImage from '../../../public/assets/coverimage.jpg'
import { useRouter } from 'next/navigation';
interface LoggedInUserProfileProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoggedInUserProfile({ isOpen, onClose }: LoggedInUserProfileProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const [editMode, setEditMode] = useState(false)
  const [statusMenuOpen, setStatusMenuOpen] = useState(false)
  const { theme, setTheme } = useThemeStore()
  const router = useRouter();
  const { user } = useUserStore()

  // If user is not logged in, return null
  if (!user) return null

  const currentUser = {
    id: user._id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    status: user.status,
    avatar: user.avatar,
    username: user.username,
    lastActive: new Date(user.lastActive).toLocaleString(),
    createdAt: new Date(user.createdAt).toLocaleDateString(),
    gender: user.gender,
    dateOfBirth: new Date(user.dateOfBirth).toLocaleDateString(),
    socialLinks: {
      twitter: '',
      linkedin: '',
      github: '',
      instagram: ''
    }
  }

  const statusOptions = [
    { value: "active", label: "Available", color: "bg-green-500" },
    { value: "busy", label: "Busy", color: "bg-red-500" },
    { value: "away", label: "Away", color: "bg-yellow-500" },
    { value: "offline", label: "Appear Offline", color: "bg-gray-500" },
  ]

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setEditMode(false)
  }

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const handleLogout = () => {
    useUserStore.getState().logout();
    router.push('/auth/login');
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-[400px] p-0 overflow-hidden">
        <div className="h-full flex flex-col">
          <SheetHeader className="px-6 pt-6 pb-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-2 py-0.5 text-xs">
                  My Profile
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                {activeTab === "profile" && !editMode && (
                  <Button variant="ghost" size="icon" onClick={toggleEditMode} className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                {activeTab === "profile" && editMode && (
                  <Button variant="ghost" size="icon" onClick={toggleEditMode} className="h-8 w-8 text-primary">
                    <Save className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </SheetHeader>

          <div className="relative mt-6 px-6">
            <div className="h-32 rounded-xl overflow-hidden">
              <Image
                src={CoverImage}
                alt="Cover"
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-12 left-6 flex items-end gap-4">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {currentUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-md"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Update Profile Picture</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="flex flex-col items-center gap-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                          <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex gap-2">
                          <Button variant="outline" className="gap-2">
                            <ImageIcon className="h-4 w-4" />
                            Upload Photo
                          </Button>
                          <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <div
                  className={`absolute bottom-1 right-10 h-4 w-4 rounded-full border-2 border-background ${statusOptions.find((s) => s.value === currentUser.status)?.color || "bg-green-500"
                    }`}
                ></div>
              </div>
              <div className="pb-2">
                <h2 className="text-xl font-semibold">{currentUser.name}</h2>
                <Dialog open={statusMenuOpen} onOpenChange={setStatusMenuOpen}>
                  <DialogTrigger asChild>
                    <Button variant="link" className="h-6 p-0 text-sm text-muted-foreground">
                      {statusOptions.find((s) => s.value === currentUser.status)?.label || "Available"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[300px]">
                    <DialogHeader>
                      <DialogTitle>Set Status</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {statusOptions.map((status) => (
                        <Button
                          key={status.value}
                          variant="ghost"
                          className="justify-start gap-3 px-2"
                          onClick={() => setStatusMenuOpen(false)}
                        >
                          <span className={`h-3 w-3 rounded-full ${status.color}`}></span>
                          {status.label}
                        </Button>
                      ))}
                      <Separator />
                      <div className="space-y-2">
                        <Label htmlFor="custom-status">Custom status</Label>
                        <Input id="custom-status" placeholder="What's on your mind?" />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          <div className="mt-16 px-6">
            <Tabs
              defaultValue="profile"
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full h-full flex flex-col"
            >
              <TabsList className=" w-full mb-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-hidden">
                <TabsContent value="profile" className="h-full mt-0">
                  <ScrollArea className="h-[calc(100vh-380px)] overflow-y-auto">
                    <div className="space-y-6 pr-4">
                      {editMode ? (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue={currentUser.name} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" defaultValue={currentUser.email} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" defaultValue={currentUser.phone} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Input id="role" defaultValue={currentUser.role} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company">Company</Label>
                            <Input id="company" defaultValue={currentUser.company} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" defaultValue={currentUser.location} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea id="bio" defaultValue={currentUser.bio} rows={4} />
                          </div>
                          <div className="space-y-4">
                            <h3 className="text-sm font-medium">Social Links</h3>
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <Label htmlFor="twitter">Twitter Username</Label>
                                <div className="relative">
                                  <Input id="twitter" defaultValue={currentUser.socialLinks.twitter} />
                                  <Twitter className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="linkedin">LinkedIn Username</Label>
                                <div className="relative">
                                  <Input id="linkedin" defaultValue={currentUser.socialLinks.linkedin} />
                                  <Linkedin className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="github">GitHub Username</Label>
                                <div className="relative">
                                  <Input id="github" defaultValue={currentUser.socialLinks.github} />
                                  <Github className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="instagram">Instagram Username</Label>
                                <div className="relative">
                                  <Input id="instagram" defaultValue={currentUser.socialLinks.instagram} />
                                  <Instagram className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 pt-2">
                            <Button variant="outline" onClick={toggleEditMode}>
                              Cancel
                            </Button>
                            <Button onClick={toggleEditMode}>Save Changes</Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-3">
                            <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
                            <div className="grid grid-cols-1 gap-3">
                              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                <Mail className="h-4 w-4 text-primary" />
                                <div>
                                  <p className="text-sm font-medium">{currentUser.email}</p>
                                  <p className="text-xs text-muted-foreground">Email</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                <Phone className="h-4 w-4 text-primary" />
                                <div>
                                  <p className="text-sm font-medium">{currentUser.phone}</p>
                                  <p className="text-xs text-muted-foreground">Phone</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                <Globe className="h-4 w-4 text-primary" />
                                <div>
                                  <p className="text-sm font-medium">{currentUser.location}</p>
                                  <p className="text-xs text-muted-foreground">Location</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-3">
                            <h3 className="text-sm font-medium text-muted-foreground">Professional Information</h3>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                <User className="h-4 w-4 text-primary" />
                                <div>
                                  <p className="text-sm font-medium">{currentUser.role}</p>
                                  <p className="text-xs text-muted-foreground">Role</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                <Settings className="h-4 w-4 text-primary" />
                                <div>
                                  <p className="text-sm font-medium">{currentUser.company}</p>
                                  <p className="text-xs text-muted-foreground">Company</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-3">
                            <h3 className="text-sm font-medium text-muted-foreground">Social Links</h3>
                            <div className="grid grid-cols-2 gap-3">
                              <a
                                href={`https://twitter.com/${currentUser.socialLinks.twitter}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                              >
                                <Twitter className="h-4 w-4 text-[#1DA1F2]" />
                                <div>
                                  <p className="text-sm font-medium">@{currentUser.socialLinks.twitter}</p>
                                  <p className="text-xs text-muted-foreground">Twitter</p>
                                </div>
                              </a>
                              <a
                                href={`https://linkedin.com/in/${currentUser.socialLinks.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                              >
                                <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                                <div>
                                  <p className="text-sm font-medium">{currentUser.socialLinks.linkedin}</p>
                                  <p className="text-xs text-muted-foreground">LinkedIn</p>
                                </div>
                              </a>
                              <a
                                href={`https://github.com/${currentUser.socialLinks.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                              >
                                <Github className="h-4 w-4" />
                                <div>
                                  <p className="text-sm font-medium">{currentUser.socialLinks.github}</p>
                                  <p className="text-xs text-muted-foreground">GitHub</p>
                                </div>
                              </a>
                              <a
                                href={`https://instagram.com/${currentUser.socialLinks.instagram}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                              >
                                <Instagram className="h-4 w-4 text-[#E4405F]" />
                                <div>
                                  <p className="text-sm font-medium">@{currentUser.socialLinks.instagram}</p>
                                  <p className="text-xs text-muted-foreground">Instagram</p>
                                </div>
                              </a>
                            </div>
                          </div>

                          <Separator />


                        </>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="settings" className="h-full mt-0">
                  <ScrollArea className="h-[calc(100vh-380px)] overflow-y-auto">
                    <div className="space-y-6 pr-4">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Theme</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <Button
                            variant="outline"
                            className={`h-24 flex-col gap-2 ${theme === 'default' ? 'border-primary' : ''}`}
                            onClick={() => setTheme('default')}
                          >
                            <Sun className="h-6 w-6" />
                            <span>Default</span>
                          </Button>
                          <Button
                            variant="outline"
                            className={`h-24 flex-col gap-2 bg-[#121212] text-white hover:text-white ${theme === 'dark-night' ? 'border-[#1DB954]' : ''}`}
                            onClick={() => setTheme('dark-night')}
                          >
                            <Moon className="h-6 w-6" />
                            <span>Dark Night</span>
                          </Button>
                          <Button
                            variant="outline"
                            className={`h-24 flex-col gap-2 bg-[#0a0a0a] text-white hover:text-white ${theme === 'red-blood' ? 'border-red-600' : ''}`}
                            onClick={() => setTheme('red-blood')}
                          >
                            <Flame className="h-6 w-6 text-red-600" />
                            <span>Red Blood</span>
                          </Button>
                          <Button
                            variant="outline"
                            className={`h-24 flex-col gap-2 bg-[#0c0c2b] text-white hover:text-white ${theme === 'blue-ocean' ? 'border-blue-500' : ''}`}
                            onClick={() => setTheme('blue-ocean')}
                          >
                            <Droplets className="h-6 w-6 text-blue-500" />
                            <span>Blue Ocean</span>
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <h3 className="text-sm font-medium text-muted-foreground">Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Bell className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Push Notifications</span>
                            </div>
                            <Switch id="push-notifications" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Email Notifications</span>
                            </div>
                            <Switch id="email-notifications" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Smartphone className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">SMS Notifications</span>
                            </div>
                            <Switch id="sms-notifications" />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <h3 className="text-sm font-medium text-muted-foreground">Language & Region</h3>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Language</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">English (US)</span>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <h3 className="text-sm font-medium text-muted-foreground">Help & Support</h3>
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <HelpCircle className="h-4 w-4" />
                          Help Center
                        </Button>
                      </div>

                      <Separator />

                      <Button
                        onClick={handleLogout}
                        variant="destructive" className="w-full gap-2">
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </Button>
                    </div>
                  </ScrollArea>
                </TabsContent>


              </div>
            </Tabs>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
