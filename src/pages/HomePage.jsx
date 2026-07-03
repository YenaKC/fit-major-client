import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";

function HomePage() {
    return (
        <main className="page">
            {/* HERO  */}
            <section className="home-hero">
                <div className="hero-content">
                    <p className="hero-kicker">SUMMER DROP</p>
                    <h1>FIT MAJOR</h1>
                    <p className="hero-text">
                        Premium gymwear for strong bodies and sharp aethetics.
                    </p>

                    <Link to="/products" className="btn hero-btn">
                        SHOP NOW
                    </Link>
                </div>
            </section>

            {/* FEATURED COLLECTION */}
            <section className="container home-section">
                <div className="section-header">
                    <h2>FEATURED COLLECTION</h2>
                    <Link to="/products">View all</Link>
                </div>

                {/* <div className="home-promo-grid">
                    <Link to="/products" className="promo-card">
                        <span>OVERSIZED TEES</span>
                    </Link>

                    <Link to="/products" className="promo-card promo-card-gold">
                        <span>PERFORMANCE FIT</span>
                    </Link>
                </div> */}
                <div className="home-promo-grid">

                    <Link to="/products" className="promo-card promo-tee">
                        {/* <span>OVERSIZED TEES</span> */}
                    </Link>

                    <Link to="/products" className="promo-card promo-performance">
                        {/* <span>PERFORMANCE FIT</span> */}
                    </Link>

                    <Link to="/products" className="promo-card promo-hoodie">
                        {/* <span>TRAINING HOODIES</span> */}
                    </Link>

                    <Link to="/products" className="promo-card promo-essentials">
                        {/* <span>ESSENTIALS</span> */}
                    </Link>
                </div>

            </section>

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