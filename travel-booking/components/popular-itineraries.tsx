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

const itineraries: Itinerary[] = [
  {
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
    title: "Jaipur & Pushkar Combo",
    destination: "Jaipur & Pushkar, Rajasthan",
    duration: "6 Days / 5 Nights",
    price: 27999,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Amber Fort", "Pushkar Lake", "Brahma Temple", "Camel Safari"],
    included: ["Hotels", "Meals", "Transport", "Activities"],
  },
  {
    title: "Goa Beach Getaway",
    destination: "North & South Goa",
    duration: "5 Days / 4 Nights",
    price: 22999,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Calangute Beach", "Dudhsagar Falls", "Old Goa Churches", "Cruise"],
    included: ["Resort", "Breakfast", "Airport Transfer", "Water Sports"],
  },
  {
    title: "Kerala Backwaters Bliss",
    destination: "Kochi, Munnar & Alleppey",
    duration: "7 Days / 6 Nights",
    price: 32999,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1590766740178-78686fa2e8b9?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Houseboat Stay", "Tea Plantations", "Kathakali Show", "Ayurvedic Spa"],
    included: ["Hotels", "Breakfast & Dinner", "Private Transfers", "Guided Tours"],
  },
  {
    title: "Andaman Island Paradise",
    destination: "Port Blair & Havelock",
    duration: "6 Days / 5 Nights",
    price: 35999,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544550581-1bcabf842b77?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Radhanagar Beach", "Scuba Diving", "Cellular Jail", "Ross Island"],
    included: ["Hotels", "Breakfast", "Ferry Tickets", "Water Activities"],
  },
  {
    title: "Ladakh Adventure Expedition",
    destination: "Leh, Nubra & Pangong",
    duration: "8 Days / 7 Nights",
    price: 42999,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Pangong Lake", "Khardung La Pass", "Nubra Valley", "Monasteries"],
    included: ["Hotels", "All Meals", "Oxygen Support", "Inner Line Permits"],
  },
]

export default itineraries

