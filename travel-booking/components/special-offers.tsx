"use client"

import { motion } from "framer-motion"
import { Zap, Award, TrendingUp, ArrowRight } from "lucide-react"

export function SpecialOffers() {
  const offers = [
    {
      id: "last-minute",
      title: "Last Minute Deals",
      description: "Up to 40% off on last-minute bookings",
      icon: <Zap className="h-5 w-5" />,
      color: "bg-[#FFF5E1]",
      textColor: "text-[#1E3A8A]",
      link: "#",
    },
    {
      id: "student",
      title: "Student Discounts",
      description: "Special prices for students with valid ID",
      icon: <Award className="h-5 w-5" />,
      color: "bg-[#FFF5E1]",
      textColor: "text-[#1E3A8A]",
      link: "#",
    },
    {
      id: "group",
      title: "Group Packages",
      description: "Save more when you travel with friends",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "bg-[#FFF5E1]",
      textColor: "text-[#1E3A8A]",
      link: "#",
    },
  ]

  return (
    <section className="py-12 bg-white">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A8A]">Special Offers</h2>
          <a href="#" className="text-[#1E3A8A] hover:underline text-sm font-medium flex items-center">
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              className="rounded-xl border p-6 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`${offer.color} ${offer.textColor} w-10 h-10 rounded-full flex items-center justify-center shrink-0`}
                >
                  {offer.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-[#1E3A8A]">{offer.title}</h3>
                  <p className="text-sm text-muted-foreground">{offer.description}</p>
                  <a
                    href={offer.link}
                    className="inline-flex items-center text-sm font-medium text-[#1E3A8A] hover:underline mt-2"
                  >
                    View Offer
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

