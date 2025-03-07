"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ProductCard from "./product-card"
import { Button } from "@/components/ui/button"

// Sample related products data
const relatedProducts = [
  {
    id: "1",
    name: "Classic Comfort Hoodie",
    price: 59.99,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "2",
    name: "Relaxed Fit Jeans",
    price: 49.99,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "3",
    name: "Premium Wool Sweater",
    price: 79.99,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "4",
    name: "Lightweight Running Jacket",
    price: 89.99,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "5",
    name: "Casual Canvas Shoes",
    price: 39.99,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "6",
    name: "Slim Fit Chino Pants",
    price: 54.99,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
]

export default function RelatedProducts() {
  const scrollContainerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollability = () => {
    const container = scrollContainerRef.current
    if (!container) return

    setCanScrollLeft(container.scrollLeft > 0)
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
  }

  const scrollLeft = () => {
    const container = scrollContainerRef.current
    if (!container) return

    container.scrollBy({ left: -container.clientWidth / 2, behavior: "smooth" })
  }

  const scrollRight = () => {
    const container = scrollContainerRef.current
    if (!container) return

    container.scrollBy({ left: container.clientWidth / 2, behavior: "smooth" })
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">You may also like</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={scrollLeft} disabled={!canScrollLeft} className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Scroll left</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollRight}
            disabled={!canScrollRight}
            className="rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide snap-x"
        onScroll={checkScrollability}
      >
        {relatedProducts.map((product) => (
          <div key={product.id} className="w-[180px] md:w-[220px] flex-shrink-0 snap-start">
            <ProductCard id={product.id} name={product.name} price={product.price} imageSrc={product.imageSrc} />
          </div>
        ))}
      </div>
    </div>
  )
}

