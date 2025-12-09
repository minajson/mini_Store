// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Layout>
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
