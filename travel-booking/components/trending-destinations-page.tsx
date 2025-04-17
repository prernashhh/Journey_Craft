"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DestinationModal } from "@/components/destination-modal"
import { SpecialOffers } from "@/components/special-offers"

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

export default function TrendingDestinationsPage() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const destinations: Destination[] = [
    {
      id: "shimla",
      name: "Shimla, Himachal",
      location: "Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
      description: "Experience the colonial charm and breathtaking mountain views in the Queen of Hills.",
      highlights: ["Mall Road", "Ridge", "Jakhu Temple", "Toy Train"],
      price: 15999,
      rating: 4.7,
    },
    {
      id: "manali",
      name: "Manali, Himachal",
      location: "Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=800&q=80",
      description: "Adventure paradise with snow-capped mountains and lush valleys.",
      highlights: ["Solang Valley", "Rohtang Pass", "Hadimba Temple", "Old Manali"],
      price: 14999,
      rating: 4.8,
    },
    {
      id: "goa",
      name: "Goa",
      location: "Western India",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
      description: "Sun, sand, and sea with vibrant nightlife and Portuguese heritage.",
      highlights: ["Calangute Beach", "Fort Aguada", "Dudhsagar Falls", "Basilica of Bom Jesus"],
      price: 12999,
      rating: 4.9,
    },
    {
      id: "pondicherry",
      name: "Pondicherry",
      location: "Tamil Nadu",
      image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&w=800&q=80",
      description: "French colonial charm meets spiritual tranquility at Auroville.",
      highlights: ["Auroville", "Rock Beach", "Paradise Beach", "French Quarter"],
      price: 9999,
      rating: 4.6,
    },
    {
      id: "kerala",
      name: "Kerala",
      location: "Southern India",
      image: "https://images.unsplash.com/photo-1609340442497-dee4a8e3ad42?auto=format&fit=crop&w=800&q=80",
      description: "God's Own Country with serene backwaters and lush greenery.",
      highlights: ["Alleppey Backwaters", "Munnar", "Kovalam Beach", "Wayanad"],
      price: 16999,
      rating: 4.8,
    },
    {
      id: "darjeeling",
      name: "Darjeeling",
      location: "West Bengal",
      image: "https://images.unsplash.com/photo-1544634076-a90160ddf22e?auto=format&fit=crop&w=800&q=80",
      description: "Tea gardens and panoramic views of the Himalayas.",
      highlights: ["Tiger Hill", "Toy Train", "Tea Gardens", "Batasia Loop"],
      price: 13999,
      rating: 4.5,
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
    },
  ]

  const openModal = (destination: Destination) => {
    setSelectedDestination(destination)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        <section className="py-12 md:py-16">
          <div className="container px-4 mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-8">Trending Destinations</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {destinations.map((destination) => (
                <motion.div
                  key={destination.id}
                  className="rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openModal(destination)}
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">{destination.name}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SpecialOffers />
      </main>

      <Footer />

      {isModalOpen && selectedDestination && (
        <DestinationModal destination={selectedDestination} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  )
}

