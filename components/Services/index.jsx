import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useTranslation } from "next-i18next";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/swiper-bundle.min.css";
import styles from "./index.module.css";

export default function Services() {
  const { t } = useTranslation("common");

  const services = [
    {
      title: t("common:turnkey"),
      suffix: t("common:projects_title_as_service"),
      description: t("common:turnkey_description"),
      image: "/turnkey-img.png",
    },
    {
      title: t("common:flat_for"),
      suffix: t("common:construction"),
      description: t("common:flat_for_description"),
      image: "/turnkey-img.png",
    },
    {
      title: t("common:contracting"),
      suffix: t("common:services"),
      description: t("common:contracting_description"),
      image: "/turnkey-img.png",
    },
    {
      title: t("common:engineering"),
      suffix: t("common:services"),
      description: t("common:engineering_description"),
      image: "/turnkey-img.png",
    },
    {
      title: t("common:urban_transformation"),
      suffix: t("common:services"),
      description: t("common:urban_transformation_description"),
      image: "/turnkey-img.png",
    },
  ];

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
        {services.map((item) => (
          <SwiperSlide key={item.title}>
            <div className={styles["slide-content"]}>
              <div className="slide-left">
                <div className={styles["slide-content-title"]}>
                  {item.title}
                  <span className={styles["projects-title"]}>
                    {" "}
                    {item.suffix}
                  </span>
                </div>
                <div className={styles["slide-content-description"]}>
                  {item.description}
                </div>
                <div className={styles["slide-content-button"]}>
                  {t("common:view_projects")}
                  {" ->"}
                </div>
              </div>
              <div className={`${styles["service-image"]} slide-right`}>
                <Image
                  src={item.image}
                  alt="Turnkey Project"
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
