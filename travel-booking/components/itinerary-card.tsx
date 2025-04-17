"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Calendar, Heart } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ItineraryCardProps {
  title: string
  destination: string
  duration: string
  price: number
  rating: number
  image: string
  highlights: string[]
  included: string[]
}

export function ItineraryCard({
  title,
  destination,
  duration,
  price,
  rating,
  image,
  highlights,
  included,
}: ItineraryCardProps): JSX.Element {
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [isHovered, setIsHovered] = useState<boolean>(false)

  // Generate a unique ID for this itinerary based on its title
  const itineraryId = title.toLowerCase().replace(/\s+/g, "-")

  // Check if this itinerary is in favorites when component mounts
  useEffect(() => {
    const savedItineraries = localStorage.getItem("favoriteItineraries")
    if (savedItineraries) {
      const favoriteIds = JSON.parse(savedItineraries) as string[]
      setIsFavorite(favoriteIds.includes(itineraryId))
    }
  }, [itineraryId])

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Update state
    setIsFavorite(!isFavorite)

    // Update localStorage
    const savedItineraries = localStorage.getItem("favoriteItineraries")
    let favoriteIds = savedItineraries ? (JSON.parse(savedItineraries) as string[]) : []

    if (isFavorite) {
      // Remove from favorites
      favoriteIds = favoriteIds.filter((id) => id !== itineraryId)
    } else {
      // Add to favorites
      favoriteIds.push(itineraryId)
    }

    localStorage.setItem("favoriteItineraries", JSON.stringify(favoriteIds))
  }

  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className={cn("object-cover transition-transform duration-700", isHovered ? "scale-110" : "scale-100")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <button
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors"
          onClick={toggleFavorite}
        >
          <Heart className={cn("h-4 w-4", isFavorite ? "fill-red-500 text-red-500" : "text-white")} />
        </button>

        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-white">{rating}</span>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="font-bold text-lg text-[#1E3A8A] line-clamp-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{destination}</p>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium mb-1">Highlights</h4>
            <div className="flex flex-wrap gap-2">
              {highlights.slice(0, 2).map((highlight, index) => (
                <span key={index} className="text-xs px-2 py-1 rounded-full bg-[#FFF5E1] text-[#1E3A8A]">
                  {highlight}
                </span>
              ))}
              {highlights.length > 2 && (
                <span className="text-xs px-2 py-1 rounded-full bg-[#FFF5E1] text-[#1E3A8A]">
                  +{highlights.length - 2} more
                </span>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-1">Included</h4>
            <div className="flex flex-wrap gap-2">
              {included.slice(0, 2).map((item, index) => (
                <span key={index} className="text-xs px-2 py-1 rounded-full bg-[#FFF5E1] text-[#1E3A8A]">
                  {item}
                </span>
              ))}
              {included.length > 2 && (
                <span className="text-xs px-2 py-1 rounded-full bg-[#FFF5E1] text-[#1E3A8A]">
                  +{included.length - 2} more
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="font-bold text-[#1E3A8A] text-lg">
              ₹{price.toLocaleString()}
              <span className="text-xs font-normal text-muted-foreground ml-1">per person</span>
            </p>
          </div>
          <Button className="bg-[#D72638] hover:bg-[#D72638]/90">Book Now</Button>
        </div>
      </CardContent>
    </Card>
  )
}

