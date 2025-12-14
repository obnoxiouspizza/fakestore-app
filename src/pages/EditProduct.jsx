import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { getProductById, updateProduct } from "../api/fakestore";
import Loading from "../components/Loading";
import ErrorAlert from "../components/ErrorAlert";

export default function Editproduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);
        if (ignore) return;

        setForm({
          title: data?.title ?? "",
          price: String(data?.price ?? ""),
          description: data?.description ?? "",
          category: data?.category ?? "",
        });
      } catch {
        if (!ignore) setError("Failed to load product for editing.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [id]);

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
      setSaving(true);

      const payload = {
        title: form.title.trim(),
        price: Number(form.price),
        description: form.description.trim(),
        category: form.category.trim(),
        image: "https://i.pravatar.cc",
      };

      await updateProduct(id, payload);

      setSuccess("✅ Product updated (mock). Redirecting to details...");
      setTimeout(() => navigate(`/products/${id}`), 900);
    } catch {
      setError("Failed to update product. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <Loading text="Loading product for editing..." />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <Card className="p-4">
      <h1 className="mb-3">Edit Product</h1>

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

        <div className="d-flex gap-2">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>

          <Button as={Link} to={`/products/${id}`} variant="outline-secondary">
            Cancel
          </Button>
        </div>

        <p className="text-muted mt-3 mb-0">
          Note: FakeStoreAPI is a mock API. PUT returns success but does not
          persist after refresh.
        </p>
      </Form>
    </Card>
  );
}
