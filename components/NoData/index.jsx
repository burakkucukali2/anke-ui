import styles from "./index.module.css";
import React from "react";
import { useTranslation } from "next-i18next";

function NoData() {
  const { t } = useTranslation("common");

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["no-data-text"]}>
        {t("common:no_projects_such_as")}
      </div>
    </div>
  );
}

export default React.memo(NoData);
