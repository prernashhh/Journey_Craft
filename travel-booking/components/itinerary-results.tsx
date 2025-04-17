import { ItineraryCard } from "./itinerary-card"
import type { JSX } from "react"

interface Itinerary {
  title: string
  destination: string
  duration: string
  price: number
  rating: number
  image: string
  highlights: string[]
  included: string[]
}

interface ItineraryResultsProps {
  city: string
}

export function ItineraryResults({ city }: ItineraryResultsProps): JSX.Element {
  const itineraries: Record<string, Itinerary[]> = {
    Manali: [
      {
        title: "Manali Adventure Package",
        destination: "Manali, Himachal Pradesh",
        duration: "3 Days / 2 Nights",
        price: 6999,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=1200&q=80",
        highlights: ["Solang Valley", "Hadimba Temple", "Mall Road", "River Rafting"],
        included: ["Hotels", "Breakfast", "Sightseeing", "Transfers"],
      },
      {
        title: "Manali Honeymoon Special",
        destination: "Manali, Himachal Pradesh",
        duration: "5 Days / 4 Nights",
        price: 12999,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1626265774643-f1a5b5dc54a9?auto=format&fit=crop&w=1200&q=80",
        highlights: ["Rohtang Pass", "Solang Valley", "Private Dinner", "Couple Activities"],
        included: ["Luxury Hotel", "All Meals", "Private Cab", "Guide"],
      },
      {
        title: "Manali Adventure Plus",
        destination: "Manali, Himachal Pradesh",
        duration: "4 Days / 3 Nights",
        price: 8999,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1553001081-6f95a1ceb5d3?auto=format&fit=crop&w=1200&q=80",
        highlights: ["Paragliding", "Skiing", "Camping", "Trekking"],
        included: ["Hotels", "Activities", "Equipment", "Guide"],
      },
    ],
    Jaipur: [
      {
        title: "Jaipur Heritage Walk",
        destination: "Jaipur, Rajasthan",
        duration: "2 Days / 1 Night",
        price: 3999,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
        highlights: ["City Palace", "Hawa Mahal", "Local Markets", "Food Tour"],
        included: ["Hotel", "Breakfast", "Guide", "Transfers"],
      },
      {
        title: "Royal Jaipur Experience",
        destination: "Jaipur, Rajasthan",
        duration: "4 Days / 3 Nights",
        price: 9999,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
        highlights: ["Amber Fort", "Elephant Ride", "Sound & Light Show", "Royal Dinner"],
        included: ["Heritage Hotel", "All Meals", "Private Car", "Guide"],
      },
    ],
    Goa: [
      {
        title: "Goa Beach & Culture",
        destination: "North & South Goa",
        duration: "6 Days / 5 Nights",
        price: 24999,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
        highlights: ["Beach Hopping", "Water Sports", "Cruise", "Old Goa Churches"],
        included: ["Beach Resort", "Breakfast", "Bike Rental", "Activities"],
      },
    ],
  }

  const cityItineraries = itineraries[city] || []

  if (cityItineraries.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-muted-foreground">No itineraries found for {city}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cityItineraries.map((itinerary, index) => (
        <ItineraryCard key={index} {...itinerary} />
      ))}
    </div>
  )
}

