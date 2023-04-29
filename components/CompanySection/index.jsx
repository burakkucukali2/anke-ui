import React from "react";
import styles from "./index.module.css";
import { useTranslation } from "next-i18next";

function CompanySection() {
  const { t } = useTranslation("common");

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["company-section"]}>
        <div className={styles["company"]}>{t("common:company_name")}</div>
        <div className={styles["company-bottom-wrapper"]}>
          <div className={styles["line"]} />
          <div className={styles["company-bottom-text"]}>
            {t("common:group")}
          </div>
          <div className={styles["line"]} />
        </div>
      </div>
    </div>
  );
}

export default React.memo(CompanySection);
