"use client"

import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Calendar, Check, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Image from "next/image"
import { useEffect } from "react"

interface Day {
  day: number
  title: string
  description: string
  activities: string[]
  meals: string[]
}

interface Destination {
  id: string
  name: string
  location: string
  image: string
  description: string
  highlights: string[]
  price: number
  rating: number
  reviews: number
  duration: string
  season: string
  activities: string[]
  itinerary: Day[]
  inclusions: string[]
  exclusions: string[]
}

interface DestinationDetailModalProps {
  destination: Destination
  isOpen: boolean
  onClose: () => void
}

export function DestinationDetailModal({ destination, isOpen, onClose }: DestinationDetailModalProps): JSX.Element {
  // Add effect to hide/show navbar when modal opens/closes
  useEffect(() => {
    const header = document.querySelector("header")
    if (header) {
      if (isOpen) {
        header.style.display = "none"
      } else {
        header.style.display = "flex"
      }
    }

    // Cleanup function to ensure header is visible when component unmounts
    return () => {
      if (header) {
        header.style.display = "flex"
      }
    }
  }, [isOpen])

  if (!destination) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden rounded-2xl max-h-[90vh] overflow-y-auto">
        <div className="relative h-96 w-full overflow-hidden">
          {/* Enhanced image styling with animation and effects */}
          <Image
            src={destination.image || "/placeholder.svg"}
            alt={destination.name}
            fill
            className="object-cover transform hover:scale-105 transition-transform duration-1000 ease-in-out"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

          <DialogClose className="absolute top-4 right-4 rounded-full bg-white/20 backdrop-blur-sm p-2 hover:bg-white/40 transition-colors">
            <ChevronDown className="h-4 w-4 text-white" />
            <span className="sr-only">Close</span>
          </DialogClose>

          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-3xl font-bold mb-1 drop-shadow-lg">{destination.name}</h2>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{destination.location}</span>
              </div>
              <div className="w-1 h-1 bg-white/50 rounded-full"></div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{destination.rating}</span>
                <span className="opacity-80">({destination.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <div className="px-6 pt-4 border-b">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="overview" className="text-sm">
                Overview
              </TabsTrigger>
              <TabsTrigger value="itinerary" className="text-sm">
                Itinerary
              </TabsTrigger>
              <TabsTrigger value="booking" className="text-sm">
                Book Now
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="p-6 focus-visible:outline-none focus-visible:ring-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2 text-gray-900">About</h3>
                  <p className="text-gray-600">{destination.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3 text-gray-900">Highlights</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {destination.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#1E3A8A]"></div>
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">Activities</h3>
                  <div className="flex flex-wrap gap-2">
                    {destination.activities.map((activity, idx) => (
                      <Badge key={idx} className="bg-[#FFF5E1] text-[#1E3A8A] hover:bg-[#FFF5E1] px-3 py-1">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="text-lg font-medium mb-4 text-gray-900">Trip Details</h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">{destination.duration}</span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-gray-600">Best Season</span>
                      <span className="font-medium">{destination.season}</span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-gray-600">Group Size</span>
                      <span className="font-medium">2-12 people</span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-gray-600">Languages</span>
                      <span className="font-medium">English, Hindi</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Price</span>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#1E3A8A]">₹{destination.price.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">per person (incl. taxes)</p>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <Button
                        variant="outline"
                        className="flex-1 border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A]/10"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Check Dates
                      </Button>
                      <Button className="flex-1 bg-[#D72638] hover:bg-[#D72638]/90">Book Now</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="itinerary" className="p-6 focus-visible:outline-none focus-visible:ring-0">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-4">Day-by-Day Itinerary</h3>
              <p className="text-gray-600 mb-6">
                Experience the best of {destination.name} with our carefully crafted itinerary
              </p>

              <div className="space-y-6">
                {destination.itinerary.map((day, idx) => (
                  <div key={idx} className="relative">
                    {/* Timeline connector */}
                    {idx < destination.itinerary.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200"></div>
                    )}

                    <div className="flex gap-4">
                      <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center font-bold">
                        {day.day}
                      </div>

                      <div className="flex-grow">
                        <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                          <h4 className="font-bold text-lg text-[#1E3A8A] mb-2">{day.title}</h4>
                          <p className="text-gray-600 mb-4">{day.description}</p>

                          <div className="mb-4">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Today's Activities:</h5>
                            <div className="flex flex-wrap gap-2">
                              {day.activities.map((activity, actIdx) => (
                                <span
                                  key={actIdx}
                                  className="inline-flex items-center text-xs px-2 py-1 bg-[#FFF5E1] rounded-full text-[#1E3A8A]"
                                >
                                  <Check className="h-3 w-3 mr-1" />
                                  {activity}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-gray-700">Meals:</span>
                            <div className="flex gap-1">
                              {day.meals.map((meal, mealIdx) => (
                                <span
                                  key={mealIdx}
                                  className="text-xs px-2 py-0.5 bg-gray-200 rounded-full text-gray-700"
                                >
                                  {meal}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div>
                <h3 className="text-lg font-medium mb-3 text-gray-900">What's Included</h3>
                <ul className="space-y-2">
                  {destination.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3 text-gray-900">What's Not Included</h3>
                <ul className="space-y-2">
                  {destination.exclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="h-4 w-4 text-red-500 mt-0.5 flex items-center justify-center">×</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="booking" className="p-6 focus-visible:outline-none focus-visible:ring-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-[#1E3A8A] mb-4">Book Your Trip</h3>
                <p className="text-gray-600 mb-6">
                  Select your preferred dates and options to book this amazing trip to {destination.name}
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Travel Dates</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="date"
                          className="pl-10 w-full h-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
                        />
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="date"
                          className="pl-10 w-full h-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Number of Travelers</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Adults</label>
                        <select className="w-full h-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Children (2-12 yrs)</label>
                        <select className="w-full h-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent">
                          {[0, 1, 2, 3, 4].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Room Preference</label>
                    <select className="w-full h-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent">
                      <option value="standard">Standard Room</option>
                      <option value="deluxe">Deluxe Room</option>
                      <option value="suite">Suite</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Additional Requirements</label>
                    <textarea
                      className="w-full h-24 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent p-2"
                      placeholder="Any special requests or dietary requirements?"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-medium mb-4 text-gray-900">Booking Summary</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-gray-600">Destination</span>
                      <span className="font-medium">{destination.name}</span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">{destination.duration}</span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-gray-600">Travelers</span>
                      <span className="font-medium">2 Adults</span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-gray-600">Room Type</span>
                      <span className="font-medium">Standard Room</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Base Price (per person)</span>
                      <span>₹{destination.price.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Taxes & Fees</span>
                      <span>₹{Math.round(destination.price * 0.18).toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center font-bold text-lg pt-2 border-t border-gray-200">
                      <span>Total (2 Adults)</span>
                      <span className="text-[#1E3A8A]">
                        ₹{(destination.price * 2 + destination.price * 2 * 0.18).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-[#D72638] hover:bg-[#D72638]/90 py-6">Book Now</Button>

                    <Button variant="outline" className="w-full border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A]/10">
                      <Calendar className="mr-2 h-4 w-4" />
                      Check Other Dates
                    </Button>

                    <p className="text-xs text-center text-gray-500 mt-2">
                      No payment required now. Reserve your spot with a free cancellation policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

