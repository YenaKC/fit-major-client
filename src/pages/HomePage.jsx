import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

function HomePage() {
    // State and Products
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api
            .get("/products")
            .then((res) => {
                setProducts(res.data);
            })
            .catch((error) => {
                console.log("HOME PRODUCTS FETCH ERROR:", error);
            });
    }, []);

    // List of products for each section
    const featuredProducts = products
        .filter((product) => product.featured === true)
        .slice(0, 4);
    // Select products with featured set to true and return a maximum of 4

    const newProducts = products
        .filter((product) => product.isNew === true)
        .slice(0, 4);

    const saleProducts = products
        .filter((product) => product.onSale === true)
        .slice(0, 4);

    const promoCards = [
        {
            title: "OVERSIZED TEES",
            category: "Oversized T-Shirt",
            className: "promo-tee",
        },
        {
            title: "PERFORMANCE FIT",
            category: "Leggings",
            className: "promo-performance",
        },
        {
            title: "TRAINING HOODIES",
            category: "Hoodie",
            className: "promo-hoodie",
        },
        {
            title: "ESSENTIALS",
            category: "Accessories",
            className: "promo-essentials",
        },
    ];

    return (
        <main className="page">
            {/* HERO  */}
            <section className="home-hero">
                <div className="hero-content">
                    <p className="hero-kicker">SUMMER DROP</p>
                    <h1>FIT MAJOR</h1>
                    <p className="hero-text">
                        Premium gymwear for strong bodies and sharp aesthetics.
                    </p>

                    <Link to="/products" className="btn hero-btn">
                        SHOP NOW
                    </Link>
                </div>
            </section>

            {/* FEATURED COLLECTION */}
            {/* Generate promo links from the promoCards array */}
            <section className="container home-section">
                <div className="section-header">
                    <h2>FEATURED COLLECTION</h2>
                    <Link to="/products">View all</Link>
                </div>

                <div className="home-promo-grid">
                    {promoCards.map((card) => (
                        <Link 
                            key={card.category}
                            to={`/products?category=${encodeURIComponent(card.category)}`}
                            className={`promo-card ${card.className}`}
                            aria-label={`View ${card.title}`}
                            // aria-label describes the link purpose for screen readers
                        />
                    ))}
                </div>

            </section>

            {/* FEATURED PRODUCTS */}
            {featuredProducts.length > 0 && (
                <section className="container home-section">
                    <div className="section-header">
                        <h2>FEATURED PRODUCTS</h2>
                        <Link to="/products">VIEW ALL</Link>
                    </div>

                    <div className="product-grid">
                        {featuredProducts.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* NEW ARRIVALS */}
            {newProducts.length > 0 && (
                // Show the New Arrivals section when at least one new product exists≤
                <section className="container home-section">
                    <div className="section-header">
                        <h2>NEW ARRIVALS</h2>
                        <Link to="/products?collection=new">
                            VIEW ALL
                        </Link>
                    </div>

                    <div className="product-grid">
                        {newProducts.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* SALE */}
            {saleProducts.length > 0 && (
                <section className="container home-section">
                    <div className="section-header">
                        <h2>SALE</h2>
                        <Link to="/products?collection=sale">
                            VIEW ALL
                        </Link>
                    </div>

                    <div className="product-grid">
                        {saleProducts.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* ABOUT US */}
            <section className="container home-section">
                <h2>WHY FIT MAJOR</h2>

                <div className="benefits-grid">
                    <div className="benefit-card">
                        <h3>TRAIN HARD</h3>
                        <p>Built for gym sessions, movement and daily discipline.</p>
                    </div>

                    <div className="benefit-card">
                        <h3>LOOK SHARP</h3>
                        <p>Minimal Korean lines with Dubai-inspired luxury energy.</p>
                    </div>

                    <div className="benefit-card">
                        <h3>MOVE BETTER</h3>
                        <p>Comfortable pieces made for an active lifestyle.</p>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <Footer />
        </main>
    );
}


export default HomePage;