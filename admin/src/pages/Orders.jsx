import React from "react";
import { backend_url, currency } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { TfiPackage } from "react-icons/tfi";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./Orders.module.css";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backend_url + "/api/order/list",
        {},
        { headers: { token } }
      );
      console.log(response.data);
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backend_url + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <div className={styles.ordersContainer}>
        {orders.map((order) => (
          <div className={styles.orderCard} key={order._id}>
            {/* Column 1: Items + Images */}
            <div className={`${styles.orderCol} ${styles.orderItems}`}>
              <TfiPackage size={24} />
              <div>
                <h4>Items:</h4>
                {order.items.map((item, index) => (
                  <p key={index}>
                    {item.name} x {item.quantity}
                  </p>
                ))}
              </div>
            </div>

            {/* Column 2: Shipping Info */}
            <div className={`${styles.orderCol} ${styles.orderDetails}`}>
              <p>
                <strong>Name:</strong>{" "}
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <p>
                <strong>Address:</strong> {order.address.street},{" "}
                {order.address.city}, {order.address.state},{" "}
                {order.address.country}, {order.address.zipcode}
              </p>
              <p>
                <strong>Phone:</strong> {order.address.phone}
              </p>
            </div>

            {/* Column 3: Summary */}
            <div className={`${styles.orderCol} ${styles.orderSummary}`}>
              <p>
                <strong>Total Items:</strong> {order.items.length}
              </p>
              <p>
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              <p>
                <strong>Payment:</strong> {order.payment ? "Done" : "Pending"}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Price:</strong> {currency}
                {order.amount}
              </p>
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
      ;
    </div>
  );
};

export default Orders;
