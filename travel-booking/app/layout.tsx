import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Journey Craft - Craft Your Perfect Journey",
  description: "Discover incredible destinations with exclusive deals and personalized itineraries.",
  icons: {
    icon: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_jc-removebg-preview-7jeKnYIRnLpuvT2gYinKGVpGnlk3qp.png",
        href: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_jc-removebg-preview-7jeKnYIRnLpuvT2gYinKGVpGnlk3qp.png",
      },
    ],
  },
    generator: 'v0.dev'
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'