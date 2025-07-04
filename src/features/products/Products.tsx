//rafce
// src/features/products/Products.tsx

import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*").order("id", { ascending: false });

    if (error) {
      alert("Ürünler alınamadı: " + error.message);
      console.error(error);
    } else {
      setProducts(data as Product[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-xl">Yükleniyor...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Ürünler</h1>
      {products.length === 0 ? (
        <p>Henüz ürün eklenmemiş.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <p className="text-red-600 mt-2 font-bold">{product.price.toFixed(2)} TL</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
