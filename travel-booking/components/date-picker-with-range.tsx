"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

export function DatePickerWithRange({ className }: { className?: string }) {
  const [date, setDate] = useState<undefined | { from: Date; to?: Date }>({
    from: new Date(),
    to: new Date(),
  })

  return (
    <div className={className}>
      <label className="block text-sm font-medium mb-1">Date Range</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("w-full justify-between text-left font-normal", !date ? "text-muted-foreground" : undefined)}
          >
            <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
            {date?.from ? (
              date.to ? (
                `${format(date.from, "MMM dd, yyyy")} - ${format(date.to, "MMM dd, yyyy")}`
              ) : (
                format(date.from, "MMM dd, yyyy")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
        </PopoverContent>
      </Popover>
    </div>
  )
}

