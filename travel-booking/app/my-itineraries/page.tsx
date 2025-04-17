"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { MapPin, Calendar, Hotel, Plane, Train, Bus, Car, ChevronDown, ChevronUp } from "lucide-react"

interface Itinerary {
  id: string
  destination: string
  dateRange: {
    from: string
    to?: string
  }
  hotelRating: string
  travelMode: string
  specialRequirements: string[]
  selectedHotels: string[]
  selectedTransport: string[]
  selectedAttractions: string[]
  additionalNotes: string
  createdAt: string
  status: string
  estimatedPrice: string
}

export default function MyItinerariesPage() {
  const [itineraries, setItineraries] = useState<Itinerary[]>([])
  const [expandedItinerary, setExpandedItinerary] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("all")

  useEffect(() => {
    // Load saved itineraries from localStorage
    const savedItineraries = JSON.parse(localStorage.getItem("savedItineraries") || "[]")
    setItineraries(savedItineraries)
  }, [])

  const toggleExpand = (id: string) => {
    if (expandedItinerary === id) {
      setExpandedItinerary(null)
    } else {
      setExpandedItinerary(id)
    }
  }

  const filteredItineraries =
    activeTab === "all"
      ? itineraries
      : itineraries.filter((itinerary) => {
          if (activeTab === "pending") return itinerary.status === "Pending Review"
          if (activeTab === "reviewed") return itinerary.status === "Reviewed"
          if (activeTab === "confirmed") return itinerary.status === "Confirmed"
          return true
        })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Reviewed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Confirmed":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getTravelModeIcon = (mode: string) => {
    switch (mode) {
      case "flight":
        return <Plane className="h-4 w-4" />
      case "train":
        return <Train className="h-4 w-4" />
      case "bus":
        return <Bus className="h-4 w-4" />
      case "cab":
        return <Car className="h-4 w-4" />
      default:
        return <Plane className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 mt-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-[#1E3A8A] mb-6">My Itineraries</h1>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-6">
              {filteredItineraries.length > 0 ? (
                filteredItineraries.map((itinerary) => (
                  <Card key={itinerary.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl flex items-center">
                            <MapPin className="h-5 w-5 mr-2 text-[#1E3A8A]" />
                            {itinerary.destination}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            Itinerary ID: {itinerary.id} • Created on{" "}
                            {format(new Date(itinerary.createdAt), "MMM dd, yyyy")}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(itinerary.status)}>{itinerary.status}</Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="pb-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">
                            {itinerary.dateRange.from && itinerary.dateRange.to
                              ? `${format(new Date(itinerary.dateRange.from), "MMM dd")} - ${format(
                                  new Date(itinerary.dateRange.to),
                                  "MMM dd, yyyy",
                                )}`
                              : "Dates not specified"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Hotel className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{itinerary.hotelRating} accommodation</span>
                        </div>
                        <div className="flex items-center">
                          {getTravelModeIcon(itinerary.travelMode)}
                          <span className="text-sm ml-2 capitalize">{itinerary.travelMode} travel</span>
                        </div>
                      </div>

                      {expandedItinerary === itinerary.id && (
                        <div className="mt-4 space-y-4 border-t pt-4">
                          {itinerary.specialRequirements.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium mb-2">Special Requirements</h4>
                              <div className="flex flex-wrap gap-2">
                                {itinerary.specialRequirements.map((req) => (
                                  <Badge key={req} variant="outline">
                                    {req === "vegetarian" && "Vegetarian Meals"}
                                    {req === "adventure" && "Adventure Activities"}
                                    {req === "family" && "Family-Friendly Options"}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {itinerary.selectedHotels.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium mb-2">Selected Hotels</h4>
                              <p className="text-sm text-muted-foreground">
                                {itinerary.selectedHotels.length} hotel(s) selected
                              </p>
                            </div>
                          )}

                          {itinerary.selectedTransport.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium mb-2">Selected Transport</h4>
                              <p className="text-sm text-muted-foreground">
                                {itinerary.selectedTransport.length} transport option(s) selected
                              </p>
                            </div>
                          )}

                          {itinerary.selectedAttractions.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium mb-2">Selected Attractions & Events</h4>
                              <p className="text-sm text-muted-foreground">
                                {itinerary.selectedAttractions.length} attraction(s) selected
                              </p>
                            </div>
                          )}

                          {itinerary.additionalNotes && (
                            <div>
                              <h4 className="text-sm font-medium mb-2">Additional Notes</h4>
                              <p className="text-sm text-muted-foreground">{itinerary.additionalNotes}</p>
                            </div>
                          )}

                          {itinerary.status === "Reviewed" && (
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h4 className="text-sm font-medium text-blue-800 mb-2">Agent Feedback</h4>
                              <p className="text-sm text-blue-700">
                                We've reviewed your itinerary and have some great options for you! Our travel expert
                                will contact you shortly to discuss the details.
                              </p>
                            </div>
                          )}

                          {itinerary.status === "Confirmed" && (
                            <div className="bg-green-50 p-4 rounded-lg">
                              <h4 className="text-sm font-medium text-green-800 mb-2">Booking Confirmed</h4>
                              <p className="text-sm text-green-700">
                                Your itinerary has been confirmed! All booking details have been sent to your email.
                                Have a wonderful trip!
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>

                    <CardFooter className="flex justify-between pt-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Estimated Price</p>
                        <p className="font-bold text-[#1E3A8A]">{itinerary.estimatedPrice}</p>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center"
                          onClick={() => toggleExpand(itinerary.id)}
                        >
                          {expandedItinerary === itinerary.id ? (
                            <>
                              Less Details
                              <ChevronUp className="ml-2 h-4 w-4" />
                            </>
                          ) : (
                            <>
                              More Details
                              <ChevronDown className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                        <Button size="sm" className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90">
                          Contact Agent
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No itineraries found</h3>
                  <p className="text-muted-foreground mb-6">
                    {activeTab === "all"
                      ? "You haven't created any custom itineraries yet."
                      : `You don't have any ${activeTab} itineraries.`}
                  </p>
                  <Button className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90" onClick={() => (window.location.href = "/")}>
                    Create New Itinerary
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}

