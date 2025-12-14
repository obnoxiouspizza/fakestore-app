import { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { addProduct } from "../api/fakestore";

export default function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!form.title || !form.price || !form.description || !form.category) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: form.title.trim(),
        price: Number(form.price),
        description: form.description.trim(),
        category: form.category.trim(),
        image: "https://i.pravatar.cc",
      };

      const created = await addProduct(payload);

      setSuccess(`✅ Product created (mock). Returned ID: ${created?.id}`);
      setForm({ title: "", price: "", description: "", category: "" });
    } catch {
      setError("Failed to create product. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-4">
      <h1 className="mb-3">Add Product</h1>

      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Product Title</Form.Label>
          <Form.Control
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter product title"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            placeholder="0.00"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            rows={3}
            value={form.description}
            onChange={handleChange}
            placeholder="Enter a description"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. electronics"
          />
        </Form.Group>

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Product"}
        </Button>
      </Form>
    </Card>
  );
}
