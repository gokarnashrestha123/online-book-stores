import React from "react";
import Title from "./Title";
import { TbTruckReturn } from "react-icons/tb";
import about from "../assets/book_30.png";
import styles from "./About.module.css";

const About = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Left side */}
        <div className={styles.left}>
          <Title tittle1="Unveiling Our" title2="Store's Key Feature!" />
          <div className={styles.featureList}>
            {[
              {
                title: "Easy Returns Process",
                desc: "Return policies that are simple and customer-friendly, ensuring satisfaction every time.",
              },
              {
                title: "Secure Payment Options",
                desc: "Enjoy fast and secure payments with end-to-end encryption and multiple methods.",
              },
              {
                title: "Live Customer Support",
                desc: "Get real-time help from our friendly support team available 24/7.",
              },
            ].map((item, index) => (
              <div key={index} className={styles.featureItem}>
                <TbTruckReturn className={styles.icon} />
                <div className={styles.text}>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side (image with animation) */}
        <div className={styles.right}>
          <img
            src={about}
            alt="About Us"
            className={styles.image}
            width={244}
            height={244}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
