"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, X, CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const indianCities: string[] = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Ahmedabad",
  "Surat",
]

interface HotelSearchProps {
  className?: string
}

export function HotelSearch({ className }: HotelSearchProps): JSX.Element {
  const [locationQuery, setLocationQuery] = useState<string>("")
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
  const [dateRange, setDateRange] = useState<{
    from: Date
    to: Date
  }>({
    from: new Date(),
    to: new Date(),
  })

  const filteredSuggestions = indianCities.filter((city) => city.toLowerCase().includes(locationQuery.toLowerCase()))

  return (
    <div className={cn("grid gap-4 w-full", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Location</label>
          <div className="relative">
            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="City or landmark"
              className="pl-8 pr-8"
              value={locationQuery}
              onChange={(e) => {
                setLocationQuery(e.target.value)
                setShowSuggestions(true)
              }}
              onFocus={() => setShowSuggestions(true)}
            />
            {locationQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-9 w-9"
                onClick={() => {
                  setLocationQuery("")
                  setShowSuggestions(false)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          {showSuggestions && locationQuery && (
            <div className="absolute z-10 mt-1 w-full rounded-md border bg-background shadow-lg">
              <ul className="py-1 text-sm">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((suggestion) => (
                    <li
                      key={suggestion}
                      className="flex items-center px-3 py-2 hover:bg-[#DADDC5] cursor-pointer"
                      onClick={() => {
                        setLocationQuery(suggestion)
                        setShowSuggestions(false)
                      }}
                    >
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      {suggestion}
                    </li>
                  ))
                ) : (
                  <li className="px-3 py-2 text-muted-foreground">No results found</li>
                )}
              </ul>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Check-in - Check-out</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-full justify-start text-left font-normal", !dateRange && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd")} - {format(dateRange.to, "LLL dd")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd")
                  )
                ) : (
                  <span>Pick dates</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange as any}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Rooms</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select rooms" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "room" : "rooms"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Guests</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select guests" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "guest" : "guests"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button className="w-full md:w-auto px-8 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90" size="lg">
        Search Hotels
      </Button>
    </div>
  )
}

