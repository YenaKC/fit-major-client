import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function ProductsPage() {
    // Starts with empty array to save the state of the component.
    const [products, setProducts] = useState([]);

    // Execute for the first rendering
    // Getting data 
    useEffect(() => {
        api
            .get("/products")
            .then((res) => {
                setProducts(res.data)
            })
            .catch(console.log) // For the case of error => print
    }, [])

    return (
        <main className="page">
            <div className="container">
                <h1>FIT MAJOR</h1>
                <p>Products Page</p>

                {/* Print the products */}
                <div className="product-grid">
                    {products.map(product => (
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default ProductsPage;