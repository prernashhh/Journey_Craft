"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Calendar, Heart, MapPin, Star, Trash2, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface FavoriteDestination {
  id: string
  name: string
  location: string
  image: string
  description: string
  highlights: string[]
  price: number
  rating: number
  duration?: string
}

interface FavoriteItinerary {
  id: string
  title: string
  destination: string
  duration: string
  price: number
  rating: number
  image: string
  highlights: string[]
  included: string[]
}

export default function MyAccountPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [favoriteDestinations, setFavoriteDestinations] = useState<FavoriteDestination[]>([])
  const [favoriteItineraries, setFavoriteItineraries] = useState<FavoriteItinerary[]>([])

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    phone: "+91 98765 43210",
    address: "123 Main Street, Mumbai, Maharashtra, 400001",
  }

  useEffect(() => {
    // Load favorite destinations from localStorage
    const savedDestinations = localStorage.getItem("favoriteDestinations")
    if (savedDestinations) {
      const favoriteIds = JSON.parse(savedDestinations) as string[]

      // Fetch destination details for each ID
      // In a real app, this would be an API call
      // For now, we'll use mock data
      const mockDestinations: FavoriteDestination[] = [
        {
          id: "kerala",
          name: "Kerala",
          location: "Southern India",
          image: "https://images.unsplash.com/photo-1609340442497-dee4a8e3ad42?auto=format&fit=crop&w=800&q=80",
          description: "God's Own Country with serene backwaters and lush greenery.",
          highlights: ["Alleppey Backwaters", "Munnar", "Kovalam Beach", "Wayanad"],
          price: 16999,
          rating: 4.8,
          duration: "7 Days / 6 Nights",
        },
        {
          id: "andaman",
          name: "Andaman",
          location: "Bay of Bengal",
          image: "https://images.unsplash.com/photo-1544550581-1bcabf842b77?auto=format&fit=crop&w=800&q=80",
          description: "Pristine beaches and crystal-clear waters for the perfect island getaway.",
          highlights: ["Radhanagar Beach", "Cellular Jail", "Ross Island", "Scuba Diving"],
          price: 22999,
          rating: 4.9,
          duration: "6 Days / 5 Nights",
        },
        {
          id: "ladakh",
          name: "Ladakh",
          location: "Jammu & Kashmir",
          image: "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?auto=format&fit=crop&w=800&q=80",
          description: "Breathtaking landscapes and Buddhist monasteries in the high-altitude desert.",
          highlights: ["Pangong Lake", "Nubra Valley", "Magnetic Hill", "Thiksey Monastery"],
          price: 24999,
          rating: 4.8,
          duration: "8 Days / 7 Nights",
        },
      ]

      // Filter destinations that are in the favorites list
      const filteredDestinations = mockDestinations.filter((dest) => favoriteIds.includes(dest.id))

      setFavoriteDestinations(filteredDestinations)
    }

    // Load favorite itineraries from localStorage
    const savedItineraries = localStorage.getItem("favoriteItineraries")
    if (savedItineraries) {
      const favoriteIds = JSON.parse(savedItineraries) as string[]

      // Mock itineraries data
      const mockItineraries: FavoriteItinerary[] = [
        {
          id: "manali-adventure",
          title: "Magical Manali Adventure",
          destination: "Manali, Himachal Pradesh",
          duration: "5 Days / 4 Nights",
          price: 24999,
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
          highlights: ["Solang Valley", "Rohtang Pass", "Hadimba Temple", "Old Manali"],
          included: ["Hotels", "Meals", "Transport", "Guide"],
        },
        {
          id: "jaipur-heritage",
          title: "Royal Jaipur Heritage Tour",
          destination: "Jaipur, Rajasthan",
          duration: "4 Days / 3 Nights",
          price: 18999,
          rating: 4.7,
          image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
          highlights: ["Amber Fort", "City Palace", "Hawa Mahal", "Jantar Mantar"],
          included: ["Hotels", "Breakfast", "Transport", "Guide"],
        },
        {
          id: "kerala-backwaters",
          title: "Kerala Backwaters Bliss",
          destination: "Kochi, Munnar & Alleppey",
          duration: "7 Days / 6 Nights",
          price: 32999,
          rating: 4.9,
          image: "https://images.unsplash.com/photo-1609340442497-dee4a8e3ad42?auto=format&fit=crop&w=800&q=80",
          highlights: ["Houseboat Stay", "Tea Plantations", "Kathakali Show", "Ayurvedic Spa"],
          included: ["Hotels", "Breakfast & Dinner", "Private Transfers", "Guided Tours"],
        },
      ]

      // Filter itineraries that are in the favorites list
      const filteredItineraries = mockItineraries.filter((itin) => favoriteIds.includes(itin.id))

      setFavoriteItineraries(filteredItineraries)
    }
  }, [])

  const removeFavoriteDestination = (id: string) => {
    // Remove from state
    setFavoriteDestinations((prev) => prev.filter((dest) => dest.id !== id))

    // Remove from localStorage
    const savedDestinations = localStorage.getItem("favoriteDestinations")
    if (savedDestinations) {
      const favoriteIds = JSON.parse(savedDestinations) as string[]
      const updatedIds = favoriteIds.filter((favId) => favId !== id)
      localStorage.setItem("favoriteDestinations", JSON.stringify(updatedIds))
    }
  }

  const removeFavoriteItinerary = (id: string) => {
    // Remove from state
    setFavoriteItineraries((prev) => prev.filter((itin) => itin.id !== id))

    // Remove from localStorage
    const savedItineraries = localStorage.getItem("favoriteItineraries")
    if (savedItineraries) {
      const favoriteIds = JSON.parse(savedItineraries) as string[]
      const updatedIds = favoriteIds.filter((favId) => favId !== id)
      localStorage.setItem("favoriteItineraries", JSON.stringify(updatedIds))
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 shrink-0">
              <div className="sticky top-24">
                <div className="flex flex-col items-center mb-6 p-4 bg-white rounded-xl shadow-sm">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <nav className="flex flex-col">
                    <button
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 text-sm font-medium border-l-2 transition-colors",
                        activeTab === "profile"
                          ? "border-l-[#1E3A8A] bg-blue-50 text-[#1E3A8A]"
                          : "border-l-transparent hover:bg-gray-50",
                      )}
                      onClick={() => setActiveTab("profile")}
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </button>

                    <button
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 text-sm font-medium border-l-2 transition-colors",
                        activeTab === "favorites"
                          ? "border-l-[#1E3A8A] bg-blue-50 text-[#1E3A8A]"
                          : "border-l-transparent hover:bg-gray-50",
                      )}
                      onClick={() => setActiveTab("favorites")}
                    >
                      <Heart className="h-4 w-4" />
                      Favorites
                    </button>

                    <button
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 text-sm font-medium border-l-2 transition-colors",
                        activeTab === "bookings"
                          ? "border-l-[#1E3A8A] bg-blue-50 text-[#1E3A8A]"
                          : "border-l-transparent hover:bg-gray-50",
                      )}
                      onClick={() => setActiveTab("bookings")}
                    >
                      <Calendar className="h-4 w-4" />
                      My Bookings
                    </button>
                  </nav>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {activeTab === "profile" && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h1 className="text-2xl font-bold mb-6">My Profile</h1>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={user.name} className="mt-1" />
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" defaultValue={user.email} className="mt-1" />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue={user.phone} className="mt-1" />
                      </div>

                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" defaultValue={user.address} className="mt-1" />
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">Password</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" className="mt-1" />
                        </div>

                        <div>
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" className="mt-1" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90">Save Changes</Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "favorites" && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h1 className="text-2xl font-bold mb-6">My Favorites</h1>

                  <Tabs defaultValue="destinations">
                    <TabsList className="mb-6">
                      <TabsTrigger value="destinations">Destinations</TabsTrigger>
                      <TabsTrigger value="itineraries">Itineraries</TabsTrigger>
                    </TabsList>

                    <TabsContent value="destinations">
                      {favoriteDestinations.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {favoriteDestinations.map((destination) => (
                            <Card key={destination.id} className="overflow-hidden">
                              <div className="relative h-48">
                                <Image
                                  src={destination.image || "/placeholder.svg"}
                                  alt={destination.name}
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                  <h3 className="text-xl font-bold">{destination.name}</h3>
                                  <div className="flex items-center text-sm">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    <span>{destination.location}</span>
                                  </div>
                                </div>
                                <button
                                  className="absolute top-3 right-3 p-1.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors"
                                  onClick={() => removeFavoriteDestination(destination.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-white" />
                                </button>
                              </div>

                              <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                                    <span className="font-medium">{destination.rating}</span>
                                  </div>
                                  <Badge className="bg-[#FFF5E1] text-[#1E3A8A] hover:bg-[#FFF5E1]">
                                    {destination.duration}
                                  </Badge>
                                </div>

                                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{destination.description}</p>

                                <div className="flex justify-between items-center">
                                  <p className="font-bold text-[#1E3A8A]">
                                    ₹{destination.price.toLocaleString()}
                                    <span className="text-xs font-normal text-gray-500 ml-1">per person</span>
                                  </p>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A]/10"
                                    asChild
                                  >
                                    <Link href="#">View Details</Link>
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                          <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No favorite destinations yet</h3>
                          <p className="text-muted-foreground mb-6">Start exploring and save destinations you love</p>
                          <Button className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90" asChild>
                            <Link href="/trending-destinations">Explore Destinations</Link>
                          </Button>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="itineraries">
                      {favoriteItineraries.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {favoriteItineraries.map((itinerary) => (
                            <Card key={itinerary.id} className="overflow-hidden">
                              <div className="relative h-48">
                                <Image
                                  src={itinerary.image || "/placeholder.svg"}
                                  alt={itinerary.title}
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                  <h3 className="text-xl font-bold">{itinerary.title}</h3>
                                  <div className="flex items-center text-sm">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    <span>{itinerary.destination}</span>
                                  </div>
                                </div>
                                <button
                                  className="absolute top-3 right-3 p-1.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors"
                                  onClick={() => removeFavoriteItinerary(itinerary.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-white" />
                                </button>
                              </div>

                              <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                                    <span className="font-medium">{itinerary.rating}</span>
                                  </div>
                                  <Badge className="bg-[#FFF5E1] text-[#1E3A8A] hover:bg-[#FFF5E1]">
                                    {itinerary.duration}
                                  </Badge>
                                </div>

                                <div className="mb-3">
                                  <h4 className="text-sm font-medium mb-1">Highlights</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {itinerary.highlights.slice(0, 2).map((highlight, index) => (
                                      <span
                                        key={index}
                                        className="text-xs px-2 py-1 rounded-full bg-[#FFF5E1] text-[#1E3A8A]"
                                      >
                                        {highlight}
                                      </span>
                                    ))}
                                    {itinerary.highlights.length > 2 && (
                                      <span className="text-xs px-2 py-1 rounded-full bg-[#FFF5E1] text-[#1E3A8A]">
                                        +{itinerary.highlights.length - 2} more
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="flex justify-between items-center">
                                  <p className="font-bold text-[#1E3A8A]">
                                    ₹{itinerary.price.toLocaleString()}
                                    <span className="text-xs font-normal text-gray-500 ml-1">per person</span>
                                  </p>
                                  <Button className="bg-[#D72638] hover:bg-[#D72638]/90" size="sm">
                                    Book Now
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                          <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No favorite itineraries yet</h3>
                          <p className="text-muted-foreground mb-6">Save itineraries to plan your future trips</p>
                          <Button className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90" asChild>
                            <Link href="/">Explore Itineraries</Link>
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {activeTab === "bookings" && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                    <p className="text-muted-foreground mb-6">Your booking history will appear here</p>
                    <Button className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90" asChild>
                      <Link href="/">Book a Trip</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

