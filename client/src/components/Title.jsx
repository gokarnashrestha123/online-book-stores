import React from "react";
import styles from "./Title.module.css"; // adjust path as needed

const Title = ({ title1, title2 }) => {
  return (
    <div className={styles.titleContainer}>
      <h2 className={styles.title}>
        {title1}
        <span className={styles.highlight}>{title2}</span>
      </h2>
      <p className={styles.subtext}>
        From timeless classics to modern masterpieces, find the <br />
        perfect read for every moment
      </p>
    </div>
  );
};

export default Title;
