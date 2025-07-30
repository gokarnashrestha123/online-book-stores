import React from "react";
import { Link } from "react-router-dom";
import pencil from "../assets/pencil.png";
import bg from "../assets/bg.png";
import styles from "./Hero.module.css"; // ✅ Import CSS module

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* Left side */}
        <div className={styles.left}>
          <h1 className={styles.heading}>
            Discover{" "}
            <span className={styles.highlightAnimated}>
              <span className={styles.bounceB}>B</span>ooks
            </span>{" "}
            <img
              src={pencil}
              alt="pencilling"
              height={49}
              width={49}
              className={styles.pencil}
            />{" "}
            That Inspire Your World
          </h1>
          <p className={styles.paragraph}>
            A book is a collection of written, printed, or illustrated pages
            bound together to convey knowledge, stories, or information. For
            centuries, books have been a vital medium for preserving human
            thought, culture, and history. They can educate, entertain, inspire,
            or challenge readers, offering windows into other worlds, ideas, and
            experiences.
          </p>
          <div className={styles.btnContainer}>
            <Link to="/store" className={styles.exploreBtn}>
              Explore Now
            </Link>
          </div>
        </div>

        {/* Right side */}
        <div className={styles.right}>
          <img
            src={bg}
            alt="hero"
            height={588}
            width={588}
            className={styles.bgImage}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
