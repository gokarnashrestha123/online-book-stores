import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import Title from "../components/Title";
import styles from "./Orders.module.css";

const Orders = () => {
  const { backendUrl, token, currency, delivery_charges } =
    useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrdersData = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersData.push(item);
          });
        });
        setOrderData(allOrdersData.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <section>
      <div className={styles.orderContainer}>
        {/* title */}
        <Title title1={"Order"} title2={"List"}></Title>
        {/* container */}
        {orderData.map((item, i) => (
          <div key={i} className={styles.orderCard}>
            <div>
              {/* image */}
              <img
                src={item.image}
                alt="orderItenImg"
                className={styles.orderImage}
              />
            </div>
            <div className={styles.orderContent}>
              <h5 className={styles.itemName}>{item.name}</h5>
              <div className={styles.orderInfo}>
                <div className={styles.infoBlock}>
                  <div>
                    <h5>Price:</h5>
                    <p>
                      {currency}
                      {item.price}
                    </p>
                  </div>
                  <div>
                    <h5>Quantity:</h5>
                    <p>{item.quantity}</p>
                  </div>
                  <div>
                    <h5>Total price:</h5>
                    <p>
                      {currency}
                      {(item.price * item.quantity + delivery_charges).toFixed(
                        2
                      )}
                    </p>
                  </div>
                  <div>
                    <h5>Payment:</h5>
                    <p>{item.paymentMethod}</p>
                  </div>
                </div>
                <div className={styles.infoBlock}>
                  <h5>Date:</h5>
                  <p>{new Date(item.date).toDateString()}</p>
                </div>
              </div>
              {/* status and button */}
              <div className={styles.statusSection}>
                <div>
                  <p></p>
                  <p className={styles.status}>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className={styles.trackButton}>
                  Track Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Orders;
