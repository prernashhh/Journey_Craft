interface FavoriteDestination {
  id: string
  name: string
  location: string
  image: string
  description: string
  highlights: string[]
  price: number
  rating: number
  duration: string
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

// Update the mock destinations with more appealing images
const mockDestinations: FavoriteDestination[] = [
  {
    id: "kerala",
    name: "Kerala",
    location: "Southern India",
    image: "https://images.unsplash.com/photo-1590766740178-78686fa2e8b9?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1544550581-1bcabf842b77?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?auto=format&fit=crop&w=1200&q=80",
    description: "Breathtaking landscapes and Buddhist monasteries in the high-altitude desert.",
    highlights: ["Pangong Lake", "Nubra Valley", "Magnetic Hill", "Thiksey Monastery"],
    price: 24999,
    rating: 4.8,
    duration: "8 Days / 7 Nights",
  },
]

// Update the mock itineraries with more appealing images
const mockItineraries: FavoriteItinerary[] = [
  {
    id: "manali-adventure",
    title: "Magical Manali Adventure",
    destination: "Manali, Himachal Pradesh",
    duration: "5 Days / 4 Nights",
    price: 24999,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1590766740178-78686fa2e8b9?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Houseboat Stay", "Tea Plantations", "Kathakali Show", "Ayurvedic Spa"],
    included: ["Hotels", "Breakfast & Dinner", "Private Transfers", "Guided Tours"],
  },
]

