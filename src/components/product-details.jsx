"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import RelatedProducts from "./related-products"

export default function ProductDetails(item) {
  const [currentImage, setCurrentImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState("black")
  const [isFavorite, setIsFavorite] = useState(false)
  const [likes, setLikes] = useState(124)

  const productimage = item.image
  // Product images array (placeholders)
  const images = [
    productimage,
    productimage,
    productimage,
    productimage,
  ]

  // Available colors
  const colors = [
    { id: "black", name: "Black", class: "bg-black" },
    { id: "white", name: "White", class: "bg-white border border-gray-200" },
    { id: "red", name: "Red", class: "bg-red-500" },
    { id: "blue", name: "Blue", class: "bg-blue-500" },
    { id: "green", name: "Green", class: "bg-green-500" },
  ]

  // Navigate carousel
  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  // Toggle favorite
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    setLikes((prev) => (isFavorite ? prev - 1 : prev + 1))
  }

  return (
    <>
    <div className="flex flex-col mb-28">
      <div className="grid md:grid-cols-2 gap-8 py-6">
        {/* Product Image Carousel */}
        <div className="relative">
          <div className="relative aspect-square overflow-hidden rounded-lg h-[100%] bg-white">
            <Image
              src={images[currentImage] || "/placeholder.svg"}
              alt={`Product image ${currentImage + 1}`}
              fill
              className="object-contain"
              priority
            />

            {/* Carousel Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-4 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`h-2 w-2 rounded-full ${currentImage === index ? "bg-primary" : "bg-gray-300"}`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          {/* Thumbnail Preview */}
          <div className="hidden sm:flex justify-center mt-4 gap-2">
            {images.map((src, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`relative h-16 w-16 rounded-md overflow-hidden  ${
                  currentImage === index ? "ring-2 ring-primary" : "opacity-70"
                }`}
              >
                <Image src={src || "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"} alt={`Thumbnail ${index + 1}`} fill  sizes="100%" className="object-fill" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{item.title}</h1>
              <p className="text-xl mt-2">${item.price}</p>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="flex gap-1 items-center">
                <Heart className="h-3 w-3 fill-current" />
                <span>{likes}</span>
              </Badge>
            </div>
          </div>

          {/* Color Selection */}
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-3">Color</h3>
            <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <div key={color.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={color.id} id={`color-${color.id}`} className="sr-only" />
                  <Label htmlFor={`color-${color.id}`} className="cursor-pointer flex flex-col items-center">
                    <span
                      className={`h-8 w-8 rounded-full ${color.class} ${
                        selectedColor === color.id ? "ring-2 ring-offset-2 ring-primary" : ""
                      }`}
                    />
                    <span className="mt-1 text-xs">{color.name}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Product Description */}
          <div className="mt-6 space-y-4 text-gray-500">
            <p>
              Our Premium Comfort T-Shirt is crafted from the finest organic cotton, providing exceptional softness and
              breathability for all-day comfort.
            </p>
            <p>
              The versatile design features a classic crew neck and relaxed fit, making it perfect for casual everyday
              wear or layering under your favorite jacket.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>100% organic cotton</li>
              <li>Relaxed fit</li>
              <li>Machine washable</li>
              <li>Available in multiple colors</li>
              <li>Sustainably manufactured</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button className="flex-1 gap-2" size="lg">
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              variant={isFavorite ? "default" : "outline"}
              className="flex-1 gap-2"
              size="lg"
              onClick={toggleFavorite}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "" : "fill-none"}`} />
              {isFavorite ? "Added to Favorites" : "Add to Favorites"}
            </Button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
    </div>
      <RelatedProducts />
    </>
  )
}

