import React from "react";
import { useTranslation } from "next-i18next";
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { CompanySection } from "@/components";
import styles from "./index.module.css";

function Footer() {
  const { t } = useTranslation("common");

  const contactInfo = [
    {
      title: t("common:address"),
      value: t("common:anke_address"),
    },
    {
      title: t("common:phone"),
      value: "+902125435753",
    },
  ];

  const socialMedia = [
    {
      icon: <AiFillInstagram size={30} className={styles["social-icon"]} />,
      link: process.env.NEXT_PUBLIC_OWN_INSTAGRAM_URL,
    },
    {
      icon: <AiFillLinkedin size={30} className={styles["social-icon"]} />,
      link: process.env.NEXT_PUBLIC_OWN_LINKEDIN_URL,
    },
  ];

  const renderContactInfo = () => {
    return contactInfo.map((item, index) => (
      <div key={index} className={styles["footer-contact-info"]}>
        <span className={styles["footer-contact-label"]}>{item.title}: </span>
        <span>{item.value}</span>
      </div>
    ));
  };

  const renderSocialMedia = () => {
    return (
      <div className={styles["footer-social"]}>
        {socialMedia.map((item, index) => (
          <div key={index}>
            <a
              href={item.link}
              target="_blank"
              className={styles["footer-social-item"]}
            >
              {item.icon}
            </a>
          </div>
        ))}
      </div>
    );
  };

  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer-title"]}>{t("common:head_office")}</div>
      <div>
        {renderContactInfo()}
        {renderSocialMedia()}
      </div>
      <CompanySection />
    </footer>
  );
}

export default React.memo(Footer);
