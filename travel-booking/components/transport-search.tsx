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

interface TransportSearchProps {
  type: "flight" | "train" | "bus" | "cab"
  className?: string
}

const indianCities = [
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

const trainStations = [
  "Mumbai Central",
  "New Delhi",
  "Bangalore City",
  "Hyderabad Deccan",
  "Chennai Central",
  "Howrah Junction",
  "Pune Junction",
  "Jaipur Junction",
  "Ahmedabad Junction",
  "Surat",
]

export function TransportSearch({ type, className }: TransportSearchProps) {
  const [fromQuery, setFromQuery] = useState("")
  const [toQuery, setToQuery] = useState("")
  const [showFromSuggestions, setShowFromSuggestions] = useState(false)
  const [showToSuggestions, setShowToSuggestions] = useState(false)
  const [date, setDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()

  const locations = type === "train" ? trainStations : indianCities

  const filteredFromSuggestions = locations.filter((city) => city.toLowerCase().includes(fromQuery.toLowerCase()))

  const filteredToSuggestions = locations.filter((city) => city.toLowerCase().includes(toQuery.toLowerCase()))

  return (
    <div className={cn("grid gap-4", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium mb-1">From</label>
          <div className="relative">
            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={`Select ${type === "train" ? "station" : "city"}`}
              className="pl-8 pr-8"
              value={fromQuery}
              onChange={(e) => {
                setFromQuery(e.target.value)
                setShowFromSuggestions(true)
              }}
              onFocus={() => setShowFromSuggestions(true)}
            />
            {fromQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-9 w-9"
                onClick={() => {
                  setFromQuery("")
                  setShowFromSuggestions(false)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          {showFromSuggestions && fromQuery && (
            <div className="absolute z-10 mt-1 w-full rounded-md border bg-background shadow-lg">
              <ul className="py-1 text-sm">
                {filteredFromSuggestions.length > 0 ? (
                  filteredFromSuggestions.map((suggestion) => (
                    <li
                      key={suggestion}
                      className="flex items-center px-3 py-2 hover:bg-[#DADDC5] cursor-pointer"
                      onClick={() => {
                        setFromQuery(suggestion)
                        setShowFromSuggestions(false)
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

        <div className="relative">
          <label className="block text-sm font-medium mb-1">To</label>
          <div className="relative">
            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={`Select ${type === "train" ? "station" : "city"}`}
              className="pl-8 pr-8"
              value={toQuery}
              onChange={(e) => {
                setToQuery(e.target.value)
                setShowToSuggestions(true)
              }}
              onFocus={() => setShowToSuggestions(true)}
            />
            {toQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-9 w-9"
                onClick={() => {
                  setToQuery("")
                  setShowToSuggestions(false)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          {showToSuggestions && toQuery && (
            <div className="absolute z-10 mt-1 w-full rounded-md border bg-background shadow-lg">
              <ul className="py-1 text-sm">
                {filteredToSuggestions.length > 0 ? (
                  filteredToSuggestions.map((suggestion) => (
                    <li
                      key={suggestion}
                      className="flex items-center px-3 py-2 hover:bg-[#DADDC5] cursor-pointer"
                      onClick={() => {
                        setToQuery(suggestion)
                        setShowToSuggestions(false)
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        {(type === "flight" || type === "cab") && (
          <div>
            <label className="block text-sm font-medium mb-1">Return Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !returnDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {returnDate ? format(returnDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        )}

        {type === "flight" && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Class</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="premium">Premium Economy</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="first">First Class</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Passengers</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select passengers" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "passenger" : "passengers"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {type === "train" && (
          <div>
            <label className="block text-sm font-medium mb-1">Class</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1A">AC First Class (1A)</SelectItem>
                <SelectItem value="2A">AC 2 Tier (2A)</SelectItem>
                <SelectItem value="3A">AC 3 Tier (3A)</SelectItem>
                <SelectItem value="SL">Sleeper (SL)</SelectItem>
                <SelectItem value="2S">Second Sitting (2S)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {type === "cab" && (
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="oneway">One-way</SelectItem>
                <SelectItem value="roundtrip">Round Trip</SelectItem>
                <SelectItem value="airport">Airport Transfer</SelectItem>
                <SelectItem value="hourly">Hourly Rental</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <Button className="w-full md:w-auto px-8 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90" size="lg">
        Search
      </Button>
    </div>
  )
}

