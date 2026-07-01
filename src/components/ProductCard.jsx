import { Link } from "react-router-dom";

function ProductCard({ product }) {
    return (

        <Link to={`/products/${product._id}`} className="product-card card">
            <img src={product.image} alt={product.name} className="product-image" />

            <h3>{product.name}</h3>
            <p>{product.price} €</p>
        </Link>
    );
}

export default ProductCard;