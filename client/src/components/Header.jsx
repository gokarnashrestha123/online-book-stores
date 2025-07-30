import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/download.jpg";
import Navbar from "./Navbar";
import { CgMenuLeft } from "react-icons/cg";
import { RiUserLine, RiShoppingBag4Line } from "react-icons/ri";
import { TbUserCircle } from "react-icons/tb";
import styles from "./Header.module.css";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { navigate, token, setToken, getCartCount, setCartIten } =
    useContext(ShopContext);

  const toggleMobileMenu = () => setShowMobileMenu((prev) => !prev);

  const handleScroll = () => {
    if (window.scrollY > 0) setShowMobileMenu(false);
    setIsSticky(window.scrollY > 30);
  };

  const handleLoginClick = () => {
    if (!token) navigate("/login");
  };

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartIten({});
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : ""}`}>
      {/* Logo */}
      <div className={styles.leftSection}>
        <Link to="/" className={styles.logoContainer}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <h4 className={styles.title}>Book Store</h4>
        </Link>
      </div>

      {/* Center Navbar */}
      <div
        className={`${styles.navbarWrapper} ${
          showMobileMenu ? styles.showMobile : ""
        }`}
      >
        <Navbar
          toggleMenu={toggleMobileMenu}
          menuOpened={showMobileMenu}
          containerStyles={styles.navContainer}
        />
      </div>

      {/* Right Actions */}
      <div className={styles.actions}>
        {/* Mobile menu icon */}
        <CgMenuLeft className={styles.menuIcon} onClick={toggleMobileMenu} />

        {/* Cart icon */}
        <Link to="/cart" className={styles.cartWrapper}>
          <RiShoppingBag4Line className={styles.icon} />
          <span className={styles.cartCount}>{getCartCount()}</span>
        </Link>

        {/* Login/User Icon */}
        <div className={styles.authSection}>
          {token ? (
            <div
              className={styles.userMenu}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <TbUserCircle className={styles.icon} />
              {showDropdown && (
                <ul className={styles.dropdown}>
                  <li>
                    <Link to="/orders" className={styles.dropdownItem}>
                      Orders
                    </Link>
                  </li>
                  <li className={styles.dropdownItem} onClick={handleLogout}>
                    Logout
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <button className={styles.loginButton} onClick={handleLoginClick}>
              Login <RiUserLine />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
