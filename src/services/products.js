
import apiClient from "./apiClient";

export const fetchProducts = async () => {
 const response = await apiClient.get("/products");
 return response.data;

};

export const fetchProductsById = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await apiClient.get("/products/categories");
  return response.data;
};

// Fake "checkout" mutation to demonstrate useMutation.
// Here we just POST to /carts for demo.
export const createCartOrder = async (payload) => {
  const response = await apiClient.post("/carts", payload);
  return response.data;
};