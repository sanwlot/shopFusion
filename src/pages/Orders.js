import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useStateValue } from "../StateProvider";
import Order from "../components/Order";
import "./Orders.css";

export default function Orders() {
  const [{ user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        // Create a reference to the user's orders collection
        const ordersCollection = collection(db, "users", user.uid, "orders");

        // Query the orders collection to get all documents
        const ordersQuery = query(ordersCollection);

        try {
          // Fetch the documents from the orders collection
          const snapshot = await getDocs(ordersQuery);

          // Extract data from the documents and update state
          const ordersData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(`Order history of ${user.email}: ${ordersData}`);
          console.log(ordersData);
          setOrders(ordersData);
        } catch (error) {
          console.error("Error fetching orders: ", error);
        }
      } else {
        console.log("User is not logged in, Can't fetch the orders!");
        setOrders([]);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}
