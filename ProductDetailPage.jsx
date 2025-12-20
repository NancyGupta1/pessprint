import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/products.css";

// Sample product data - replace with API call later
const sampleProducts = [
    {
        id: 1,
        name: "Business Card - Premium",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f",
        price: 299,
        offerPrice: 249,
        description: "High-quality premium business cards with glossy finish",
        fullDescription:
            "Our premium business cards are printed on high-quality cardstock with a glossy finish. Perfect for making a lasting impression on clients and partners. Available in standard size (3.5 x 2 inches) with full-color printing on both sides.",
        delivery: "Express",
        stock: 50,
        weight: "250",
        weightType: "gm",
        packagingType: "paper",
        specifications: [
            "Size: 3.5 x 2 inches",
            "Material: Premium cardstock",
            "Finish: Glossy",
            "Printing: Full color both sides",
            "Quantity: 100 cards per pack",
        ],
    },
    {
        id: 2,
        name: "Wedding Invitation Card",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552",
        price: 499,
        offerPrice: 399,
        description: "Elegant wedding invitation cards with custom design",
        fullDescription:
            "Make your special day even more memorable with our elegant wedding invitation cards. Featuring premium paper quality and customizable designs to match your wedding theme perfectly.",
        delivery: "Standard",
        stock: 100,
        weight: "300",
        weightType: "gm",
        packagingType: "paper",
        specifications: [
            "Size: 5 x 7 inches",
            "Material: Premium art paper",
            "Finish: Matte",
            "Customizable design",
            "Includes envelopes",
        ],
    },
    {
        id: 3,
        name: "Flyer - A4 Size",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
        price: 199,
        offerPrice: 149,
        description: "Professional flyers for marketing and promotions",
        fullDescription:
            "Professional A4 size flyers perfect for marketing campaigns, events, and promotions. High-quality printing with vibrant colors to grab attention.",
        delivery: "Express",
        stock: 200,
        weight: "150",
        weightType: "gm",
        packagingType: "paper",
        specifications: [
            "Size: A4 (8.27 x 11.69 inches)",
            "Material: 130gsm art paper",
            "Finish: Glossy/Matte",
            "Full color printing",
            "Quantity: 50 flyers per pack",
        ],
    },
    {
        id: 4,
        name: "Brochure - Tri-fold",
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4",
        price: 399,
        offerPrice: 349,
        description: "Tri-fold brochures with premium paper quality",
        fullDescription:
            "Professional tri-fold brochures ideal for showcasing your products and services. Premium paper quality with excellent print clarity.",
        delivery: "Standard",
        stock: 75,
        weight: "200",
        weightType: "gm",
        packagingType: "paper",
        specifications: [
            "Size: 8.5 x 11 inches (folded)",
            "Material: 170gsm art paper",
            "Finish: Glossy",
            "Tri-fold design",
            "Full color both sides",
        ],
    },
    {
        id: 5,
        name: "Poster - Large Format",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
        price: 599,
        offerPrice: 499,
        description: "Large format posters for events and advertising",
        fullDescription:
            "Eye-catching large format posters perfect for events, advertising, and promotional campaigns. Printed on high-quality paper with vibrant colors.",
        delivery: "Express",
        stock: 30,
        weight: "400",
        weightType: "gm",
        packagingType: "paper",
        specifications: [
            "Size: 24 x 36 inches",
            "Material: Premium poster paper",
            "Finish: Glossy/Matte",
            "High-resolution printing",
            "Weather-resistant coating available",
        ],
    },
    {
        id: 6,
        name: "Letterhead Design",
        image: "https://images.unsplash.com/photo-1586281380614-7c1f6d3f4e7d",
        price: 249,
        offerPrice: 199,
        description: "Professional letterhead design for businesses",
        fullDescription:
            "Professional letterhead designs that represent your brand identity. High-quality printing on premium paper for a professional look.",
        delivery: "Standard",
        stock: 150,
        weight: "100",
        weightType: "gm",
        packagingType: "paper",
        specifications: [
            "Size: A4 (8.27 x 11.69 inches)",
            "Material: Premium bond paper",
            "Finish: Matte",
            "Custom design",
            "Quantity: 100 sheets per pack",
        ],
    },
];

export default function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    // Find product by ID
    const product = sampleProducts.find((p) => p.id === parseInt(id));

    if (!product) {
        return (
            <div className="product-not-found">
                <h2>Product Not Found</h2>
                <button onClick={() => navigate("/products")}>Back to Products</button>
            </div>
        );
    }

    const calculateDiscount = (price, offerPrice) => {
        return Math.round(((price - offerPrice) / price) * 100);
    };

    const handleQuantityChange = (type) => {
        if (type === "increase" && quantity < product.stock) {
            setQuantity(quantity + 1);
        } else if (type === "decrease" && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        alert(`Added ${quantity} x ${product.name} to cart!`);
    };

    return (
        <div className="product-detail-container">
            <button className="back-button" onClick={() => navigate("/products")}>
                ← Back to Products
            </button>

            <div className="product-detail-content">
                <div className="product-detail-image">
                    <img src={product.image} alt={product.name} />
                    <div className="product-badges">
                        <span className="delivery-badge">{product.delivery}</span>
                        {product.offerPrice < product.price && (
                            <span className="discount-badge">
                                {calculateDiscount(product.price, product.offerPrice)}% OFF
                            </span>
                        )}
                    </div>
                </div>

                <div className="product-detail-info">
                    <h1>{product.name}</h1>
                    <p className="product-short-desc">{product.description}</p>

                    <div className="product-price-section">
                        <div className="price-info">
                            <span className="current-price">₹{product.offerPrice}</span>
                            {product.offerPrice < product.price && (
                                <>
                                    <span className="original-price-detail">₹{product.price}</span>
                                    <span className="discount-percent">
                                        {calculateDiscount(product.price, product.offerPrice)}% OFF
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="product-meta">
                        <div className="meta-item">
                            <strong>Weight:</strong> {product.weight} {product.weightType}
                        </div>
                        <div className="meta-item">
                            <strong>Packaging:</strong> {product.packagingType}
                        </div>
                        <div className="meta-item">
                            <strong>Delivery:</strong> {product.delivery}
                        </div>
                        <div className="meta-item">
                            <strong>Stock:</strong>{" "}
                            {product.stock > 0 ? (
                                <span className="in-stock">{product.stock} available</span>
                            ) : (
                                <span className="out-of-stock">Out of Stock</span>
                            )}
                        </div>
                    </div>

                    <div className="quantity-selector">
                        <label>Quantity:</label>
                        <div className="quantity-controls">
                            <button
                                onClick={() => handleQuantityChange("decrease")}
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <span className="quantity-display">{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange("increase")}
                                disabled={quantity >= product.stock}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button
                            className="add-to-cart-btn"
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                        >
                            Add to Cart
                        </button>
                        <button className="buy-now-btn" disabled={product.stock === 0}>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            <div className="product-details-section">
                <div className="detail-tabs">
                    <h2>Product Description</h2>
                    <p className="full-description">{product.fullDescription}</p>

                    <h2>Specifications</h2>
                    <ul className="specifications-list">
                        {product.specifications.map((spec, index) => (
                            <li key={index}>{spec}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
