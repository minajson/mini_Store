
// src/components/ProductSkeleton.jsx
const ProductSkeleton = () => {
  return (
    <div className="product-card skeleton">
      <div className="product-image-wrap skeleton-box" />
      <div className="product-body">
        <div className="skeleton-line skeleton-wide" />
        <div className="skeleton-line" />
        <div className="skeleton-line skeleton-short" />
      </div>
      <div className="product-actions">
        <div className="skeleton-pill" />
        <div className="skeleton-pill" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
