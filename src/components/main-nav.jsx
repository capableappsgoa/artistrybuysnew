"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button2"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const categories = {
  electronics: [
    { title: "Smartphones", href: "/category/smartphones", image: "/placeholder.svg?height=40&width=40" },
    { title: "Laptops", href: "/category/laptops", image: "/placeholder.svg?height=40&width=40" },
    { title: "Tablets", href: "/category/tablets", image: "/placeholder.svg?height=40&width=40" },
    { title: "Cameras", href: "/category/cameras", image: "/placeholder.svg?height=40&width=40" },
    { title: "Audio", href: "/category/audio", image: "/placeholder.svg?height=40&width=40" },
    { title: "Wearables", href: "/category/wearables", image: "/placeholder.svg?height=40&width=40" },
    { title: "TVs", href: "/category/tvs", image: "/placeholder.svg?height=40&width=40" },
    { title: "Gaming", href: "/category/gaming", image: "/placeholder.svg?height=40&width=40" },
  ],
  clothing: [
    { title: "Men's", href: "/category/mens-clothing", image: "/placeholder.svg?height=40&width=40" },
    { title: "Women's", href: "/category/womens-clothing", image: "/placeholder.svg?height=40&width=40" },
    { title: "Kids", href: "/category/kids-clothing", image: "/placeholder.svg?height=40&width=40" },
    { title: "Shoes", href: "/category/shoes", image: "/placeholder.svg?height=40&width=40" },
    { title: "Accessories", href: "/category/accessories", image: "/placeholder.svg?height=40&width=40" },
    { title: "Sportswear", href: "/category/sportswear", image: "/placeholder.svg?height=40&width=40" },
    { title: "Formal Wear", href: "/category/formal-wear", image: "/placeholder.svg?height=40&width=40" },
    { title: "Underwear", href: "/category/underwear", image: "/placeholder.svg?height=40&width=40" },
  ],
  home: [
    { title: "Furniture", href: "/category/furniture", image: "/placeholder.svg?height=40&width=40" },
    { title: "Decor", href: "/category/decor", image: "/placeholder.svg?height=40&width=40" },
    { title: "Bedding", href: "/category/bedding", image: "/placeholder.svg?height=40&width=40" },
    { title: "Kitchen", href: "/category/kitchen", image: "/placeholder.svg?height=40&width=40" },
    { title: "Bathroom", href: "/category/bathroom", image: "/placeholder.svg?height=40&width=40" },
    { title: "Outdoor", href: "/category/outdoor", image: "/placeholder.svg?height=40&width=40" },
    { title: "Lighting", href: "/category/lighting", image: "/placeholder.svg?height=40&width=40" },
    { title: "Storage", href: "/category/storage", image: "/placeholder.svg?height=40&width=40" },
  ],
  beauty: [
    { title: "Skincare", href: "/category/skincare", image: "/placeholder.svg?height=40&width=40" },
    { title: "Makeup", href: "/category/makeup", image: "/placeholder.svg?height=40&width=40" },
    { title: "Hair Care", href: "/category/hair-care", image: "/placeholder.svg?height=40&width=40" },
    { title: "Fragrance", href: "/category/fragrance", image: "/placeholder.svg?height=40&width=40" },
    { title: "Personal Care", href: "/category/personal-care", image: "/placeholder.svg?height=40&width=40" },
    { title: "Men's Grooming", href: "/category/mens-grooming", image: "/placeholder.svg?height=40&width=40" },
  ],
}

export function MainNav() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    (<header
      className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-zinc-950/95 dark:supports-[backdrop-filter]:bg-zinc-950/60">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="h-6 w-6 rounded-full bg-zinc-900 dark:bg-zinc-50" />
            <span className="font-bold">Artistry Buys</span>
          </Link>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {Object.entries(categories).map(([category, items]) => (
                <NavigationMenuItem key={category}>
                  <NavigationMenuTrigger className="capitalize">{category}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul
                      className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {items.map((item) => (
                        <ListItem key={item.title} title={item.title} href={item.href} image={item.image} />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <Link href="/deals" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Deals</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Link href="/cart">
              <ShoppingCart className="h-8 w-8" />
              </Link>
              <span className="sr-only">Shopping Cart</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Samuel Fernandes</p>
                    <p className="text-xs leading-none text-zinc-500 dark:text-zinc-400">Samuel@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <MobileNav />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>)
  );
}

const ListItem = React.forwardRef(({ className, title, image, ...props }, ref) => {
  return (
    (<li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "flex items-center space-x-2 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus:bg-zinc-100 focus:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus:bg-zinc-800 dark:focus:text-zinc-50",
            className
          )}
          {...props}>
          <div className="h-10 w-10 overflow-hidden rounded-md border">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={40}
              height={40}
              className="h-full w-full object-cover" />
          </div>
          <div className="text-sm font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>)
  );
})
ListItem.displayName = "ListItem"

function MobileNav() {
  return (
    (<div className="flex flex-col space-y-4">
      <Link href="/" className="flex items-center space-x-2">
        <span className="h-6 w-6 rounded-full bg-zinc-900 dark:bg-zinc-50" />
        <span className="font-bold">Acme Inc</span>
      </Link>
      {Object.entries(categories).map(([category, items]) => (
        <div key={category} className="space-y-2">
          <h2 className="text-lg font-semibold capitalize">{category}</h2>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="flex items-center space-x-2 rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <div className="h-8 w-8 overflow-hidden rounded-md border">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover" />
                  </div>
                  <span className="text-sm">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Link href="/deals" className="text-lg font-semibold">
        Deals
      </Link>
    </div>)
  );
}

