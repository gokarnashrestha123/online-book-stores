import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import Item from "./Item";
import styles from "./PopularBooks.module.css"; // import CSS module

const PopularBooks = () => {
  const { books } = useContext(ShopContext);
  const [popularBooks, setPopularBooks] = useState([]);

  useEffect(() => {
    const data = books.filter((item) => item.popular);
    setPopularBooks(data.slice(0, 6));
  }, [books]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Title title1={"Popular"} title2={"Books"} />
        <div className={styles.gridContainer}>
          {popularBooks.map((book) => (
            <Item key={book._id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBooks;
