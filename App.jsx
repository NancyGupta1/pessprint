import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MegaMenu from "./components/MegaMenu";
import HurryNow from "./components/HurryNow";
import HeroSection from "./components/HeroSection";
import TemplateGrid from "./components/TemplateGrid";

import Category from "./components/admin/Category";
import DesignReg from "./components/admin/DesignReg";
import SubCategory from "./components/admin/SubCategory"; 
import ProductList from "./components/ProductList";
import ProductDetailPage from "./components/ProductDetailPage";

import "./styles/layout.css";
import "./styles/Navbar.css";
import "./styles/megaMenu.css";
import "./styles/cards.css";
import "./styles/hurryNow.css";
import "./styles/hero.css";

const data = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
    delivery: "Standard",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1523958203904-cdcb402031fd",
    delivery: "Express",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    delivery: "Standard",
  },
];

/* ---------------- HOME PAGE ---------------- */
function HomePage() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <MegaMenu />
      <HurryNow />
      <HeroSection />

      <div className="main-layout">
        <aside className="sidebar">
          <h4>Filters</h4>
          <select>
            <option>All Delivery</option>
          </select>
          <select>
            <option>Orientation</option>
          </select>
        </aside>

        <main className="content-area">
          <TemplateGrid data={data} />
        </main>
      </div>
    </div>
  );
}

/* ---------------- APP ROUTES ---------------- */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* ADMIN PAGES */}
      <Route path="/category" element={<Category />} />
      <Route path="/subcategory" element={<SubCategory />} /> 
      <Route path="/design" element={<DesignReg />} />

      {/* PRODUCT PAGES */}
      <Route path="/products" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
    </Routes>
  );
}
