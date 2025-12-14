import Alert from "react-bootstrap/Alert";

export default function ErrorAlert({ message = "Something went wrong." }) {
  return <Alert variant="danger">{message}</Alert>;
}
