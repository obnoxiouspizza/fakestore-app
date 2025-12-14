import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { getProducts } from "../api/fakestore";
import Loading from "../components/Loading";
import ErrorAlert from "../components/ErrorAlert";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setError("");
        const data = await getProducts();
        if (!ignore) setProducts(data);
      } catch {
        if (!ignore) setError("Failed to load products. Please try again.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) return <Loading text="Loading products..." />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <>
      <h1 className="mb-3">Products</h1>

      <Row xs={1} sm={2} md={3} lg={4} className="g-3">
        {products.map((p) => (
          <Col key={p.id}>
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>
    </>
  );
}
