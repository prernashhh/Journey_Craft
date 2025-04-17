"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { CalendarRange, Search } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { LocationSearch } from "./location-search"
import { ItineraryResults } from "./itinerary-results"
import { CustomItinerary } from "./custom-itinerary"
import type { JSX } from "react/jsx-runtime"

export function TripSearch(): JSX.Element {
  const [activeTab, setActiveTab] = useState<"select" | "custom">("select")
  const [date, setDate] = useState<{
    from: Date
    to: Date
  }>({
    from: new Date(),
    to: new Date(),
  })

  const [selectedCity, setSelectedCity] = useState<string>("")
  const [showResults, setShowResults] = useState<boolean>(false)

  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    if (showResults) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showResults])

  const handleSearch = () => {
    if (selectedCity) {
      setShowResults(true)
      setActiveTab("select") // Ensure we're on the select tab when showing results
    }
  }

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
        <button
          onClick={() => setActiveTab("select")}
          className={cn(
            "flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all",
            activeTab === "select" ? "bg-white text-[#1E3A8A] shadow-sm" : "text-gray-500 hover:text-gray-700",
          )}
        >
          Select Itinerary
        </button>
        <button
          onClick={() => setActiveTab("custom")}
          className={cn(
            "flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all",
            activeTab === "custom" ? "bg-white text-[#1E3A8A] shadow-sm" : "text-gray-500 hover:text-gray-700",
          )}
        >
          Custom Itinerary
        </button>
      </div>

      {/* Tab Content Container */}
      <div>
        {/* Select Itinerary Tab Content */}
        {activeTab === "select" && (
          <>
            <div className="grid gap-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LocationSearch
                  label="Destination"
                  placeholder="Where do you want to go?"
                  indianCities={true}
                  onSelect={(city: string) => {
                    setSelectedCity(city)
                    setShowResults(false)
                  }}
                />

                <div>
                  <label className="block text-sm font-medium mb-1">Date Range</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarRange className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
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
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate as any}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Button
                className="w-full md:w-auto px-8 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90"
                size="lg"
                onClick={handleSearch}
              >
                <Search className="w-4 h-4 mr-2" />
                Search Itineraries
              </Button>
            </div>

            {showResults && (
              <div ref={resultsRef}>
                <ItineraryResults city={selectedCity} />
              </div>
            )}
          </>
        )}

        {/* Custom Itinerary Tab Content */}
        {activeTab === "custom" && <CustomItinerary />}
      </div>
    </div>
  )
}

