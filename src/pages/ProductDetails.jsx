import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import { getProductById, deleteProduct } from "../api/fakestore";
import Loading from "../components/Loading";
import ErrorAlert from "../components/ErrorAlert";
import ConfirmModal from "../components/ConfirmModal";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setError("");
        const data = await getProductById(id);
        if (!ignore) setProduct(data);
      } catch {
        if (!ignore)
          setError("Failed to load product details. Please try again.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [id]);

  async function handleDelete() {
    try {
      setDeleting(true);
      await deleteProduct(id);
      setShowConfirm(false);
      navigate("/products");
    } catch {
      setError("Delete failed. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  if (loading) return <Loading text="Loading product..." />;
  if (error) return <ErrorAlert message={error} />;
  if (!product) return null;

  return (
    <>
      <h1 className="mb-3">Product Details</h1>

      <Card className="p-3">
        <div className="d-flex flex-column flex-md-row gap-4">
          <div
            className="d-flex justify-content-center"
            style={{ minWidth: 260 }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ maxHeight: 320, maxWidth: "100%", objectFit: "contain" }}
            />
          </div>

          <div className="flex-grow-1">
            <h2 className="h4">{product.title}</h2>

            <div className="mb-2">
              <Badge bg="secondary">{product.category}</Badge>
            </div>

            <p className="mb-2">{product.description}</p>
            <p className="fw-bold fs-5">${product.price}</p>

            <div className="d-flex flex-wrap gap-2">
              <Button variant="success" disabled>
                Add to Cart (Optional)
              </Button>

              <Button
                as={Link}
                to={`/edit-product/${product.id}`}
                variant="warning"
              >
                Edit Product
              </Button>

              <Button variant="danger" onClick={() => setShowConfirm(true)}>
                Delete Product
              </Button>

              <Button as={Link} to="/products" variant="outline-secondary">
                Back to Products
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <ConfirmModal
        show={showConfirm}
        title="Delete this product?"
        body="This sends a DELETE request to FakeStoreAPI. The API will respond with success, but the product may reappear after refresh because it’s a mock API."
        confirmText="Yes, delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onClose={() => setShowConfirm(false)}
        loading={deleting}
      />
    </>
  );
}
