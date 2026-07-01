import { useEffect, useState } from "react";
import api from "../services/api";

function OrdersPage() {
    const [orders, setOrders] = useState([]);

    const token = localStorage.getItem("authToken");

    useEffect(() => {
        api
            // Bring orders from the logged-in users
            .get("/orders", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setOrders(res.data);
            })
            .catch(console.log);
    }, []);

    // If there's not exist any order
    if (orders.length === 0) {
        return (
            <main className="page">
                <div className="container">
                    <h1>ORDERS</h1>
                    <p>No orders yet.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="page">
            <div className="container">
                <h1>ORDERS</h1>

                <div className="orders-list">
                    {orders.map((order) => (
                        <div className="order-card" key={order._id}>
                            <div className="order-header">
                                <span className="badge">{order.status}</span>
                                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>

                            {order.items.map((item) => (
                                <div className="order-item" key={item._id}>
                                    <p>{item.product.name}</p>
                                    <span>x{item.quantity}</span>
                                </div>
                            ))}

                            <div className="order-total">
                                <p>Total</p>
                                <h2>{order.totalPrice.toFixed(2)}€</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default OrdersPage;