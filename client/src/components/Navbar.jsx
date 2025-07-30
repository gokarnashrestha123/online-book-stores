import React from "react";
import { TbHomeFilled } from "react-icons/tb";
import { IoMailOpen, IoLibrary } from "react-icons/io5";
import { FaRegWindowClose } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = ({ containerStyles, toggleMenu, menuOpened }) => {
  const navItems = [
    { to: "/", label: "Home", icon: <TbHomeFilled /> },
    { to: "/shop", label: "Shop", icon: <IoLibrary /> },
    { to: "/contact", label: "Contact", icon: <IoMailOpen /> },
  ];

  return (
    <nav className={`${styles.navbar} ${containerStyles || ""}`}>
      {/* Mobile Header (Close Icon + Title) */}
      {menuOpened && (
        <div className={styles.mobileHeader}>
          <FaRegWindowClose onClick={toggleMenu} className={styles.closeIcon} />
          <Link to="/" className={styles.mobileTitle} onClick={toggleMenu}>
            <h4>Book Store</h4>
          </Link>
        </div>
      )}

      {/* Nav Links */}
      {navItems.map(({ to, label, icon }) => (
        <div key={label} className={styles.navItem}>
          <NavLink
            to={to}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            onClick={toggleMenu}
          >
            <span className={styles.icon}>{icon}</span>
            <span className={styles.label}>{label}</span>
          </NavLink>
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
