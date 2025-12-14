import Spinner from "react-bootstrap/Spinner";

export default function Loading({ text = "Loading..." }) {
  return (
    <div className="d-flex align-items-center gap-2 py-3">
      <Spinner animation="border" role="status" size="sm" />
      <span>{text}</span>
    </div>
  );
}
