import React, { useContext, useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { LuSettings2 } from "react-icons/lu";
import { categories } from "../assets/data";
import styles from "./Shop.module.css";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import Item from "../components/Item";
import Footer from "../components/Footer";

const Shop = () => {
  const { books } = useContext(ShopContext);
  const [category, setCategory] = useState("");
  const [sortType, setSortType] = useState("relevant");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const applyFilters = () => {
    let filtered = [...books];

    if (search) {
      filtered = filtered.filter((book) =>
        book.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((book) => book.category === category);
    }

    return filtered;
  };

  const applySorting = (bookList) => {
    switch (sortType) {
      case "low":
        return bookList.sort((a, b) => a.price - b.price);
      case "high":
        return bookList.sort((a, b) => b.price - a.price);
      default:
        return bookList;
    }
  };

  useEffect(() => {
    const filtered = applyFilters();
    const sorted = applySorting(filtered);
    setFilteredBooks(sorted);
    setCurrentPage(1);
  }, [books, search, category, sortType]);

  const getPaginatedBooks = () => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBooks.slice(start, start + itemsPerPage);
  };

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  return (
    <section className={styles.shopSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title title1="Our" title2="Book List" />
        </div>

        <div className={styles.searchBar}>
          <RiSearch2Line className={styles.icon} />
          <input
            type="text"
            placeholder="Search here..."
            className={styles.input}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <LuSettings2 className={styles.icon} />
        </div>

        <div className={styles.categories}>
          {categories.map((cat) => (
            <label key={cat.name} className={styles.categoryItem}>
              <input
                type="radio"
                name="category"
                value={cat.name}
                checked={category === cat.name}
                onChange={(e) => setCategory(e.target.value)}
                hidden
              />
              <div
                className={`${styles.categoryCard} ${
                  category === cat.name ? styles.selected : ""
                }`}
              >
                <img src={cat.image} alt={cat.name} />
                <span>{cat.name}</span>
              </div>
            </label>
          ))}
        </div>

        <div className={styles.sortBar}>
          <span>Sort by:</span>
          <select
            onChange={(e) => setSortType(e.target.value)}
            className={styles.sortSelect}
            value={sortType}
          >
            <option value="relevant">Relevant</option>
            <option value="low">Price Low to High</option>
            <option value="high">Price High to Low</option>
          </select>
        </div>

        <div className={styles.bookGrid}>
          {getPaginatedBooks().length > 0 ? (
            getPaginatedBooks().map((book) => (
              <Item key={book._id} book={book} />
            ))
          ) : (
            <p className={styles.noBooks}>
              No books found for selected category.
            </p>
          )}
        </div>

        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? styles.activePage : ""}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Shop;
