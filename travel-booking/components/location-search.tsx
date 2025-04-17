"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, X } from "lucide-react"

interface LocationSearchProps {
  label: string
  placeholder: string
  className?: string
  indianCities?: boolean
  onSelect?: (city: string) => void
}

interface City {
  name: string
  description: string
}

export function LocationSearch({
  label,
  placeholder,
  className,
  indianCities = false,
  onSelect,
}: LocationSearchProps): JSX.Element {
  const [query, setQuery] = useState<string>("")
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)

  const cities: City[] = [
    { name: "Manali", description: "Himachal Pradesh" },
    { name: "Jaipur", description: "Rajasthan" },
    { name: "Goa", description: "Beaches & Nightlife" },
    { name: "Kerala", description: "God's Own Country" },
    { name: "Delhi", description: "Capital Territory" },
    { name: "Mumbai", description: "Maharashtra" },
    { name: "Kolkata", description: "West Bengal" },
    { name: "Chennai", description: "Tamil Nadu" },
    { name: "Agra", description: "Uttar Pradesh" },
    { name: "Udaipur", description: "Rajasthan" },
  ]

  const filteredCities = cities.filter((city) => city.name.toLowerCase().startsWith(query.toLowerCase()))

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".location-search")) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className={`location-search ${className}`}>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="relative">
        <div className="relative">
          <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={placeholder}
            className="pl-8 pr-8"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-9 w-9"
              onClick={() => {
                setQuery("")
                setShowSuggestions(false)
                onSelect?.("")
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {showSuggestions && query && (
          <div className="absolute z-10 mt-1 w-full rounded-md border bg-background shadow-lg">
            <ul className="py-1 text-sm">
              {filteredCities.length > 0 ? (
                filteredCities.map((city, index) => (
                  <li
                    key={index}
                    className="flex items-center px-3 py-2 hover:bg-[#DADDC5] cursor-pointer"
                    onClick={() => {
                      setQuery(city.name)
                      setShowSuggestions(false)
                      onSelect?.(city.name)
                    }}
                  >
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div>
                      <div>{city.name}</div>
                      <div className="text-xs text-muted-foreground">{city.description}</div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-muted-foreground">No results found</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

