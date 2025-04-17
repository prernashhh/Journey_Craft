"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plane, Headphones, Laptop } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function TravelInfoCards() {
  const [showTravelGuidelines, setShowTravelGuidelines] = useState(false)
  const [showCustomerSupport, setShowCustomerSupport] = useState(false)
  const [showWebCheckIn, setShowWebCheckIn] = useState(false)

  const cards = [
    {
      id: "international",
      icon: <Plane className="h-6 w-6 text-[#1E3A8A]" />,
      title: "Planning to book an international flight?",
      actionText: "Check Travel Guidelines",
      actionLink: "#",
      onClick: () => setShowTravelGuidelines(true),
    },
    {
      id: "support",
      icon: <Headphones className="h-6 w-6 text-[#1E3A8A]" />,
      title: "Need help with your booking?",
      actionText: "Contact Support",
      actionLink: "#",
      onClick: () => setShowCustomerSupport(true),
    },
    {
      id: "checkin",
      icon: <Laptop className="h-6 w-6 text-[#1E3A8A]" />,
      title: "Complete your web check-in on Journey Craft in easy steps.",
      actionText: "Know More",
      actionLink: "#",
      onClick: () => setShowWebCheckIn(true),
    },
  ]

  return (
    <section className="py-8 bg-white">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="bg-white rounded-xl border p-6 flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-[#FFF5E1] rounded-full p-4 flex-shrink-0">{card.icon}</div>
              <div>
                <p className="text-gray-700 mb-1">{card.title}</p>
                <button onClick={card.onClick} className="text-[#1E3A8A] font-medium hover:underline">
                  {card.actionText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Travel Guidelines Dialog */}
      <Dialog open={showTravelGuidelines} onOpenChange={setShowTravelGuidelines}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#1E3A8A]">International Travel Guidelines</DialogTitle>
            <DialogDescription>Important information for your international travel</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="documents">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="covid">COVID-19</TabsTrigger>
              <TabsTrigger value="visa">Visa Requirements</TabsTrigger>
            </TabsList>

            <TabsContent value="documents" className="space-y-4 mt-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="passport">
                  <AccordionTrigger>Passport Requirements</AccordionTrigger>
                  <AccordionContent>
                    Ensure your passport is valid for at least 6 months beyond your travel dates. Carry both physical
                    and digital copies of your passport.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tickets">
                  <AccordionTrigger>Flight Tickets</AccordionTrigger>
                  <AccordionContent>
                    Keep printed copies of your flight tickets and hotel bookings. Also save digital copies on your
                    phone for easy access.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="insurance">
                  <AccordionTrigger>Travel Insurance</AccordionTrigger>
                  <AccordionContent>
                    Travel insurance is highly recommended for all international travel. Ensure it covers medical
                    emergencies and trip cancellations.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="covid" className="space-y-4 mt-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="testing">
                  <AccordionTrigger>Testing Requirements</AccordionTrigger>
                  <AccordionContent>
                    Many countries require a negative COVID-19 test taken within 72 hours before departure. Check
                    specific country requirements before travel.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="vaccination">
                  <AccordionTrigger>Vaccination Certificates</AccordionTrigger>
                  <AccordionContent>
                    Carry your vaccination certificate. Most countries accept digital certificates through apps like
                    CoWIN or DigiLocker.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="masks">
                  <AccordionTrigger>Mask Regulations</AccordionTrigger>
                  <AccordionContent>
                    Mask requirements vary by country and airline. It's recommended to carry masks regardless of local
                    regulations.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="visa" className="space-y-4 mt-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="requirements">
                  <AccordionTrigger>Visa on Arrival vs. Pre-Approval</AccordionTrigger>
                  <AccordionContent>
                    Check if your destination offers visa on arrival for Indian passport holders or requires
                    pre-approval. Apply at least 30 days before travel.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="documents">
                  <AccordionTrigger>Required Documents</AccordionTrigger>
                  <AccordionContent>
                    Most visa applications require passport photos, bank statements, travel itinerary, and accommodation
                    details.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="processing">
                  <AccordionTrigger>Processing Times</AccordionTrigger>
                  <AccordionContent>
                    Visa processing can take anywhere from 3 days to 3 weeks depending on the country. Plan accordingly.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <Button className="w-full bg-[#1E3A8A]" onClick={() => setShowTravelGuidelines(false)}>
              Got it, thanks!
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Customer Support Dialog */}
      <Dialog open={showCustomerSupport} onOpenChange={setShowCustomerSupport}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#1E3A8A]">Customer Support</DialogTitle>
            <DialogDescription>We're here to help with your travel needs</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-[#1E3A8A] mb-2">24/7 Helpline</h3>
              <p className="text-lg font-semibold">1800-123-4567</p>
              <p className="text-sm text-muted-foreground">Toll-free within India</p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-[#1E3A8A] mb-2">Email Support</h3>
              <p className="text-lg font-semibold">support@journeycraft.com</p>
              <p className="text-sm text-muted-foreground">Response within 24 hours</p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-[#1E3A8A] mb-2">Live Chat</h3>
              <Button className="w-full bg-[#1E3A8A]">Start Chat Now</Button>
              <p className="text-sm text-muted-foreground mt-2">Available 9 AM to 9 PM IST</p>
            </div>
          </div>

          <div className="mt-6">
            <Button variant="outline" className="w-full" onClick={() => setShowCustomerSupport(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Web Check-In Dialog */}
      <Dialog open={showWebCheckIn} onOpenChange={setShowWebCheckIn}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#1E3A8A]">Web Check-In Guide</DialogTitle>
            <DialogDescription>Complete your check-in process in simple steps</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            <div className="flex gap-4 items-start">
              <div className="bg-[#FFF5E1] rounded-full w-8 h-8 flex items-center justify-center text-[#1E3A8A] font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-medium text-[#1E3A8A]">Find Your Booking</h3>
                <p className="text-sm text-muted-foreground">
                  Enter your booking reference number and last name on the check-in page.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-[#FFF5E1] rounded-full w-8 h-8 flex items-center justify-center text-[#1E3A8A] font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-medium text-[#1E3A8A]">Select Passengers</h3>
                <p className="text-sm text-muted-foreground">
                  Choose the passengers who will be checking in from your booking.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-[#FFF5E1] rounded-full w-8 h-8 flex items-center justify-center text-[#1E3A8A] font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-medium text-[#1E3A8A]">Select Seats</h3>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred seats from the available options on the seating chart.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-[#FFF5E1] rounded-full w-8 h-8 flex items-center justify-center text-[#1E3A8A] font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-medium text-[#1E3A8A]">Add Special Services</h3>
                <p className="text-sm text-muted-foreground">
                  Request special meals, extra baggage, or other services if needed.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-[#FFF5E1] rounded-full w-8 h-8 flex items-center justify-center text-[#1E3A8A] font-bold flex-shrink-0">
                5
              </div>
              <div>
                <h3 className="font-medium text-[#1E3A8A]">Download Boarding Pass</h3>
                <p className="text-sm text-muted-foreground">
                  Get your boarding pass as a PDF or add it to your mobile wallet.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Button className="flex-1 bg-[#1E3A8A]">Start Check-In</Button>
            <Button variant="outline" className="flex-1" onClick={() => setShowWebCheckIn(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

