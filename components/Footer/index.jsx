import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { AiFillInstagram, AiFillLinkedin, AiOutlineCopy } from "react-icons/ai";
import { CompanySection, Map } from "@/components";
import styles from "./index.module.css";
import useMediaQuery from "@/hooks/useMediaQuery";

function Footer() {
  const { t } = useTranslation("common");
  const isMobile = useMediaQuery(768);

  const contactInfo = [
    {
      title: t("common:address"),
      value: t("common:anke_address"),
    },
    {
      title: t("common:phone"),
      value: "+90 212 543 57 53",
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

  console.log("isMobile", isMobile);

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = (value) => {
    const noSpacesText = value.replace(/\s/g, "");
    navigator.clipboard.writeText(noSpacesText);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  const renderContactInfo = () => {
    return (
      <div className={styles["footer-contact"]}>
        {contactInfo.map((item, index) => (
          <div key={index} className={styles["footer-contact-info"]}>
            <span className={styles["footer-contact-label"]}>
              {item.title}:
            </span>
            <div className={styles["info-group"]}>
              <div>{item.value}</div>
              <div>
                {item.title !== t("common:address") && !isCopied && (
                  <AiOutlineCopy
                    size={isMobile ? 16 : 20}
                    className={styles["copy-icon"]}
                    onClick={() => handleCopyClick(item.value)}
                  />
                )}
                {isCopied && item.title !== t("common:address") && (
                  <span className={styles["clipboard-copy-success"]}>
                    {t("common:copied")}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
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
      <div className={styles["footer-body"]}>
        <div>
          {renderContactInfo()}
          {renderSocialMedia()}
        </div>
        <Map />
      </div>
      <CompanySection />
    </footer>
  );
}

export default React.memo(Footer);
