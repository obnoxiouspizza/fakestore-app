# FakeStore E-Commerce App (React)

A responsive e-commerce front-end built with **React**, **React Router**, **Axios**, and **React Bootstrap** using the **FakeStoreAPI**. Users can browse products, view details, and simulate creating, editing, and deleting products via API calls.

> **Note:** FakeStoreAPI is a mock/testing API. It will return successful responses to POST/PUT/DELETE requests, but changes will **not persist** after refresh or refetch.

---

## Features

- **Home page** with a quick intro + navigation
- **Product Listing** page:
  - Fetches products from the API
  - Displays product image, title, and price
  - "View Details" navigation for each product
- **Product Details** page:
  - Fetches a single product by ID using route params
  - Shows image, title, description, category, and price
  - Includes **Delete** with confirmation modal + redirect
  - Includes "Edit Product" navigation
- **Add Product** page:
  - Form to create a product (POST)
  - Displays success confirmation
- **Edit Product** page:
  - Pre-fills form with existing product data (GET)
  - Updates product (PUT)
  - Displays success confirmation
- **Responsive UI** using React Bootstrap
- **Loading + error handling** for API calls

---

## Tech Stack

- React (Vite)
- React Router
- Axios
- React Bootstrap + Bootstrap
- FakeStoreAPI

---

## Routes

- `/` — Home
- `/products` — Product Listing
- `/products/:id` — Product Details
- `/add-product` — Add Product
- `/edit-product/:id` — Edit Product

---

## Getting Started (Local Setup)

1. Clone the repo:
   ```bash
   git clone <YOUR_REPO_URL>
   cd fakestore-app

