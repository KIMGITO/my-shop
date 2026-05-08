"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/Utils/helpers"
import { Calendar } from "@/components/ui/calendar" // Shadcn Calendar
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export function ChartRangeSelector({ range, setRange, dateRange, setDateRange }) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      {/* Quick Presets */}
      <div className="flex bg-surface-container-high p-1 rounded-2xl border border-outline-variant/10">
        {["7d", "30d", "90d", "1y"].map((t) => (
          <button
            key={t}
            onClick={() => setRange(t)}
            className={cn(
              "px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-200",
              range === t
                ? "bg-primary text-on-primary shadow-lg"
                : "text-on-surface-variant hover:bg-on-primary/10"
            )}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="h-4 w-[1px] bg-outline-variant/30 hidden sm:block" />

      {/* Custom Calendar Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "h-9 px-4 justify-start text-left font-bold text-xs rounded-2xl border-outline-variant/20 bg-surface-container-low",
              !dateRange && "text-on-surface-variant"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd")} - {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Custom Range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 border-outline-variant/10 bg-surface-container-lowest shadow-2xl rounded-3xl" align="end">
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(val) => {
              setDateRange(val)
              setRange("custom") 
            }}
            numberOfMonths={2}
            className="rounded-3xl"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}