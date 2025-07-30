import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import styles from "./CartTotal.module.css";

const CartTotal = () => {
  const { currency, getCartAmount, delivery_charges } = useContext(ShopContext);

  const subtotal = getCartAmount();
  const shipping = subtotal === 0 ? 0 : delivery_charges;
  const total = subtotal + shipping;

  return (
    <section className={styles.fullWidthSection}>
      <div className={styles.cartTotalContainer}>
        <Title title1={"Cart"} title2={"Total"} />

        <div className={styles.totalRow}>
          <h5>Subtotal:</h5>
          <p className={styles.amount}>
            {currency} {subtotal}.00
          </p>
        </div>
        <hr />

        <div className={styles.totalRow}>
          <h5>Shipping Fee:</h5>
          <p className={styles.amount}>
            {currency} {shipping}.00
          </p>
        </div>
        <hr />

        <div className={`${styles.totalRow} ${styles.finalTotal}`}>
          <h5>Total:</h5>
          <p className={styles.amount}>
            {currency} {subtotal === 0 ? "0.00" : total + ".00"}
          </p>
        </div>
        <hr />
      </div>
    </section>
  );
};

export default CartTotal;
