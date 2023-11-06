import { Link } from "react-router-dom";
import "src/Layout/Logo/Logo.scss";

function Logo() {
  return (
    <Link to="/" className="logo">
      9gagClone
    </Link>
  );
}

export default Logo;
