import React from "react";
import styles from "./Features.module.css"; // path as needed

import filter from "../assets/features/filter.png";
import rating from "../assets/features/rating.png";
import wishlist from "../assets/features/wishlist.png";
import secure from "../assets/features/secure.png";

const Features = () => {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.featuresGrid}>
        {/* Feature 1 */}
        <div className={styles.featureCard}>
          <img src={filter} alt="filter icon" className={styles.featureIcon} />
          <div>
            <h5 className={styles.featureTitle}>Advanced Search and Filters</h5>
            <hr className={styles.featureLine} />
          </div>
          <p className={styles.featureText}>
            Quickly locate your desired books using powerful filters and
            advanced search capabilities.
          </p>
        </div>

        {/* Feature 2 */}
        <div className={styles.featureCard}>
          <img src={rating} alt="rating icon" className={styles.featureIcon} />
          <div>
            <h5 className={styles.featureTitle}>User Reviews and Ratings</h5>
            <hr className={styles.featureLine} />
          </div>
          <p className={styles.featureText}>
            Read what others think! Ratings and reviews help you pick the
            perfect read.
          </p>
        </div>

        {/* Feature 3 */}
        <div className={styles.featureCard}>
          <img
            src={wishlist}
            alt="wishlist icon"
            className={styles.featureIcon}
          />
          <div>
            <h5 className={styles.featureTitle}>Wishlist and Favorites</h5>
            <hr className={styles.featureLine} />
          </div>
          <p className={styles.featureText}>
            Save books for later or mark your favorites to revisit anytime.
          </p>
        </div>

        {/* Feature 4 */}
        <div className={styles.featureCard}>
          <img src={secure} alt="secure icon" className={styles.featureIcon} />
          <div>
            <h5 className={styles.featureTitle}>Secure Online Payments</h5>
            <hr className={styles.featureLine} />
          </div>
          <p className={styles.featureText}>
            Shop with confidence with our fast and secure payment options.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
