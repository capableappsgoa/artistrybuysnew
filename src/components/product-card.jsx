import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProductCard({ id, name, price, imageSrc }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={name}
          width={300}
          height={300}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 flex translate-y-[100%] justify-center p-2 transition-transform duration-300 group-hover:translate-y-0">
          <Button size="sm" className="w-full gap-1">
            <ShoppingCart className="h-4 w-4" />
            Quick Add
          </Button>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm truncate">{name}</h3>
        <p className="mt-1 text-sm font-semibold">${price.toFixed(2)}</p>
      </div>
    </div>
  )
}

