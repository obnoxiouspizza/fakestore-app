import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Card className="p-4">
      <h1 className="mb-2">Welcome to FakeStore</h1>
      <p className="mb-4">
        Browse products, view details, and practice creating, editing, and
        deleting products using FakeStoreAPI.
      </p>

      <Button as={Link} to="/products" variant="primary">
        Go to Product Listing
      </Button>
    </Card>
  );
}
