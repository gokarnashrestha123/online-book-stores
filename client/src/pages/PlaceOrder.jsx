import React, { useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import styles from "./PlaceOrder.module.css";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    books,
    navigate,
    token,
    cartItems,
    setCartItems,
    addToCart,
    getCartAmount,
    delivery_charges,
    backendUrl,
  } = useContext(ShopContext);

  const [method, setMethos] = useState("cod");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          const itemInfo = books.find((book) => book._id === itemId);
          if (itemInfo) {
            orderItems.push({
              ...itemInfo,
              quantity: cartItems[itemId],
            });
          }
        }
      }
      // console.log(orderItems)
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_charges,
      };

      switch (method) {
        case "cod":
          const codRes = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (codRes.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(codRes.data.message);
          }
          break;

        case "esewa":
          const esewaAmount = orderData.amount;
          const esewaData = {
            amt: esewaAmount,
            psc: 0,
            pdc: 0,
            txAmt: 0,
            tAmt: esewaAmount,
            pid: `ORDER_${Date.now()}`,
            scd: "EPAYTEST",
            su: `${backendUrl}/api/order/esewa-success`,
            fu: `${backendUrl}/order/failure`,
          };

          const form = document.createElement("form");
          form.method = "POST";
          form.action = "https://rc.esewa.com.np/api/epay/main/v2/form";

          for (const key in esewaData) {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = esewaData[key];
            form.appendChild(input);
          }

          document.body.appendChild(form);
          form.submit();
          break;

        default:
          toast.error("Select a valid payment method.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <section className={styles.placeOrderSection}>
      <form onSubmit={onSubmitHandler} className={styles.form}>
        <div className={styles.container}>
          {/* Left Side: Delivery Info */}
          <div className={styles.left}>
            <Title title1={"Delivery"} title2={"Information"} />

            <div className={styles.nameRow}>
              <input
                onChange={onChangeHandler}
                value={formData.firstName}
                type="text"
                name="firstName"
                placeholder="First Name"
                className={styles.input}
                required
              />
              <input
                onChange={onChangeHandler}
                value={formData.lastName}
                type="text"
                name="lastName"
                placeholder="Last Name"
                className={styles.input}
                required
              />
            </div>

            <input
              onChange={onChangeHandler}
              value={formData.email}
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input}
              required
            />
            <input
              onChange={onChangeHandler}
              value={formData.phone}
              type="text"
              name="phone"
              placeholder="Phone Number"
              className={styles.input}
              required
            />
            <input
              onChange={onChangeHandler}
              value={formData.street}
              type="text"
              name="street"
              placeholder="Street"
              className={styles.input}
              required
            />

            <div className={styles.cityRow}>
              <input
                onChange={onChangeHandler}
                value={formData.city}
                type="text"
                name="city"
                placeholder="City"
                className={styles.input}
                required
              />
              <input
                onChange={onChangeHandler}
                value={formData.state}
                type="text"
                name="state"
                placeholder="State"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.cityRow}>
              <input
                onChange={onChangeHandler}
                value={formData.zipcode}
                type="text"
                name="zipcode"
                placeholder="Zip Code"
                className={styles.input}
                required
              />
              <input
                onChange={onChangeHandler}
                value={formData.country}
                type="text"
                name="country"
                placeholder="Country Name"
                className={styles.input}
                required
              />
            </div>
          </div>

          {/* Right Side: Cart + Payment */}
          <div className={styles.right}>
            <CartTotal />

            <h3 className={styles.paymentTitle}>
              Payment <span>Method</span>
            </h3>

            <div className={styles.paymentMethods}>
              <div
                className={`${styles.methodCard} ${
                  method === "stripe" ? styles.active : ""
                }`}
                onClick={() => setMethos("stripe")}
              >
                Stripe
              </div>
              <div
                className={`${styles.methodCard} ${
                  method === "cod" ? styles.active : ""
                }`}
                onClick={() => setMethos("cod")}
              >
                Cash On Delivery
              </div>
              <div
                className={`${styles.methodCard} ${
                  method === "esewa" ? styles.active : ""
                }`}
                onClick={() => setMethos("esewa")}
              >
                eSewa
              </div>
            </div>
          </div>
        </div>

        <div className={styles.buttonWrap}>
          <button type="submit" className={styles.submitBtn}>
            Place Order
          </button>
        </div>
      </form>
    </section>
  );
};

export default PlaceOrder;
