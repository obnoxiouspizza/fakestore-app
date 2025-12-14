import axios from "axios";

export const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000,
});

export async function getProducts() {
  const { data } = await api.get("/products");
  return data;
}

export async function getProductById(id) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

export async function addProduct(payload) {
  const { data } = await api.post("/products", payload);
  return data;
}

export async function updateProduct(id, payload) {
  const { data } = await api.put(`/products/${id}`, payload);
  return data;
}

export async function deleteProduct(id) {
  const { data } = await api.delete(`/products/${id}`);
  return data;
}
