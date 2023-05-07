import React from "react";
import Image from "next/image";
import styles from "./index.module.css";
import { AiOutlineMail, AiFillPhone } from "react-icons/ai";
import { useTranslation } from "next-i18next";
import Link from "next/link";

const MY_EMAIL_ADDRESS = "info@ankeyapi.com";
const MY_PHONE_NUMBER = "+90 212 543 57 53";

function HeaderTop() {
  const { t } = useTranslation("common");

  return (
    <div className="layout">
      <div className={`${styles["header"]}`}>
        <Link href={"/"}>
          <Image
            src="/anke-logo.png"
            alt="Logo"
            width={200}
            height={120}
            className={styles["header-logo"]}
          />
        </Link>
        <div className={styles["contact-info-wrapper"]}>
          <div className={styles["contact-info"]}>
            <AiOutlineMail size={24} className={styles["contact-icon"]} />
            <div>
              <div className={styles["contact-title"]}>
                {t("common:email_address")}
              </div>
              <div className={styles["contact-value"]}>{MY_EMAIL_ADDRESS}</div>
            </div>
          </div>
          <div className={styles["vertical-divider"]} />
          <div className={styles["contact-info"]}>
            <AiFillPhone size={24} className={styles["contact-icon"]} />
            <div>
              <div className={styles["contact-title"]}>
                {t("common:call_us")}
              </div>
              <div className={styles["contact-value"]}>{MY_PHONE_NUMBER}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(HeaderTop);
