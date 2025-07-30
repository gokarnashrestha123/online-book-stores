import React from "react";
import styles from "./Footer.module.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Left */}
        <div className={styles.footerSection}>
          <h2 className={styles.logo}>BookStore</h2>
          <p className={styles.about}>
            Dive into your next favorite book with us. Explore thousands of
            titles and genres.
          </p>
        </div>

        {/* Middle */}
        <div className={styles.footerSection}>
          <h4 className={styles.sectionTitle}>Quick Links</h4>
          <ul className={styles.links}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/store">Store</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Right */}
        <div className={styles.footerSection}>
          <h4 className={styles.sectionTitle}>Follow Us</h4>
          <div className={styles.social}>
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        © {new Date().getFullYear()} BookStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
