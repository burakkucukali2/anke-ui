import styles from "./index.module.css";
import Image from "next/image";
import { useTranslation } from "next-i18next";

export default function BannerSection({ scrollTo }) {
  const { t } = useTranslation("common");

  return (
    <div className={styles["banner-section"]}>
      <div className={styles["banner-image-container"]}>
        <Image
          src="https://res.cloudinary.com/drjnu4wfu/image/upload/v1681754719/large-building-site-1_f8iuiq.webp"
          alt="anke-banner"
          className={styles["banner-image"]}
          width={1920}
          height={500}
        />
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
