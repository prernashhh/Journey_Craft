"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, CalendarRange } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const indianStations: string[] = [
  "Mumbai Central",
  "New Delhi",
  "Bangalore City",
  "Chennai Central",
  "Kolkata Howrah",
  "Hyderabad Deccan",
  "Pune Junction",
  "Jaipur Junction",
  "Ahmedabad Junction",
  "Surat",
]

export function TrainSearch(): JSX.Element {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <div className="grid gap-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium mb-1">From</label>
          <div className="relative">
            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="text" placeholder="Departure station" className="pl-8" />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium mb-1">To</label>
          <div className="relative">
            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="text" placeholder="Arrival station" className="pl-8" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Travel Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarRange className="mr-2 h-4 w-4" />
                {date ? format(date, "LLL dd, y") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Class</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="1A">AC First Class (1A)</SelectItem>
              <SelectItem value="2A">AC 2 Tier (2A)</SelectItem>
              <SelectItem value="3A">AC 3 Tier (3A)</SelectItem>
              <SelectItem value="SL">Sleeper (SL)</SelectItem>
              <SelectItem value="2S">Second Sitting (2S)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Quota</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select quota" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="tatkal">Tatkal</SelectItem>
              <SelectItem value="ladies">Ladies</SelectItem>
              <SelectItem value="senior">Senior Citizen</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button className="w-full md:w-auto px-8 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90" size="lg">
        Search Trains
      </Button>
    </div>
  )
}

