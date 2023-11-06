import { Link } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import Logo from "src/Layout/Logo/Logo";
import Menu from "src/Layout/Menu/Menu";
import AccountMenu from "./Account/Account";

function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="nav-bar__wrap">
        <div className="nav-bar__left">
          <Menu />
          <Logo />
        </div>
        <div className="nav-bar__right">
          <Link className="nav-bar__right__links" to="/signup">
            Sign Up
          </Link>
          <Link className="nav-bar__right__links" to="/login">
            Log In
          </Link>
          <AccountMenu />
          <Link className="nav-bar__right__post" to="/submit">
            <CreateIcon fontSize="small" />
            Post
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
