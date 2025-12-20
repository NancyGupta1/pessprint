import {
  Phone,
  HelpCircle,
  Folder,
  Heart,
  ShoppingCart,
  User,
  Search,
  Package
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <h1 className="logo">Pessprint</h1>

        {/* SEARCH WITH ICON */}
        <div className="search-wrapper">
          <Search className="search-icon" size={30} />
          <input
            type="text"
            className="search-box"
            placeholder="Search designs, products, templates..."
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <div className="nav-item help">
          <HelpCircle size={30} />
          <div className="help-text">
            <span>Help is here</span>
            <strong>02522-669393</strong>
          </div>
        </div>

        <div className="nav-item" onClick={() => navigate("/products")} style={{ cursor: "pointer" }}>
          <Package size={30} />
          <span>Products</span>
        </div>

        <div className="nav-item">
          <Folder size={30} />
          <span>My Projects</span>
        </div>

        <div className="nav-item">
          <Heart size={30} />
          <span>My Favorites</span>
        </div>

        <div className="nav-item signin">
          <User size={30} />
          <span>Sign in</span>
        </div>

        <div className="nav-item cart">
          <ShoppingCart size={30} />
          <span>Cart</span>
        </div>
      </div>
    </header>
  );
}
