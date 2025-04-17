"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
  CalendarRange,
  MapPin,
  Check,
  ChevronRight,
  Hotel,
  Plane,
  Train,
  Bus,
  Car,
  Utensils,
  Mountain,
  Umbrella,
  Clock,
} from "lucide-react"
import { LocationSearch } from "./location-search"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

type Step = 1 | 2 | 3 | 4 | 5

interface FormData {
  destination: string
  dateRange: {
    from: Date
    to?: Date
  }
  hotelRating: string
  travelMode: string
  specialRequirements: string[]
  selectedHotels: string[]
  selectedTransport: string[]
  selectedAttractions: string[]
  additionalNotes: string
}

export function CustomItinerary() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    destination: "",
    dateRange: {
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 5)),
    },
    hotelRating: "4-star",
    travelMode: "flight",
    specialRequirements: [],
    selectedHotels: [],
    selectedTransport: [],
    selectedAttractions: [],
    additionalNotes: "",
  })

  // Sample data for demonstration
  const hotels = [
    {
      id: "hotel1",
      name: "Grand Plaza Hotel",
      rating: "5-star",
      price: 12000,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "hotel2",
      name: "Comfort Inn",
      rating: "4-star",
      price: 8000,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "hotel3",
      name: "Budget Stay",
      rating: "3-star",
      price: 5000,
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
    },
  ]

  const transport = [
    { id: "transport1", type: "Flight", name: "IndiGo Airlines", time: "06:00 - 08:30", price: 5500 },
    { id: "transport2", type: "Train", name: "Rajdhani Express", time: "16:00 - 08:00", price: 2200 },
    { id: "transport3", type: "Bus", name: "Volvo A/C Sleeper", time: "20:00 - 08:00", price: 1800 },
  ]

  const attractions = [
    { id: "attr1", name: "Heritage Walking Tour", type: "Cultural", price: 1200, duration: "3 hours" },
    { id: "attr2", name: "Adventure Park", type: "Adventure", price: 2000, duration: "Full day" },
    { id: "attr3", name: "Local Food Tour", type: "Culinary", price: 1500, duration: "4 hours" },
    { id: "attr4", name: "Museum Visit", type: "Cultural", price: 800, duration: "2 hours" },
  ]

  const events = [
    { id: "event1", name: "Local Music Festival", date: "Next Saturday", price: 1500, type: "Entertainment" },
    { id: "event2", name: "Cultural Exhibition", date: "This Weekend", price: 500, type: "Cultural" },
    { id: "event3", name: "Food & Wine Festival", date: "Next Month", price: 2000, type: "Culinary" },
  ]

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as Step)
      // Scroll to top when changing steps
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step)
      // Scroll to top when changing steps
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleSubmit = () => {
    // Generate a unique ID for this itinerary
    const itineraryId = `ITN-${Math.floor(Math.random() * 10000)}`

    // Create the itinerary object to save
    const itineraryToSave = {
      id: itineraryId,
      ...formData,
      createdAt: new Date().toISOString(),
      status: "Pending Review",
      estimatedPrice: "₹25,000 - ₹35,000",
    }

    // Get existing itineraries from localStorage or initialize empty array
    const existingItineraries = JSON.parse(localStorage.getItem("savedItineraries") || "[]")

    // Add new itinerary to the array
    const updatedItineraries = [itineraryToSave, ...existingItineraries]

    // Save back to localStorage
    localStorage.setItem("savedItineraries", JSON.stringify(updatedItineraries))

    setShowConfirmation(true)
    setCurrentStep(1)
    // Reset form data to initial state
    setFormData({
      destination: "",
      dateRange: {
        from: new Date(),
        to: new Date(new Date().setDate(new Date().getDate() + 5)),
      },
      hotelRating: "4-star",
      travelMode: "flight",
      specialRequirements: [],
      selectedHotels: [],
      selectedTransport: [],
      selectedAttractions: [],
      additionalNotes: "",
    })
  }

  const handleDestinationSelect = (city: string) => {
    setFormData({ ...formData, destination: city })
  }

  const handleDateChange = (dateRange: { from: Date; to?: Date }) => {
    setFormData({ ...formData, dateRange })
  }

  const toggleHotelSelection = (hotelId: string) => {
    if (formData.selectedHotels.includes(hotelId)) {
      setFormData({
        ...formData,
        selectedHotels: formData.selectedHotels.filter((id) => id !== hotelId),
      })
    } else {
      setFormData({
        ...formData,
        selectedHotels: [...formData.selectedHotels, hotelId],
      })
    }
  }

  const toggleTransportSelection = (transportId: string) => {
    if (formData.selectedTransport.includes(transportId)) {
      setFormData({
        ...formData,
        selectedTransport: formData.selectedTransport.filter((id) => id !== transportId),
      })
    } else {
      setFormData({
        ...formData,
        selectedTransport: [...formData.selectedTransport, transportId],
      })
    }
  }

  const toggleAttractionSelection = (attractionId: string) => {
    if (formData.selectedAttractions.includes(attractionId)) {
      setFormData({
        ...formData,
        selectedAttractions: formData.selectedAttractions.filter((id) => id !== attractionId),
      })
    } else {
      setFormData({
        ...formData,
        selectedAttractions: [...formData.selectedAttractions, attractionId],
      })
    }
  }

  const toggleSpecialRequirement = (requirement: string) => {
    if (formData.specialRequirements.includes(requirement)) {
      setFormData({
        ...formData,
        specialRequirements: formData.specialRequirements.filter((req) => req !== requirement),
      })
    } else {
      setFormData({
        ...formData,
        specialRequirements: [...formData.specialRequirements, requirement],
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-8">
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium",
                currentStep === step
                  ? "bg-[#1E3A8A] text-white"
                  : currentStep > step
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500",
              )}
            >
              {currentStep > step ? <Check className="h-5 w-5" /> : step}
            </div>
            <span className="text-xs mt-2 text-center hidden sm:block">
              {step === 1 && "Destination"}
              {step === 2 && "Dates"}
              {step === 3 && "Preferences"}
              {step === 4 && "Add Items"}
              {step === 5 && "Review"}
            </span>
          </div>
        ))}
      </div>

      {/* Step 1: Destination */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#1E3A8A]">Where would you like to go?</h2>
            <p className="text-muted-foreground">Select your dream destination</p>
          </div>

          <LocationSearch
            label="Destination"
            placeholder="Search for a city or region"
            indianCities={true}
            onSelect={handleDestinationSelect}
            className="max-w-md mx-auto"
          />

          {formData.destination && (
            <div className="bg-[#FFF5E1] p-4 rounded-lg max-w-md mx-auto">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-[#1E3A8A] mr-2" />
                <span className="font-medium">{formData.destination}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Great choice! {formData.destination} is a popular destination with many attractions.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Travel Dates */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#1E3A8A]">When are you planning to travel?</h2>
            <p className="text-muted-foreground">Select your travel dates</p>
          </div>

          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium mb-1">Travel Dates</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal")}>
                  <CalendarRange className="mr-2 h-4 w-4" />
                  {formData.dateRange?.from ? (
                    formData.dateRange.to ? (
                      <>
                        {format(formData.dateRange.from, "LLL dd, y")} - {format(formData.dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(formData.dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={formData.dateRange?.from}
                  selected={formData.dateRange}
                  onSelect={handleDateChange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          {formData.dateRange.from && formData.dateRange.to && (
            <div className="bg-[#FFF5E1] p-4 rounded-lg max-w-md mx-auto">
              <p className="text-sm">
                <span className="font-medium">Trip duration: </span>
                {Math.ceil(
                  (formData.dateRange.to.getTime() - formData.dateRange.from.getTime()) / (1000 * 60 * 60 * 24),
                )}{" "}
                days
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Perfect! We'll find the best options for your{" "}
                {Math.ceil(
                  (formData.dateRange.to.getTime() - formData.dateRange.from.getTime()) / (1000 * 60 * 60 * 24),
                )}
                -day trip.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Preferences */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#1E3A8A]">What are your preferences?</h2>
            <p className="text-muted-foreground">Customize your trip experience</p>
          </div>

          <div className="max-w-md mx-auto space-y-6">
            <div className="space-y-3">
              <h3 className="font-medium">Hotel Star Rating</h3>
              <RadioGroup
                defaultValue={formData.hotelRating}
                onValueChange={(value) => setFormData({ ...formData, hotelRating: value })}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3-star" id="3-star" />
                  <Label htmlFor="3-star">3-Star (Budget-friendly)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4-star" id="4-star" />
                  <Label htmlFor="4-star">4-Star (Comfortable)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5-star" id="5-star" />
                  <Label htmlFor="5-star">5-Star (Luxury)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium">Preferred Travel Mode</h3>
              <RadioGroup
                defaultValue={formData.travelMode}
                onValueChange={(value) => setFormData({ ...formData, travelMode: value })}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="flight" id="flight" />
                  <Label htmlFor="flight" className="flex items-center">
                    <Plane className="h-4 w-4 mr-2" />
                    Flight
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="train" id="train" />
                  <Label htmlFor="train" className="flex items-center">
                    <Train className="h-4 w-4 mr-2" />
                    Train
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bus" id="bus" />
                  <Label htmlFor="bus" className="flex items-center">
                    <Bus className="h-4 w-4 mr-2" />
                    Bus
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cab" id="cab" />
                  <Label htmlFor="cab" className="flex items-center">
                    <Car className="h-4 w-4 mr-2" />
                    Private Cab
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium">Special Requirements</h3>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vegetarian"
                    checked={formData.specialRequirements.includes("vegetarian")}
                    onCheckedChange={() => toggleSpecialRequirement("vegetarian")}
                  />
                  <label
                    htmlFor="vegetarian"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                  >
                    <Utensils className="h-4 w-4 mr-1" />
                    Vegetarian Meals
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="adventure"
                    checked={formData.specialRequirements.includes("adventure")}
                    onCheckedChange={() => toggleSpecialRequirement("adventure")}
                  />
                  <label
                    htmlFor="adventure"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                  >
                    <Mountain className="h-4 w-4 mr-1" />
                    Adventure Activities
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="family"
                    checked={formData.specialRequirements.includes("family")}
                    onCheckedChange={() => toggleSpecialRequirement("family")}
                  />
                  <label
                    htmlFor="family"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                  >
                    <Umbrella className="h-4 w-4 mr-1" />
                    Family-Friendly Options
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Add Hotels, Transport & Attractions */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#1E3A8A]">Add to your itinerary</h2>
            <p className="text-muted-foreground">Select hotels, transport, and attractions</p>
          </div>

          <div className="space-y-8">
            {/* Hotels */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Hotel className="h-5 w-5 mr-2 text-[#1E3A8A]" />
                Hotels
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotels.map((hotel) => (
                  <Card
                    key={hotel.id}
                    className={cn(
                      "cursor-pointer transition-all overflow-hidden",
                      formData.selectedHotels.includes(hotel.id)
                        ? "border-[#1E3A8A] ring-2 ring-[#1E3A8A]"
                        : "hover:border-[#1E3A8A]",
                    )}
                    onClick={() => toggleHotelSelection(hotel.id)}
                  >
                    <div className="relative h-48 w-full">
                      <Image src={hotel.image || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
                      {formData.selectedHotels.includes(hotel.id) && (
                        <div className="absolute top-2 right-2 bg-[#1E3A8A] text-white rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-medium">{hotel.name}</h4>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="outline">{hotel.rating}</Badge>
                        <span className="font-bold">₹{hotel.price}/night</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Transport */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Plane className="h-5 w-5 mr-2 text-[#1E3A8A]" />
                Transport
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {transport.map((item) => (
                  <Card
                    key={item.id}
                    className={cn(
                      "cursor-pointer transition-all",
                      formData.selectedTransport.includes(item.id)
                        ? "border-[#1E3A8A] ring-2 ring-[#1E3A8A]"
                        : "hover:border-[#1E3A8A]",
                    )}
                    onClick={() => toggleTransportSelection(item.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge>{item.type}</Badge>
                          <h4 className="font-medium mt-2">{item.name}</h4>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {item.time}
                          </div>
                        </div>
                        {formData.selectedTransport.includes(item.id) && (
                          <div className="bg-[#1E3A8A] text-white rounded-full p-1">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <span className="font-bold">₹{item.price}</span>
                        <span className="text-xs text-muted-foreground"> per person</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Attractions & Events */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Mountain className="h-5 w-5 mr-2 text-[#1E3A8A]" />
                Attractions & Events
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {attractions.map((attraction) => (
                  <Card
                    key={attraction.id}
                    className={cn(
                      "cursor-pointer transition-all",
                      formData.selectedAttractions.includes(attraction.id)
                        ? "border-[#1E3A8A] ring-2 ring-[#1E3A8A]"
                        : "hover:border-[#1E3A8A]",
                    )}
                    onClick={() => toggleAttractionSelection(attraction.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge variant="outline">{attraction.type}</Badge>
                          <h4 className="font-medium mt-2">{attraction.name}</h4>
                          <p className="text-sm text-muted-foreground">{attraction.duration}</p>
                        </div>
                        {formData.selectedAttractions.includes(attraction.id) && (
                          <div className="bg-[#1E3A8A] text-white rounded-full p-1">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <span className="font-bold">₹{attraction.price}</span>
                        <span className="text-xs text-muted-foreground"> per person</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Live Events */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium flex items-center">
                  <span className="relative flex h-3 w-3 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  Live Events in {formData.destination || "your destination"}
                </h3>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Live Now
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {events.map((event) => (
                  <Card
                    key={event.id}
                    className={cn(
                      "cursor-pointer transition-all border-green-200",
                      formData.selectedAttractions.includes(event.id)
                        ? "border-[#1E3A8A] ring-2 ring-[#1E3A8A]"
                        : "hover:border-[#1E3A8A]",
                    )}
                    onClick={() => toggleAttractionSelection(event.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{event.type}</Badge>
                          <h4 className="font-medium mt-2">{event.name}</h4>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                        </div>
                        {formData.selectedAttractions.includes(event.id) && (
                          <div className="bg-[#1E3A8A] text-white rounded-full p-1">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <span className="font-bold">₹{event.price}</span>
                        <span className="text-xs text-muted-foreground"> per person</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <h3 className="text-lg font-medium mb-4">Additional Notes</h3>
              <Textarea
                placeholder="Any special requests or additional information for your trip..."
                className="min-h-[100px]"
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Review */}
      {currentStep === 5 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#1E3A8A]">Review Your Itinerary</h2>
            <p className="text-muted-foreground">Check all details before submitting</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Trip Summary</CardTitle>
                <CardDescription>Your custom itinerary details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Destination</h4>
                    <p className="font-medium">{formData.destination || "Not specified"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Travel Dates</h4>
                    <p className="font-medium">
                      {formData.dateRange.from && formData.dateRange.to
                        ? `${format(formData.dateRange.from, "MMM dd, yyyy")} - ${format(
                            formData.dateRange.to,
                            "MMM dd, yyyy",
                          )}`
                        : "Not specified"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Hotel Preference</h4>
                    <p className="font-medium">{formData.hotelRating}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Travel Mode</h4>
                    <p className="font-medium capitalize">{formData.travelMode}</p>
                  </div>
                </div>

                {formData.specialRequirements.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Special Requirements</h4>
                    <div className="flex flex-wrap gap-2">
                      {formData.specialRequirements.map((req) => (
                        <Badge key={req} variant="outline">
                          {req === "vegetarian" && "Vegetarian Meals"}
                          {req === "adventure" && "Adventure Activities"}
                          {req === "family" && "Family-Friendly Options"}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {formData.selectedHotels.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Selected Hotels</h4>
                    <div className="space-y-2">
                      {formData.selectedHotels.map((hotelId) => {
                        const hotel = hotels.find((h) => h.id === hotelId)
                        return hotel ? (
                          <div key={hotelId} className="flex justify-between items-center">
                            <span>{hotel.name}</span>
                            <span className="font-medium">₹{hotel.price}/night</span>
                          </div>
                        ) : null
                      })}
                    </div>
                  </div>
                )}

                {formData.selectedTransport.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Selected Transport</h4>
                    <div className="space-y-2">
                      {formData.selectedTransport.map((transportId) => {
                        const item = transport.find((t) => t.id === transportId)
                        return item ? (
                          <div key={transportId} className="flex justify-between items-center">
                            <span>
                              {item.type}: {item.name}
                            </span>
                            <span className="font-medium">₹{item.price}</span>
                          </div>
                        ) : null
                      })}
                    </div>
                  </div>
                )}

                {formData.selectedAttractions.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Selected Attractions & Events</h4>
                    <div className="space-y-2">
                      {formData.selectedAttractions.map((attrId) => {
                        const attraction = [...attractions, ...events].find((a) => a.id === attrId)
                        return attraction ? (
                          <div key={attrId} className="flex justify-between items-center">
                            <span>{attraction.name}</span>
                            <span className="font-medium">₹{attraction.price}</span>
                          </div>
                        ) : null
                      })}
                    </div>
                  </div>
                )}

                {formData.additionalNotes && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Additional Notes</h4>
                    <p className="text-sm">{formData.additionalNotes}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Price Range</p>
                  <p className="text-xl font-bold text-[#1E3A8A]">₹25,000 - ₹35,000</p>
                  <p className="text-xs text-muted-foreground">Final price will be confirmed after review</p>
                </div>
                <Button className="bg-[#D72638] hover:bg-[#D72638]/90" onClick={handleSubmit}>
                  Submit Itinerary
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        {currentStep > 1 ? (
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
        ) : (
          <div></div>
        )}

        {currentStep < 5 && (
          <Button
            onClick={handleNext}
            disabled={
              (currentStep === 1 && !formData.destination) ||
              (currentStep === 2 && (!formData.dateRange.from || !formData.dateRange.to))
            }
            className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90"
          >
            Continue
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md" onClick={() => setShowConfirmation(false)}>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Itinerary Submitted Successfully! 🎉</DialogTitle>
            <DialogDescription className="text-center pt-4">
              Our team will review your preferences and get back to you with the final price, detailed itinerary, and
              all booking arrangements.
            </DialogDescription>
            <div className="mt-4 text-center font-medium text-[#1E3A8A]">
              We will connect with you super soon! Stay tuned!
            </div>
          </DialogHeader>
          <p className="text-center text-sm text-muted-foreground mt-4">Click anywhere to close</p>
        </DialogContent>
      </Dialog>
    </div>
  )
}

