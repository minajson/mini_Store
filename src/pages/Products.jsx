
// src/pages/Products.jsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "../services/products";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";

const Products = () => {
  const [category, setCategory] = useState("all");

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const isLoading = productsQuery.isLoading || productsQuery.isFetching;

  const filtered =
    category === "all" || !productsQuery.data
      ? productsQuery.data || []
      : productsQuery.data.filter((p) => p.category === category);

  return (
    <main className="page">
      <header className="page-header">
        <div>
          <h1>Store</h1>
          <p>Browse live products from the FakeStore API.</p>
        </div>

        <div className="filter-wrap">
          <label htmlFor="category">Filter by category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All</option>
            {categoriesQuery.data?.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </header>

      {productsQuery.isError && (
        <p className="error-text">
          Could not load products. Please refresh or check your connection.
        </p>
      )}

      <section className="products-grid">
        {isLoading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <ProductSkeleton key={idx} />
            ))
          : filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </section>
    </main>
  );
};

export default Products;
