import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useTranslation } from "next-i18next";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/swiper-bundle.min.css";
import styles from "./index.module.css";
import Link from "next/link";

function Services({ serviceData }) {
  const { t } = useTranslation("common");

  return (
    <div className={styles["service-container"]}>
      <IoIosArrowBack
        className={styles["navigation"]}
        id="navigation-prev"
        size={40}
      />
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        loop
        navigation={{
          prevEl: "#navigation-prev",
          nextEl: "#navigation-next",
        }}
        className={styles["service-swiper"]}
      >
        {serviceData.map((item) => (
          <SwiperSlide key={item.name}>
            <div className={styles["slide-content"]}>
              <div className="slide-left">
                <div className={styles["slide-content-title"]}>
                  {t(`common:${item.name}`)}
                  <span className={styles["projects-title"]}>
                    {" "}
                    {t(`common:${item.suffix}`)}
                  </span>
                </div>
                <div className={styles["slide-content-description"]}>
                  {t(`common:${item.name}_description`)}
                </div>
                <div className={styles["slide-content-button"]}>
                  <Link
                    href={"/projects"}
                    className={styles["slide-content-link"]}
                  >
                    {t("common:view_projects")}
                    {" ->"}
                  </Link>
                </div>
              </div>
              <div className={`${styles["service-image"]} slide-right`}>
                <Image
                  src={item.imgSrc}
                  alt={item.name}
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <IoIosArrowForward
        className={styles["navigation"]}
        id="navigation-next"
        size={40}
      />
    </div>
  );
}

export default React.memo(Services);
