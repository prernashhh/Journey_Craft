"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Star, X, MapPin, Calendar, Heart, Share2, Bookmark } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface Destination {
  id: string
  name: string
  location: string
  image: string
  description: string
  highlights: string[]
  price: number
  rating: number
}

interface DestinationModalProps {
  destination: Destination
  isOpen: boolean
  onClose: () => void
}

export function DestinationModal({ destination, isOpen, onClose }: DestinationModalProps): JSX.Element {
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)

  // Simulate multiple images for the destination
  const images = [
    destination.image,
    "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden rounded-2xl">
        <div className="relative h-80 w-full">
          <div
            className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {images.map((img, idx) => (
              <div key={idx} className="relative h-80 w-full flex-shrink-0">
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${destination.name} view ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          {/* Image navigation */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
          >
            <X className="h-5 w-5 text-white transform rotate-45" />
          </button>

          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
          >
            <X className="h-5 w-5 text-white transform -rotate-45" />
          </button>

          {/* Image indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentImageIndex(idx)
                }}
              />
            ))}
          </div>

          <DialogClose className="absolute top-4 right-4 rounded-full bg-white/20 backdrop-blur-sm p-2 hover:bg-white/40 transition-colors">
            <X className="h-4 w-4 text-white" />
            <span className="sr-only">Close</span>
          </DialogClose>

          <button
            className="absolute top-4 left-4 rounded-full bg-white/20 backdrop-blur-sm p-2 hover:bg-white/40 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              setIsFavorite(!isFavorite)
            }}
          >
            <Heart className={cn("h-4 w-4", isFavorite ? "fill-red-500 text-red-500" : "text-white")} />
          </button>
        </div>

        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#1E3A8A]">{destination.name}</DialogTitle>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{destination.location}</span>
            </div>
          </DialogHeader>

          <div className="flex items-center gap-1 mt-2">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span className="font-medium">{destination.rating}</span>
            <span className="text-muted-foreground text-sm ml-1">(120+ reviews)</span>
          </div>

          <p className="mt-4 text-muted-foreground">{destination.description}</p>

          <div className="mt-6">
            <h4 className="font-medium mb-2">Highlights</h4>
            <div className="flex flex-wrap gap-2">
              {destination.highlights.map((highlight, index) => (
                <span key={index} className="px-3 py-1 bg-[#FFF5E1] text-[#1E3A8A] rounded-full text-sm">
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="font-bold text-2xl text-[#1E3A8A]">
                ₹{destination.price.toLocaleString()}
                <span className="text-xs font-normal text-muted-foreground ml-1">per person</span>
              </p>
              <p className="text-sm text-muted-foreground">Includes taxes and fees</p>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <Button variant="outline" className="flex-1 sm:flex-initial">
                <Calendar className="mr-2 h-4 w-4" />
                Check Availability
              </Button>
              <Button className="flex-1 sm:flex-initial bg-[#D72638] hover:bg-[#D72638]/90">Book Now</Button>
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-4 border-t pt-4">
            <Button variant="ghost" size="sm" className="text-[#1E3A8A]">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="sm" className="text-[#1E3A8A]">
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

