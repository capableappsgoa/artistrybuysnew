import { MainNav } from "@/components/main-nav"
import ShoppingCart from "@/components/shopping-cart"

export default function Cart() {
  return (
    <>
    <MainNav />
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      <ShoppingCart />
    </main>
    </>
  )
}
