import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

import Item from "./Item";

import styles from "./NewArrivals.module.css";
import { ShopContext } from "../context/ShopContext";

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const { books } = useContext(ShopContext);

  useEffect(() => {
    const data = books.slice(0, 10);
    setNewArrivals(data.reverse());
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.titleContainer}>
        <Title title1={"New"} title2={"Arrivals"} />
      </div>

      <Swiper
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          400: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination, Autoplay]}
        className={styles.swiper}
      >
        {newArrivals.map((book) => (
          <SwiperSlide key={book._id} className={styles.swiperSlide}>
            <Item book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default NewArrivals;
