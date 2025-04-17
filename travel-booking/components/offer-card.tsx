import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"

interface OfferCardProps {
  title: string
  description: string
  icon: ReactNode
  color: string
  textColor: string
}

export function OfferCard({ title, description, icon, color, textColor }: OfferCardProps): JSX.Element {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        <div className={`${color} ${textColor} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <h3 className="font-bold text-lg mb-2 text-[#283A2C]">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Button
          variant="outline"
          className="w-full border-[#283A2C] text-[#283A2C] hover:bg-[#DADDC5] hover:text-[#283A2C]"
        >
          View Offer
        </Button>
      </CardContent>
    </Card>
  )
}

