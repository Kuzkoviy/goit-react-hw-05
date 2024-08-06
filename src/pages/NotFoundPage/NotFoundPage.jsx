import { Link } from "react-router-dom";
export default function NotFoundPage() {
  return (
    <div>
      <Link to="/">Go to home page</Link>
      <p>NotFound page</p>
    </div>
  );
}