import React from "react";
import { FaSquarePlus } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { MdFactCheck } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/download.jpg";
import styles from "./Sidebar.module.css";

const Sidebar = ({ setToken }) => {
  return (
    <div className={styles.sidebar}>
      {/* Logo */}
      <Link to={"/"} className={styles.logoSection}>
        <img src={logo} alt="logo" className={styles.logo} />
        <span className={styles.brand}>Online Book Store</span>
      </Link>

      <div className={styles.menu}>
        <NavLink to={"/"} className={styles.menuItem}>
          <FaSquarePlus className={styles.icon} />
          <span>Add Item</span>
        </NavLink>

        <NavLink to={"/list"} className={styles.menuItem}>
          <FaListAlt className={styles.icon} />
          <span>List</span>
        </NavLink>

        <NavLink to={"/orders"} className={styles.menuItem}>
          <MdFactCheck className={styles.icon} />
          <span>Orders</span>
        </NavLink>
      </div>

      <div className={styles.logoutSection}>
        <button onClick={() => setToken("")} className={styles.logoutBtn}>
          <BiLogOut className={styles.icon} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
