import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import Image from "next/image"

interface DestinationCardProps {
  image: string
  name: string
  description: string
  price: number
  rating: number
  currency?: string
}

export function DestinationCard({
  image,
  name,
  description,
  price,
  rating,
  currency = "$",
}: DestinationCardProps): JSX.Element {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-[#283A2C]">{name}</h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        <p className="font-bold text-[#283A2C]">
          From {currency}
          {price}
          <span className="text-xs font-normal text-muted-foreground ml-1">per person</span>
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          variant="outline"
          className="w-full border-[#283A2C] text-[#283A2C] hover:bg-[#DADDC5] hover:text-[#283A2C]"
        >
          View Deals
        </Button>
      </CardFooter>
    </Card>
  )
}

