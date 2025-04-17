"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Compass, Building2, Plane, Train, Bus, Car } from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FlightSearch } from "@/components/flight-search"
import { HotelSearch } from "@/components/hotel-search"
import { TrainSearch } from "@/components/train-search"
import { BusSearch } from "@/components/bus-search"
import { CabSearch } from "@/components/cab-search"
import { TripSearch } from "@/components/trip-search"
import { TrendingDestinations } from "@/components/trending-destinations"
import { SpecialOffers } from "@/components/special-offers"
import { TravelInfoCards } from "@/components/travel-info-cards"

type SectionType = "trips" | "hotels" | "flights" | "trains" | "buses" | "cabs"

interface SectionItem {
  id: SectionType
  icon: React.ElementType
  label: string
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionType>("trips")

  const sections: SectionItem[] = [
    { id: "trips", icon: Compass, label: "Trips" },
    { id: "hotels", icon: Building2, label: "Hotels" },
    { id: "flights", icon: Plane, label: "Flights" },
    { id: "trains", icon: Train, label: "Trains" },
    { id: "buses", icon: Bus, label: "Buses" },
    { id: "cabs", icon: Car, label: "Cabs" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <div className="relative h-[600px] w-full mt-16">
        <Image
          src="https://images.unsplash.com/photo-1585123388867-3bfe6dd4bdbf?auto=format&fit=crop&w=2000&q=80"
          alt="Beautiful travel destination"
          fill
          className="object-cover brightness-[0.85]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A8A]/60 to-[#1E3A8A]/40" />

        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center pt-0 md:pt-0">
          {/* Moved text higher by adjusting padding and positioning */}
          <div className="max-w-3xl mx-auto text-center -mt-96">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Craft Your Perfect <span className="text-[#FFC857]">Journey</span>
            </h1>
            <p className="text-xl text-white/95 drop-shadow-lg">
              Discover handcrafted experiences and create unforgettable memories
            </p>
          </div>
        </div>
      </div>

      {/* Search Section - Positioned higher to overlap more with the hero */}
      <div className="container mx-auto px-4 -mt-96 relative z-20">
        <div className="max-w-5xl mx-auto">
          {/* Tabs Navigation - Contained width */}
          <div className="bg-white rounded-t-xl pt-6 px-6 flex justify-center gap-5">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className="flex flex-col items-center gap-3 transition-all duration-300 transform hover:scale-105"
              >
                <div
                  className={cn(
                    "p-4 rounded-full transition-colors",
                    activeSection === section.id ? "bg-[#FFC857]" : "bg-[#FFF5E1] hover:bg-[#FFC857]",
                  )}
                >
                  <section.icon className="h-5 w-5 text-[#1E3A8A]" />
                </div>
                <span className="text-xs font-medium">{section.label}</span>
              </button>
            ))}
          </div>

          {/* Search Content */}
          <div className="bg-white rounded-b-xl shadow-lg p-6">
            {/* Section Content */}
            {activeSection === "trips" && <TripSearch />}
            {activeSection === "hotels" && <HotelSearch />}
            {activeSection === "flights" && <FlightSearch />}
            {activeSection === "trains" && <TrainSearch />}
            {activeSection === "buses" && <BusSearch />}
            {activeSection === "cabs" && <CabSearch />}
          </div>
        </div>
      </div>

      {/* Travel Info Cards */}
      <TravelInfoCards />

      {/* Trending Destinations Section */}
      <TrendingDestinations />

      {/* Special Offers Section */}
      <SpecialOffers />

      <Footer />
    </div>
  )
}

