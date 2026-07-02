import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function ProductsPage() {
    // Starts with empty array to save the state of the component.
    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    // Execute for the first rendering
    // Getting data 
    useEffect(() => {
        api
            .get("/products")
            .then((res) => {
                setProducts(res.data);
            })
            .catch(console.log) // For the case of error => print
    }, []);

    // products: products list from back-end server.
    // search: save the letters that input in the search bar.
    // category: save the current filter, from "all"
    const categories = ["All", ...new Set(products.map((product) => product.category))];

    // Current products list
    const filteredProducts = products.filter((product) => {
        // Check the search keyword in the product name
        const matchesSearch = product.name
            .toLowerCase()
            .includes(search.toLowerCase());

        // Check if it is view mode for all or the selected category is same with the product category..
            const matchesCategory =
            category === "All" || product.category === category;

        return matchesSearch && matchesCategory;
    });

    return (
        <main className="page">
            <div className="container">
                <h1>SHOP</h1>
                <p className="auth-subtitle">FIND YOUR FIT</p>

                <input
                    className="input search-input"
                    type="text"
                    placeholder="SEARCH PRODUCTS..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="filter-row">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            className={category === cat ? "filter-pill active" : "filter-pill"}
                            onClick={() => setCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Print the products */}
                <div className="product-grid">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
               
               {filteredProducts.length === 0 && (
                <p className="empty-text">No Products found.</p>
               )}
            </div>
        </main>
    );
}

export default ProductsPage;