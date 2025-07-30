import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { TbTrash } from "react-icons/tb";
import { FaMinus, FaPlus } from "react-icons/fa";
import CartTotal from "../components/CartTotal";
import styles from "./Cart.module.css";
const Cart = () => {
  const {
    books,
    navigate,
    currency,
    cartItems,
    getCartAmount,
    updateQuantity,
  } = useContext(ShopContext);
  return (
    <section className={styles.cartSection}>
      <div className={styles.cartContainer}>
        <Title title1={"Cart"} title2={"List"} />

        <div className={styles.cartItems}>
          {books.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id} className={styles.cartItem}>
                  <img
                    src={item.image}
                    alt="itemImg"
                    className={styles.cartItemImage}
                  />

                  <div className={styles.cartItemDetails}>
                    <h5>{item.name}</h5>
                    <div className={styles.cartItemInfo}>
                      <p>{item.category}</p>
                      <div className={styles.cartQuantity}>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, cartItems[item._id] - 1)
                          }
                        >
                          <FaMinus />
                        </button>
                        <p>{cartItems[item._id]}</p>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, cartItems[item._id] + 1)
                          }
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                    <h4 className={styles.cartPrice}>
                      {currency}
                      {item.price * cartItems[item._id]}
                    </h4>
                    <TbTrash
                      onClick={() => updateQuantity(item._id, 0)}
                      className={styles.trashIcon}
                    />
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        <div className={styles.cartSummary}>
          <CartTotal />
          <button
            onClick={() => navigate("/place-order")}
            className={styles.checkoutButton}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
