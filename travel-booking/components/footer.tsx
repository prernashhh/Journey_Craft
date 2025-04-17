import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import Image from "next/image"

export function Footer(): JSX.Element {
  return (
    <footer className="bg-[#F1EFEC] border-t">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_jc-removebg-preview-7jeKnYIRnLpuvT2gYinKGVpGnlk3qp.png"
                alt="Journey Craft Logo"
                width={32}
                height={32}
              />
              <span className="font-bold text-[#283A2C]">Journey Craft</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover incredible India with exclusive deals and personalized itineraries.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-[#283A2C] hover:bg-[#DADDC5]">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-[#283A2C] hover:bg-[#DADDC5]">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-[#283A2C] hover:bg-[#DADDC5]">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-[#283A2C] hover:bg-[#DADDC5]">
                <Youtube className="h-4 w-4" />
                <span className="sr-only">YouTube</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4 text-[#283A2C]">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-[#283A2C]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-[#283A2C]">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-[#283A2C]">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-[#283A2C]">
                  Press
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-[#283A2C]">
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4 text-[#283A2C]">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-[#283A2C]">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-[#283A2C]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-[#283A2C]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-[#283A2C]">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-[#283A2C]">
                  Trust & Safety
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4 text-[#283A2C]">Subscribe</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get exclusive deals and travel inspiration straight to your inbox.
            </p>
            <div className="space-y-3">
              <Input placeholder="Your email address" />
              <Button className="w-full bg-[#283A2C] hover:bg-[#283A2C]/90">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Journey Craft. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-xs text-muted-foreground hover:text-[#283A2C]">
              Privacy
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-[#283A2C]">
              Terms
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-[#283A2C]">
              Cookies
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-[#283A2C]">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

