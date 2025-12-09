

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { dispatch } = useCart();

  const handleAdd = () => {
    dispatch({ type: "ADD", payload: product });
  };

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="product-body">
        <h3 title={product.title}>{product.title}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">${product.price}</p>
      </div>

      <div className="product-actions">
        <button onClick={handleAdd}>Add to cart</button>
        <Link to={`/products/${product.id}`}>Details</Link>
      </div>
    </article>
  );
};

export default ProductCard;
