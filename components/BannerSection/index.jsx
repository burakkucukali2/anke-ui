import React from "react";
import styles from "./index.module.css";
import Image from "next//image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/swiper-bundle.css";

import { useTranslation } from "next-i18next";

function BannerSection({ scrollTo }) {
  const { t } = useTranslation("common");

  const sliderLinks = [
    {
      id: 1,
      link: "/slider-1.webp",
    },
    {
      id: 2,
      link: "/slider-2.webp",
    },
    {
      id: 3,
      link: "/slider-3.webp",
    },
  ];

  const renderSlider = () => {
    return sliderLinks.map((item) => (
      <SwiperSlide key={item.id}>
        <div className={styles["image-container"]}>
          <Image
            src={item.link}
            alt="slider"
            layout="fill"
            className={styles["banner-image"]}
          />
          <div className={styles["dark-layer"]} />
        </div>
      </SwiperSlide>
    ));
  };

  return (
    <div className={styles["banner-section"]}>
      <div>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          loop
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
        >
          {renderSlider()}
        </Swiper>
        <div className={styles["banner-text-container"]}>
          <h1 className={`${styles["banner-text"]} slide-down`}>
            {t("banner-text")}
          </h1>
          <button
            onClick={scrollTo}
            className={styles["banner-contact-button"]}
          >
            {t("common:contact_us")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(BannerSection);
