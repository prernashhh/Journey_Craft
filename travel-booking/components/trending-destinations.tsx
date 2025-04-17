"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  Calendar,
  Users,
  Heart,
  Bookmark,
  Share2,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

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
  galleryImages: string[]
  itinerary: Day[]
  inclusions: string[]
  exclusions: string[]
}

export function TrendingDestinations() {
  const [expanded, setExpanded] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [favorites, setFavorites] = useState<string[]>([])
  const carouselRef = useRef<HTMLDivElement>(null)

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
      reviews: 98,
      duration: "5 Days / 4 Nights",
      season: "Oct - Jun",
      activities: ["Trekking", "Shopping", "Sightseeing"],
      galleryImages: ["https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80"],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Shimla",
          description: "Arrive in Shimla and check into your hotel. Evening free to explore Mall Road.",
          activities: ["Hotel Check-in", "Mall Road Visit", "Welcome Dinner"],
          meals: ["Dinner"],
        },
        {
          day: 2,
          title: "Kufri & Local Sightseeing",
          description: "Visit Kufri, a popular hill station. Later explore Jakhu Temple and other local attractions.",
          activities: ["Kufri Excursion", "Jakhu Temple", "Christ Church Visit"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 3,
          title: "Naldehra & Tattapani",
          description: "Day trip to Naldehra, famous for its golf course, and Tattapani known for hot springs.",
          activities: ["Naldehra Golf Course", "Tattapani Hot Springs", "Scenic Drive"],
          meals: ["Breakfast", "Lunch", "Dinner"],
        },
        {
          day: 4,
          title: "Chail Excursion",
          description: "Full day excursion to Chail, home to the world's highest cricket ground.",
          activities: ["Chail Palace Visit", "Cricket Ground", "Nature Walks"],
          meals: ["Breakfast", "Packed Lunch", "Dinner"],
        },
        {
          day: 5,
          title: "Departure",
          description: "After breakfast, check out from the hotel and depart with fond memories.",
          activities: ["Souvenir Shopping", "Departure"],
          meals: ["Breakfast"],
        },
      ],
      inclusions: [
        "Hotel Accommodation",
        "Daily Breakfast & Dinner",
        "Sightseeing as per itinerary",
        "All transfers",
        "English speaking guide",
      ],
      exclusions: [
        "Flights",
        "Personal expenses",
        "Optional activities",
        "Travel insurance",
        "Lunch (except where mentioned)",
      ],
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
      reviews: 120,
      duration: "6 Days / 5 Nights",
      season: "Mar - Jun, Sep - Nov",
      activities: ["Paragliding", "Skiing", "River Rafting"],
      galleryImages: ["https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=1200&q=80"],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Manali",
          description: "Arrive in Manali and check into your hotel. Evening free to explore Mall Road.",
          activities: ["Hotel Check-in", "Mall Road Visit", "Welcome Dinner"],
          meals: ["Dinner"],
        },
        {
          day: 2,
          title: "Local Sightseeing",
          description: "Visit Hadimba Temple, Vashisht Hot Springs, and other local attractions.",
          activities: ["Hadimba Temple", "Vashisht Hot Springs", "Manu Temple"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 3,
          title: "Solang Valley",
          description: "Full day excursion to Solang Valley for adventure activities.",
          activities: ["Paragliding", "Zorbing", "Skiing (seasonal)"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 4,
          title: "Rohtang Pass",
          description: "Day trip to the famous Rohtang Pass (subject to permits and weather).",
          activities: ["Snow Activities", "Photography", "Mountain Views"],
          meals: ["Breakfast", "Packed Lunch", "Dinner"],
        },
        {
          day: 5,
          title: "Kullu & Naggar",
          description: "Visit Kullu Valley and Naggar Castle. Evening free for shopping.",
          activities: ["Naggar Castle", "Kullu Shawl Factories", "River Rafting"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 6,
          title: "Departure",
          description: "After breakfast, check out from the hotel and depart with fond memories.",
          activities: ["Souvenir Shopping", "Departure"],
          meals: ["Breakfast"],
        },
      ],
      inclusions: [
        "Hotel Accommodation",
        "Daily Breakfast & Dinner",
        "Sightseeing as per itinerary",
        "All transfers",
        "English speaking guide",
      ],
      exclusions: [
        "Flights",
        "Personal expenses",
        "Optional activities",
        "Travel insurance",
        "Lunch (except where mentioned)",
      ],
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
      reviews: 156,
      duration: "5 Days / 4 Nights",
      season: "Nov - Feb",
      activities: ["Beach Activities", "Water Sports", "Nightlife"],
      galleryImages: ["https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80"],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Goa",
          description: "Arrive in Goa and check into your beach resort. Evening free to relax at the beach.",
          activities: ["Resort Check-in", "Beach Visit", "Welcome Dinner"],
          meals: ["Dinner"],
        },
        {
          day: 2,
          title: "North Goa Tour",
          description: "Explore popular North Goa beaches and attractions.",
          activities: ["Calangute Beach", "Baga Beach", "Fort Aguada", "Water Sports"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 3,
          title: "South Goa Tour",
          description: "Visit the serene beaches and historical sites of South Goa.",
          activities: ["Colva Beach", "Palolem Beach", "Basilica of Bom Jesus", "Se Cathedral"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 4,
          title: "Dudhsagar Falls & Spice Plantation",
          description: "Day trip to the magnificent Dudhsagar Falls and visit to a spice plantation.",
          activities: ["Dudhsagar Falls", "Spice Plantation Tour", "Lunch at Plantation"],
          meals: ["Breakfast", "Lunch", "Dinner"],
        },
        {
          day: 5,
          title: "Departure",
          description: "After breakfast, check out from the resort and depart with fond memories.",
          activities: ["Last-minute Shopping", "Departure"],
          meals: ["Breakfast"],
        },
      ],
      inclusions: [
        "Resort Accommodation",
        "Daily Breakfast & Dinner",
        "Sightseeing as per itinerary",
        "All transfers",
        "English speaking guide",
      ],
      exclusions: [
        "Flights",
        "Personal expenses",
        "Optional activities",
        "Travel insurance",
        "Lunch (except where mentioned)",
      ],
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
      reviews: 87,
      duration: "4 Days / 3 Nights",
      season: "Oct - Mar",
      activities: ["Beach Visits", "Heritage Walks", "Meditation"],
      galleryImages: ["https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&w=1200&q=80"],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Pondicherry",
          description: "Arrive in Pondicherry and check into your hotel. Evening walk along the promenade.",
          activities: ["Hotel Check-in", "Promenade Walk", "Welcome Dinner"],
          meals: ["Dinner"],
        },
        {
          day: 2,
          title: "Auroville & French Quarter",
          description: "Visit Auroville and explore the French Quarter of Pondicherry.",
          activities: ["Matrimandir Viewing", "Auroville Visit", "French Quarter Walk"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 3,
          title: "Beaches & Temples",
          description: "Explore the beautiful beaches and temples of Pondicherry.",
          activities: ["Paradise Beach", "Serenity Beach", "Manakula Vinayagar Temple"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 4,
          title: "Departure",
          description: "After breakfast, check out from the hotel and depart with fond memories.",
          activities: ["Last-minute Shopping", "Departure"],
          meals: ["Breakfast"],
        },
      ],
      inclusions: [
        "Hotel Accommodation",
        "Daily Breakfast & Dinner",
        "Sightseeing as per itinerary",
        "All transfers",
        "English speaking guide",
      ],
      exclusions: ["Flights", "Personal expenses", "Optional activities", "Travel insurance", "Lunch"],
    },
    {
      id: "kerala",
      name: "Kerala",
      location: "Southern India",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
      description: "God's Own Country with serene backwaters and lush greenery.",
      highlights: ["Alleppey Backwaters", "Munnar", "Kovalam Beach", "Wayanad"],
      price: 16999,
      rating: 4.8,
      reviews: 132,
      duration: "7 Days / 6 Nights",
      season: "Sep - Mar",
      activities: ["Houseboat Stay", "Ayurveda", "Wildlife Safari"],
      galleryImages: ["https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80"],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Kochi",
          description: "Arrive in Kochi and check into your hotel. Evening Kathakali dance performance.",
          activities: ["Hotel Check-in", "Fort Kochi Visit", "Kathakali Performance"],
          meals: ["Dinner"],
        },
        {
          day: 2,
          title: "Kochi to Munnar",
          description: "Drive to Munnar, enjoying the scenic beauty en route.",
          activities: ["Tea Gardens", "Spice Plantation Visit", "Scenic Drive"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 3,
          title: "Munnar Sightseeing",
          description: "Explore the beautiful hill station of Munnar.",
          activities: ["Eravikulam National Park", "Tea Museum", "Mattupetty Dam"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 4,
          title: "Munnar to Thekkady",
          description: "Drive to Thekkady, home to the Periyar Wildlife Sanctuary.",
          activities: ["Spice Garden Visit", "Boat Ride on Periyar Lake", "Kalaripayattu Show"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 5,
          title: "Thekkady to Alleppey",
          description: "Drive to Alleppey and board a houseboat for an overnight stay.",
          activities: ["Houseboat Cruise", "Backwater Experience", "Village Life Observation"],
          meals: ["Breakfast", "Lunch", "Dinner"],
        },
        {
          day: 6,
          title: "Alleppey to Kovalam",
          description: "Disembark from the houseboat and drive to Kovalam beach.",
          activities: ["Beach Relaxation", "Ayurvedic Massage", "Sunset Viewing"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 7,
          title: "Departure from Trivandrum",
          description: "After breakfast, transfer to Trivandrum airport for departure.",
          activities: ["Last-minute Shopping", "Departure"],
          meals: ["Breakfast"],
        },
      ],
      inclusions: [
        "Hotel Accommodation",
        "Houseboat Stay",
        "Daily Breakfast & Dinner",
        "All transfers",
        "English speaking guide",
      ],
      exclusions: [
        "Flights",
        "Personal expenses",
        "Optional activities",
        "Travel insurance",
        "Lunch (except on houseboat)",
      ],
    },
    {
      id: "darjeeling",
      name: "Darjeeling",
      location: "West Bengal",
      image: "https://images.unsplash.com/photo-1566376799975-ad0a084926fa?auto=format&fit=crop&w=800&q=80",
      description: "Tea gardens and panoramic views of the Himalayas.",
      highlights: ["Tiger Hill", "Toy Train", "Tea Gardens", "Batasia Loop"],
      price: 13999,
      rating: 4.5,
      reviews: 76,
      duration: "5 Days / 4 Nights",
      season: "Mar - Jun, Sep - Nov",
      activities: ["Tea Garden Tours", "Trekking", "Sunrise Viewing"],
      galleryImages: ["https://images.unsplash.com/photo-1544634076-a90160ddf22e?auto=format&fit=crop&w=1200&q=80"],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Darjeeling",
          description: "Arrive in Darjeeling and check into your hotel. Evening free to explore Mall Road.",
          activities: ["Hotel Check-in", "Mall Road Visit", "Welcome Dinner"],
          meals: ["Dinner"],
        },
        {
          day: 2,
          title: "Tiger Hill Sunrise & Local Sightseeing",
          description: "Early morning visit to Tiger Hill for sunrise, followed by local sightseeing.",
          activities: ["Tiger Hill Sunrise", "Ghoom Monastery", "Batasia Loop", "Toy Train Ride"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 3,
          title: "Tea Garden & Himalayan Mountaineering Institute",
          description: "Visit tea gardens and the Himalayan Mountaineering Institute.",
          activities: ["Tea Garden Tour", "Tea Tasting", "HMI Visit", "Padmaja Naidu Himalayan Zoological Park"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 4,
          title: "Mirik Excursion",
          description: "Full day excursion to Mirik, known for its lake and garden.",
          activities: ["Mirik Lake", "Boating", "Garden Visit", "Scenic Drive"],
          meals: ["Breakfast", "Packed Lunch", "Dinner"],
        },
        {
          day: 5,
          title: "Departure",
          description: "After breakfast, check out from the hotel and depart with fond memories.",
          activities: ["Souvenir Shopping", "Departure"],
          meals: ["Breakfast"],
        },
      ],
      inclusions: [
        "Hotel Accommodation",
        "Daily Breakfast & Dinner",
        "Sightseeing as per itinerary",
        "All transfers",
        "English speaking guide",
      ],
      exclusions: [
        "Flights",
        "Personal expenses",
        "Optional activities",
        "Travel insurance",
        "Lunch (except where mentioned)",
      ],
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
      reviews: 108,
      duration: "6 Days / 5 Nights",
      season: "Oct - May",
      activities: ["Scuba Diving", "Snorkeling", "Island Hopping"],
      galleryImages: ["https://images.unsplash.com/photo-1544550581-1bcabf842b77?auto=format&fit=crop&w=1200&q=80"],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Port Blair",
          description:
            "Arrive in Port Blair and check into your hotel. Visit Cellular Jail and attend the Light & Sound show.",
          activities: ["Hotel Check-in", "Cellular Jail Visit", "Light & Sound Show"],
          meals: ["Dinner"],
        },
        {
          day: 2,
          title: "Ross & North Bay Island",
          description: "Full day excursion to Ross Island and North Bay Island.",
          activities: ["Ross Island Tour", "North Bay Island", "Snorkeling", "Coral Viewing"],
          meals: ["Breakfast", "Lunch", "Dinner"],
        },
        {
          day: 3,
          title: "Port Blair to Havelock Island",
          description: "Ferry to Havelock Island. Visit Radhanagar Beach in the afternoon.",
          activities: ["Ferry Ride", "Radhanagar Beach", "Sunset Viewing"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 4,
          title: "Havelock Island Activities",
          description: "Enjoy water sports and beach activities on Havelock Island.",
          activities: ["Scuba Diving", "Snorkeling", "Kalapathar Beach"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 5,
          title: "Havelock to Port Blair",
          description: "Return to Port Blair by ferry. Evening free for shopping.",
          activities: ["Ferry Ride", "Local Market Visit", "Souvenir Shopping"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 6,
          title: "Departure",
          description: "After breakfast, transfer to airport for departure.",
          activities: ["Departure"],
          meals: ["Breakfast"],
        },
      ],
      inclusions: [
        "Hotel Accommodation",
        "Daily Breakfast & Dinner",
        "Ferry Tickets",
        "All transfers",
        "English speaking guide",
      ],
      exclusions: [
        "Flights",
        "Personal expenses",
        "Optional activities",
        "Travel insurance",
        "Lunch (except where mentioned)",
      ],
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
      reviews: 94,
      duration: "8 Days / 7 Nights",
      season: "Jun - Sep",
      activities: ["Motorcycle Tours", "Monastery Visits", "Camping"],
      galleryImages: ["https://images.unsplash.com/photo-1531804055935-76f44d7c3621?auto=format&fit=crop&w=1200&q=80"],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Leh",
          description: "Arrive in Leh and check into your hotel. Rest for acclimatization.",
          activities: ["Hotel Check-in", "Rest & Acclimatization"],
          meals: ["Dinner"],
        },
        {
          day: 2,
          title: "Leh Local Sightseeing",
          description: "Visit local attractions in and around Leh.",
          activities: ["Shanti Stupa", "Leh Palace", "Namgyal Tsemo Gompa", "Leh Market"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 3,
          title: "Monastery Tour",
          description: "Visit the famous monasteries around Leh.",
          activities: ["Thiksey Monastery", "Hemis Monastery", "Shey Palace", "Stok Palace Museum"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 4,
          title: "Leh to Nubra Valley",
          description: "Drive to Nubra Valley via Khardung La, one of the highest motorable passes in the world.",
          activities: ["Khardung La Pass", "Diskit Monastery", "Hunder Sand Dunes", "Bactrian Camel Safari"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 5,
          title: "Nubra Valley to Pangong Lake",
          description: "Drive from Nubra Valley to Pangong Lake via Shyok River route.",
          activities: ["Scenic Drive", "Pangong Lake", "Sunset Photography"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 6,
          title: "Pangong Lake to Leh",
          description: "Return to Leh from Pangong Lake via Chang La Pass.",
          activities: ["Chang La Pass", "Druk White Lotus School", "Scenic Drive"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 7,
          title: "Sham Valley Tour",
          description: "Day trip to Sham Valley, also known as Apricot Valley.",
          activities: ["Magnetic Hill", "Gurudwara Pathar Sahib", "Sangam", "Hall of Fame"],
          meals: ["Breakfast", "Packed Lunch", "Dinner"],
        },
        {
          day: 8,
          title: "Departure",
          description: "After breakfast, transfer to airport for departure.",
          activities: ["Departure"],
          meals: ["Breakfast"],
        },
      ],
      inclusions: [
        "Hotel Accommodation",
        "Daily Breakfast & Dinner",
        "Inner Line Permits",
        "All transfers",
        "English speaking guide",
        "Oxygen cylinder for emergency",
      ],
      exclusions: [
        "Flights",
        "Personal expenses",
        "Optional activities",
        "Travel insurance",
        "Lunch (except where mentioned)",
      ],
    },
    {
      id: "jibhi",
      name: "Jibhi",
      location: "Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
      description:
        "A hidden gem in Himachal Pradesh with pristine valleys, wooden architecture, and tranquil surroundings.",
      highlights: ["Jalori Pass", "Serolsar Lake", "Chehni Kothi", "Waterfall Treks"],
      price: 12999,
      rating: 4.7,
      reviews: 68,
      duration: "5 Days / 4 Nights",
      season: "Mar - Jun, Sep - Nov",
      activities: ["Trekking", "Fishing", "Village Walks"],
      galleryImages: ["https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80"],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Jibhi",
          description: "Arrive in Jibhi and check into your riverside cottage. Evening walk along the Jibhi river.",
          activities: ["Cottage Check-in", "River Walk", "Welcome Dinner"],
          meals: ["Dinner"],
        },
        {
          day: 2,
          title: "Jalori Pass & Serolsar Lake",
          description: "Trek to Jalori Pass and visit the serene Serolsar Lake surrounded by dense forests.",
          activities: ["Jalori Pass Trek", "Serolsar Lake Visit", "Picnic Lunch"],
          meals: ["Breakfast", "Packed Lunch", "Dinner"],
        },
        {
          day: 3,
          title: "Chehni Kothi & Local Villages",
          description: "Visit the ancient Chehni Kothi tower and explore nearby traditional Himachali villages.",
          activities: ["Chehni Kothi Visit", "Village Walk", "Local Craft Shopping"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 4,
          title: "Waterfall Trek",
          description: "Trek to a hidden waterfall through pine forests and enjoy the pristine natural surroundings.",
          activities: ["Waterfall Trek", "Forest Bathing", "Bonfire Evening"],
          meals: ["Breakfast", "Packed Lunch", "Dinner"],
        },
        {
          day: 5,
          title: "Departure",
          description: "After breakfast, check out from your cottage and depart with fond memories of Jibhi.",
          activities: ["Souvenir Shopping", "Departure"],
          meals: ["Breakfast"],
        },
      ],
      inclusions: [
        "Cottage Accommodation",
        "Daily Breakfast & Dinner",
        "Guided Treks",
        "All transfers from Bhuntar",
        "English speaking guide",
      ],
      exclusions: [
        "Flights/Bus to Bhuntar",
        "Personal expenses",
        "Optional activities",
        "Travel insurance",
        "Lunch (except where mentioned)",
      ],
    },
    {
      id: "kashmir",
      name: "Kashmir",
      location: "Jammu & Kashmir",
      image: "https://images.unsplash.com/photo-1566837497312-7be7830ae9b1?auto=format&fit=crop&w=800&q=80",
      description:
        "Experience the paradise on earth with stunning landscapes, floating gardens, and majestic mountains.",
      highlights: ["Dal Lake", "Gulmarg", "Pahalgam", "Mughal Gardens"],
      price: 19999,
      rating: 4.9,
      reviews: 142,
      duration: "7 Days / 6 Nights",
      season: "Apr - Oct",
      activities: ["Shikara Ride", "Skiing", "Gondola Ride"],
      galleryImages: ["https://images.unsplash.com/photo-1566837497312-7be7830ae9b1?auto=format&fit=crop&w=1200&q=80"],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Srinagar",
          description: "Arrive in Srinagar and check into your houseboat on Dal Lake. Evening Shikara ride.",
          activities: ["Houseboat Check-in", "Shikara Ride", "Welcome Dinner"],
          meals: ["Dinner"],
        },
        {
          day: 2,
          title: "Srinagar City Tour",
          description: "Visit the famous Mughal Gardens, Shankaracharya Temple, and local markets.",
          activities: ["Nishat Garden", "Shalimar Garden", "Shankaracharya Temple", "Local Market Visit"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 3,
          title: "Gulmarg Excursion",
          description: "Full day trip to Gulmarg, known for its meadows, gondola ride, and skiing opportunities.",
          activities: ["Gondola Ride", "Skiing (seasonal)", "Khilanmarg Visit"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 4,
          title: "Pahalgam Excursion",
          description: "Travel to Pahalgam, the Valley of Shepherds, and explore its scenic beauty.",
          activities: ["Betaab Valley", "Chandanwari", "Aru Valley"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 5,
          title: "Pahalgam Activities",
          description: "Enjoy various activities in Pahalgam including river rafting and pony rides.",
          activities: ["River Rafting", "Pony Ride", "Lidder River Walk"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 6,
          title: "Return to Srinagar",
          description: "Return to Srinagar and visit the floating vegetable markets and Hazratbal Shrine.",
          activities: ["Floating Market Visit", "Hazratbal Shrine", "Souvenir Shopping"],
          meals: ["Breakfast", "Dinner"],
        },
        {
          day: 7,
          title: "Departure",
          description: "After breakfast, check out from your houseboat and depart with fond memories of Kashmir.",
          activities: ["Departure"],
          meals: ["Breakfast"],
        },
      ],
      inclusions: [
        "Houseboat & Hotel Accommodation",
        "Daily Breakfast & Dinner",
        "Sightseeing as per itinerary",
        "All transfers",
        "English speaking guide",
        "Shikara ride on Dal Lake",
      ],
      exclusions: [
        "Flights",
        "Personal expenses",
        "Optional activities",
        "Travel insurance",
        "Lunch",
        "Gondola tickets",
      ],
    },
    {
      id: "kherganga",
      name: "Kherganga Trek",
      location: "Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      description:
        "A breathtaking trek through the Parvati Valley leading to natural hot springs amidst stunning Himalayan views.",
      highlights: ["Hot Springs", "Parvati Valley", "Rudra Nag Waterfall", "Tosh Village"],
      price: 8999,
      rating: 4.8,
      reviews: 112,
      duration: "4 Days / 3 Nights",
      season: "May - Jun, Sep - Oct",
      activities: ["Trekking", "Camping", "Hot Spring Bath"],
      galleryImages: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Kasol",
          description: "Arrive in Kasol and check into your guesthouse. Evening free to explore Kasol village.",
          activities: ["Guesthouse Check-in", "Kasol Village Walk", "Welcome Dinner"],
          meals: ["Dinner"],
        },
        {
          day: 2,
          title: "Kasol to Kherganga Trek",
          description:
            "After breakfast, start the trek from Barshaini to Kherganga through beautiful forests and meadows.",
          activities: ["Trekking", "Rudra Nag Waterfall Visit", "Camping Setup"],
          meals: ["Breakfast", "Packed Lunch", "Dinner"],
        },
        {
          day: 3,
          title: "Kherganga Exploration",
          description:
            "Full day to explore Kherganga, relax in the hot springs, and enjoy the panoramic mountain views.",
          activities: ["Hot Springs Bath", "Nature Photography", "Stargazing"],
          meals: ["Breakfast", "Lunch", "Dinner"],
        },
        {
          day: 4,
          title: "Kherganga to Kasol and Departure",
          description: "Trek back to Barshaini and transfer to Kasol. Departure with fond memories.",
          activities: ["Downhill Trek", "Souvenir Shopping", "Departure"],
          meals: ["Breakfast", "Packed Lunch"],
        },
      ],
      inclusions: [
        "Accommodation (Guesthouse & Camping)",
        "Meals as per itinerary",
        "Professional Trek Guide",
        "Camping Equipment",
        "First Aid Kit",
      ],
      exclusions: [
        "Transportation to/from Kasol",
        "Personal expenses",
        "Porter/Mule charges",
        "Travel insurance",
        "Any item not mentioned in inclusions",
      ],
    },
    {
      id: "kedarkantha",
      name: "Kedarkantha Trek",
      location: "Uttarakhand",
      image: "https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=800&q=80",
      description:
        "A popular winter trek in the Uttarakhand Himalayas offering spectacular views of snow-capped peaks and dense pine forests.",
      highlights: ["Summit Climb", "Juda Ka Talab", "Sankri Village", "Snow Camping"],
      price: 11999,
      rating: 4.9,
      reviews: 145,
      duration: "6 Days / 5 Nights",
      season: "Dec - Apr",
      activities: ["Winter Trekking", "Snow Camping", "Summit Climb"],
      galleryImages: ["https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=1200&q=80"],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Dehradun",
          description:
            "Arrive in Dehradun and transfer to Sankri village. Evening orientation and preparation for the trek.",
          activities: ["Transfer to Sankri", "Trek Briefing", "Equipment Check"],
          meals: ["Dinner"],
        },
        {
          day: 2,
          title: "Sankri to Juda Ka Talab",
          description: "Begin the trek from Sankri to Juda Ka Talab, a beautiful frozen lake surrounded by pine trees.",
          activities: ["Forest Trek", "Campsite Setup", "Bonfire Evening"],
          meals: ["Breakfast", "Packed Lunch", "Dinner"],
        },
        {
          day: 3,
          title: "Juda Ka Talab to Kedarkantha Base",
          description: "Trek from Juda Ka Talab to Kedarkantha Base Camp through snow-covered trails.",
          activities: ["Snow Trekking", "Base Camp Setup", "Acclimatization Walk"],
          meals: ["Breakfast", "Packed Lunch", "Dinner"],
        },
        {
          day: 4,
          title: "Kedarkantha Summit and Back to Base",
          description:
            "Early morning summit climb followed by return to base camp. Enjoy panoramic Himalayan views from the top.",
          activities: ["Summit Climb", "Photography", "Rest at Base Camp"],
          meals: ["Breakfast", "Packed Lunch", "Dinner"],
        },
        {
          day: 5,
          title: "Base Camp to Sankri",
          description: "Trek back to Sankri village. Evening free to explore the local culture.",
          activities: ["Downhill Trek", "Village Exploration", "Celebration Dinner"],
          meals: ["Breakfast", "Packed Lunch", "Dinner"],
        },
        {
          day: 6,
          title: "Sankri to Dehradun and Departure",
          description: "After breakfast, transfer to Dehradun for departure.",
          activities: ["Transfer to Dehradun", "Departure"],
          meals: ["Breakfast"],
        },
      ],
      inclusions: [
        "Transportation from Dehradun to Sankri (round trip)",
        "Accommodation (Guesthouse & Camping)",
        "All meals during the trek",
        "Professional Trek Leader",
        "Camping & Safety Equipment",
        "Forest Permits",
      ],
      exclusions: [
        "Transportation to/from Dehradun",
        "Personal expenses",
        "Porter/Mule charges",
        "Travel insurance",
        "Winter clothing (can be rented)",
      ],
    },
  ]

  const visibleDestinations = expanded ? destinations : destinations.slice(0, 4)
  const featuredDestinations = [
    destinations.find((d) => d.id === "kashmir"),
    destinations.find((d) => d.id === "kherganga"),
    destinations.find((d) => d.id === "kedarkantha"),
    destinations.find((d) => d.id === "jibhi"),
    destinations.find((d) => d.id === "manali"),
  ].filter(Boolean)

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()

    // Update state
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }

    // Update localStorage
    localStorage.setItem(
      "favoriteDestinations",
      JSON.stringify(favorites.includes(id) ? favorites.filter((favId) => favId !== id) : [...favorites, id]),
    )
  }

  const openModal = (destination: Destination) => {
    // Hide the navbar when opening the modal
    const header = document.querySelector("header")
    if (header) {
      header.style.display = "none"
    }
    setSelectedDestination(destination)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    // Show the navbar when closing the modal
    const header = document.querySelector("header")
    if (header) {
      header.style.display = "flex"
    }
    setIsModalOpen(false)
  }

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" })
      if (activeIndex > 0) setActiveIndex(activeIndex - 1)
    }
  }

  const scrollRight = () => {
    if (carouselRef.current && activeIndex < featuredDestinations.length - 1) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" })
      setActiveIndex(activeIndex + 1)
    }
  }

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("favoriteDestinations")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  useEffect(() => {
    // Save favorites to localStorage
    localStorage.setItem("favoriteDestinations", JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    return () => {
      const header = document.querySelector("header")
      if (header) {
        header.style.display = "flex"
      }
    }
  }, [])

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-2">Trending Destinations</h2>
            <p className="text-gray-500 max-w-2xl">
              Discover the most popular travel destinations loved by our community
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-gray-300 hover:bg-gray-100"
              onClick={scrollLeft}
              disabled={activeIndex === 0}
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-gray-300 hover:bg-gray-100"
              onClick={scrollRight}
              disabled={activeIndex === featuredDestinations.length - 1}
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </Button>
          </div>
        </div>

        {/* Featured Destinations Carousel */}
        <div className="relative mb-16 overflow-hidden">
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featuredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                className="min-w-[300px] md:min-w-[400px] flex-shrink-0 snap-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className="relative h-[400px] rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => openModal(destination)}
                >
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  <div className="absolute top-4 right-4 z-10">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
                      onClick={(e) => toggleFavorite(destination.id, e)}
                    >
                      <Heart
                        className={cn(
                          "h-5 w-5",
                          favorites.includes(destination.id) ? "fill-red-500 text-red-500" : "text-white",
                        )}
                      />
                    </Button>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-[#FFC857] text-[#1E3A8A] hover:bg-[#FFC857]/90">Featured</Badge>
                      <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{destination.rating}</span>
                        <span className="text-xs opacity-80">({destination.reviews})</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>

                    <div className="flex items-center gap-1 mb-3 text-sm opacity-90">
                      <MapPin className="h-3 w-3" />
                      <span>{destination.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {destination.activities.map((activity, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                          {activity}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-sm opacity-90">{destination.duration}</p>
                        <p className="text-2xl font-bold">
                          ₹{destination.price.toLocaleString()}
                          <span className="text-xs font-normal ml-1">per person</span>
                        </p>
                      </div>
                      <Button
                        className="bg-white text-[#1E3A8A] hover:bg-white/90"
                        onClick={(e) => {
                          e.stopPropagation()
                          openModal(destination)
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center gap-2 mt-4 md:hidden">
            {featuredDestinations.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full ${idx === activeIndex ? "bg-[#1E3A8A]" : "bg-gray-300"}`}
                onClick={() => {
                  setActiveIndex(idx)
                  if (carouselRef.current) {
                    const scrollAmount = idx * 300
                    carouselRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" })
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Grid of Destinations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleDestinations.map((destination) => (
            <motion.div
              key={destination.id}
              className="rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              layout
            >
              <div className="cursor-pointer" onClick={() => openModal(destination)}>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
                      onClick={(e) => toggleFavorite(destination.id, e)}
                    >
                      <Heart
                        className={cn(
                          "h-4 w-4",
                          favorites.includes(destination.id) ? "fill-red-500 text-red-500" : "text-white",
                        )}
                      />
                    </Button>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium text-white">{destination.rating}</span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-[#1E3A8A]">{destination.name}</h3>
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{destination.location}</span>
                      </div>
                    </div>
                    <Badge className="bg-[#FFF5E1] text-[#1E3A8A] hover:bg-[#FFF5E1]">{destination.season}</Badge>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{destination.duration.split(" ")[0]}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      <span>2+ people</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {destination.highlights.slice(0, 2).map((highlight, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                        {highlight}
                      </span>
                    ))}
                    {destination.highlights.length > 2 && (
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                        +{destination.highlights.length - 2} more
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t">
                    <p className="font-bold text-[#1E3A8A]">
                      ₹{destination.price.toLocaleString()}
                      <span className="text-xs font-normal text-gray-500 ml-1">per person</span>
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A]/10"
                      onClick={(e) => {
                        e.stopPropagation()
                        openModal(destination)
                      }}
                    >
                      View Deal
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="flex justify-center mt-10" layout>
          <Button
            variant="outline"
            onClick={() => setExpanded(!expanded)}
            className="group border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#FFF5E1] px-6"
          >
            {expanded ? (
              <>
                Show Less <ChevronUp className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-[-2px]" />
              </>
            ) : (
              <>
                Show More <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-[2px]" />
              </>
            )}
          </Button>
        </motion.div>
      </div>

      {/* Destination Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedDestination && (
          <Dialog open={isModalOpen} onOpenChange={closeModal}>
            <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden rounded-2xl max-h-[90vh] overflow-y-auto">
              <div className="relative h-80 w-full">
                {selectedDestination.galleryImages && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <Image
                        src={selectedDestination.galleryImages[0] || "/placeholder.svg"}
                        alt={selectedDestination.name}
                        fill
                        className="object-cover transform hover:scale-105 transition-transform duration-1000 ease-in-out"
                        priority
                      />
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                <DialogClose className="absolute top-4 right-4 rounded-full bg-white/20 backdrop-blur-sm p-2 hover:bg-white/40 transition-colors">
                  <ChevronDown className="h-4 w-4 text-white" />
                  <span className="sr-only">Close</span>
                </DialogClose>

                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="text-3xl font-bold mb-1 drop-shadow-lg">{selectedDestination.name}</h2>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{selectedDestination.location}</span>
                    </div>
                    <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{selectedDestination.rating}</span>
                      <span className="opacity-80">({selectedDestination.reviews} reviews)</span>
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
                        <p className="text-gray-600">{selectedDestination.description}</p>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-3 text-gray-900">Highlights</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {selectedDestination.highlights.map((highlight, idx) => (
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
                          {selectedDestination.activities.map((activity, idx) => (
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
                            <span className="font-medium">{selectedDestination.duration}</span>
                          </div>

                          <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                            <span className="text-gray-600">Best Season</span>
                            <span className="font-medium">{selectedDestination.season}</span>
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
                              <p className="text-2xl font-bold text-[#1E3A8A]">
                                ₹{selectedDestination.price.toLocaleString()}
                              </p>
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
                      Experience the best of {selectedDestination.name} with our carefully crafted itinerary
                    </p>

                    <div className="space-y-6">
                      {selectedDestination.itinerary.map((day, idx) => (
                        <div key={idx} className="relative">
                          {/* Timeline connector */}
                          {idx < selectedDestination.itinerary.length - 1 && (
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
                        {selectedDestination.inclusions.map((item, idx) => (
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
                        {selectedDestination.exclusions.map((item, idx) => (
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
                        Select your preferred dates and options to book this amazing trip to {selectedDestination.name}
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
                            <span className="font-medium">{selectedDestination.name}</span>
                          </div>

                          <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                            <span className="text-gray-600">Duration</span>
                            <span className="font-medium">{selectedDestination.duration}</span>
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
                            <span>₹{selectedDestination.price.toLocaleString()}</span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Taxes & Fees</span>
                            <span>₹{Math.round(selectedDestination.price * 0.18).toLocaleString()}</span>
                          </div>

                          <div className="flex justify-between items-center font-bold text-lg pt-2 border-t border-gray-200">
                            <span>Total (2 Adults)</span>
                            <span className="text-[#1E3A8A]">
                              ₹{(selectedDestination.price * 2 + selectedDestination.price * 2 * 0.18).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Button className="w-full bg-[#D72638] hover:bg-[#D72638]/90 py-6">Book Now</Button>

                          <Button
                            variant="outline"
                            className="w-full border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A]/10"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            Check Other Dates
                          </Button>

                          <p className="text-xs text-center text-gray-500 mt-2">
                            No payment required now. Reserve your spot with a free cancellation policy.
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-center gap-4">
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
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  )
}

