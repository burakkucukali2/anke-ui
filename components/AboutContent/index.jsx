import React from "react";
import { useTranslation } from "next-i18next";
import styles from "./index.module.css";

function AboutContent() {
  const { t } = useTranslation("common");

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["about_text_section"]}>
        <div className={`slide-down ${styles["about-slogan"]}`}>{`"${t(
          "common:about_slogan"
        )}"`}</div>
        <div className={styles["about-description"]}>
          {t("common:about_description")}
        </div>
      </div>
    </div>
  );
}

export default AboutContent;
