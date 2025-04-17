"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface FixedTabsProps {
  children: React.ReactNode
  className?: string
}

export function FixedTabs({ children, className }: FixedTabsProps) {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      // Adjust this value based on when you want the tabs to become fixed
      setIsSticky(offset > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div
      className={cn(
        "transition-all duration-200 z-10 bg-white w-full",
        isSticky ? "fixed top-16 left-0 right-0 shadow-md px-4 py-2" : "",
        className,
      )}
    >
      {children}
    </div>
  )
}

