import { useNavigate } from "react-router-dom";
import winterWearImg from "../assets/12085255_20944070.jpg";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-grid">

        {/* LEFT CARD */}
        <div
          className="hero-card-left"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1607082349566-187342175e2f)",
          }}
        >
          <div className="hero-content">
            <h2>Calendars, Notebooks and Diaries</h2>
            <p>Starting at ₹160.00</p>

            <div className="hero-actions">
              <button>Calendars</button>
              <button>Notebooks</button>
              <button>Diaries</button>
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div
          className="hero-card-right"
          style={{
            backgroundImage: `url(${winterWearImg})`,
          }}
        >
          <div className="hero-content">
            <h2>Custom Winter Wear</h2>
            <p>Starting at ₹850</p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={() => navigate("/products")}>
                View Products
              </button>
              <button className="primary-btn" onClick={() => navigate("/category")}>
                Manage Categories
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
