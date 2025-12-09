
// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <span className="nav-logo-badge">mini</span>
          <span>Market</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/products">Store</NavLink>
          <NavLink to="/checkout">Checkout</NavLink>
        </nav>

        <Link to="/checkout" className="nav-cart">
          <span className="nav-cart-icon">🛒</span>
          <span className="nav-cart-count">{totalItems}</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
