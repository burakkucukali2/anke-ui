import styles from "./index.module.css";
import Image from "next/image";
import { useTranslation } from "next-i18next";

export default function BannerSection() {
  const { t } = useTranslation("common");

  return (
    <div className={styles["banner-section"]}>
      <div className={styles["banner-image-container"]}>
        <Image
          src="/large-banner.webp"
          alt="anke-banner"
          className={"image"}
          width={1920}
          height={500}
        />
        <div className={styles["banner-text-container"]}>
          <h1 className={`${styles["banner-text"]} slide-down`}>
            {t("banner-text")}
          </h1>
          <button className={styles["banner-contact-button"]}>
            {t("common:contact_us")}
          </button>
        </div>
      </div>
    </div>
  );
}
