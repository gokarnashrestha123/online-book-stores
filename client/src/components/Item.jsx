import React, { useContext } from "react";
import { TbShoppingBagPlus } from "react-icons/tb";
import styles from "./Item.module.css";
import { ShopContext } from "../context/ShopContext";

const Item = ({ book, index = 0 }) => {
  const { currency, addToCart } = useContext(ShopContext);
  return (
    <div className={styles.card} style={{ animationDelay: `${index * 0.1}s` }}>
      <div className={styles.imageWrapper}>
        <img src={book.image} alt="book" className={styles.bookImage} />
      </div>

      <div className={styles.content}>
        <div className={styles.topRow}>
          <h4 className={styles.title}>{book.name}</h4>
          <span onClick={() => addToCart(book._id)} className={styles.icon}>
            <TbShoppingBagPlus />
          </span>
        </div>

        <div className={styles.meta}>
          <p className={styles.category}>{book.category}</p>
          <h5 className={styles.price}>
            {currency}
            {book.price}.00
          </h5>
        </div>

        <p className={styles.description}>{book.description}</p>
      </div>
    </div>
  );
};

export default Item;
