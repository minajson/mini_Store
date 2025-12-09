
// src/pages/ProductDetail.jsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../services/products";
import ProductSkeleton from "../components/ProductSkeleton";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { dispatch } = useCart();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  if (isLoading) {
    return (
      <main className="page">
        <ProductSkeleton />
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="page">
        <p className="error-text">Could not load that product.</p>
      </main>
    );
  }

  const handleAdd = () => {
    dispatch({ type: "ADD", payload: data });
  };

  return (
    <main className="page product-detail">
      <div className="detail-image">
        <img src={data.image} alt={data.title} />
      </div>

      <div className="detail-body">
        <p className="detail-category">{data.category}</p>
        <h1>{data.title}</h1>
        <p className="detail-description">{data.description}</p>
        <p className="detail-price">${data.price}</p>

        <button onClick={handleAdd} className="btn-primary">
          Add to cart
        </button>
      </div>
    </main>
  );
};

export default ProductDetail;
