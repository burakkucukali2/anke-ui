import styles from "./index.module.css";
import HeaderTop from "@/components/Header/HeaderTop";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { withTranslation } from "next-i18next";
import { useRouter } from "next/router";

function Header() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const navItems = [
    {
      title: t("common:home"),
      link: "/",
    },
    {
      title: t("common:about_nav"),
      link: "/hakkimizda",
    },
    {
      title: t("common:projects"),
      link: "/projelerimiz",
    },
  ];

  const renderNavItems = () => {
    return (
      <nav className={`${styles["nav"]}`}>
        <ul className={styles["nav-list"]}>
          {navItems.map((item, index) => (
            <li
              key={index}
              className={
                styles[
                  `nav-item${router.pathname === item.link ? "--active" : ""}`
                ]
              }
            >
              <Link href={item.link} className={styles["nav-link"]}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  return (
    <header>
      <HeaderTop />
      {renderNavItems()}
    </header>
  );
}

export default withTranslation("common")(Header);
