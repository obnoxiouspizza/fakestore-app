import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Card className="h-100 soft-card">
      <Card.Body className="d-flex flex-column p-3">
        <div className="bg-white rounded-4 p-3 d-flex align-items-center justify-content-center">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
            style={{ height: 180 }}
          />
        </div>

        <div className="mt-3">
          <div className="text-muted small mb-1">${product.price}</div>
          <Card.Title className="fs-6 mb-2" style={{ lineHeight: 1.2 }}>
            {product.title}
          </Card.Title>
        </div>

        <div className="mt-auto pt-2">
          <Button as={Link} to={`/products/${product.id}`} className="w-100">
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
