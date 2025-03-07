"use client";

import { MainNav } from "@/components/main-nav";
import ProductDetails from "@/components/product-details";
import axios from "axios";
import { useEffect, useState } from "react";
import { use } from "react"; // Import use from React

export default function details({ params }) {
  const unwrappedParams = use(params); // Unwrap params with use
  const { productid: id } = unwrappedParams; // Extract product ID from unwrapped params

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://fakestoreapi.com/products/${id}`).then((response) => {
      setData(response.data);
      setLoading(false);
    });
  }, [id]); // Add id as a dependency to useEffect

  console.log(data);
  return (
    <>
      <MainNav />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Product {data.id}</h1>
        <ProductDetails
          id={data.id}
          title={data.title}
          price={data.price}
          description={data.description}
          category={data.category}
          image={data.image}
          rating={data.rating}
        />
      </main>
    </>
  );
}


