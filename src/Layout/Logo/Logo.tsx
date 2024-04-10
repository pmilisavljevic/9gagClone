import { Link } from "react-router-dom";

import "src/Layout/Logo/Logo.scss";

export default function Logo() {
  return (
    <Link to="/" className="logo">
      9gagClone
    </Link>
  );
}
