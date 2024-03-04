import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useStateValue } from "../StateProvider";
import Order from "../components/Order";
import "./Orders.css";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

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
          // using to toSorted instead of sort for avoiding mutation of the original array
          const sortedOrders = ordersData.toSorted(
            (a, b) => b.created - a.created
          );
          console.log(`Order history of ${user.email}`);
          setOrders(sortedOrders);
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
      {orders.length === 0 ? (
        <h1>
          You haven't ordered anything yet, {<Link to="/">click here</Link>} to
          shop!
        </h1>
      ) : (
        <h1>Your Orders</h1>
      )}
      <div className="orders__order">
        {orders?.map((order) => (
          <Order key={uuidv4()} order={order} />
        ))}
      </div>
    </div>
  );
}
