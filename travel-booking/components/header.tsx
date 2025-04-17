"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageSquare, Settings, User, Heart } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header(): JSX.Element {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY

      // Set visible if scrolling up or at the top of the page
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)

      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollPos])

  return (
    <header
      className={cn(
        "fixed top-0 z-[100] w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-transform duration-300 border-b",
        visible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_jc-removebg-preview-7jeKnYIRnLpuvT2gYinKGVpGnlk3qp.png"
            alt="Journey Craft Logo"
            width={40}
            height={40}
          />
          <span className="hidden font-bold sm:inline-block text-[#1E3A8A]">Journey Craft</span>
        </Link>

        <div className="flex items-center space-x-8">
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-[#1E3A8A] hover:text-[#1E3A8A]/80">
              Trips
            </Link>
            <Link href="#" className="text-sm font-medium text-[#1E3A8A] hover:text-[#1E3A8A]/80">
              Events
            </Link>
            <Link href="#" className="text-sm font-medium text-[#1E3A8A] hover:text-[#1E3A8A]/80">
              Rewards
            </Link>
            <Link href="/my-itineraries" className="text-sm font-medium text-[#1E3A8A] hover:text-[#1E3A8A]/80">
              My Itineraries
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <MessageSquare className="h-5 w-5 text-[#1E3A8A]" />
            </Button>

            <Link href="/my-account?tab=favorites">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Heart className="h-5 w-5 text-[#1E3A8A]" />
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=32&width=32"
                    alt="Profile"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/my-account" className="flex items-center w-full">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/my-account?tab=favorites" className="flex items-center w-full">
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Favorites</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/my-itineraries" className="flex items-center w-full">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Itineraries</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#" className="flex items-center w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

