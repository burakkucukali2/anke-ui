import styles from "./index.module.css";
import HeaderTop from "@/components/Header/HeaderTop";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { withTranslation } from "next-i18next";

function Header() {
  const { t } = useTranslation("common");
  const navItems = [
    {
      title: t("common:home"),
      link: "/",
    },
    {
      title: t("common:about_nav"),
      link: "/about",
    },
    {
      title: t("common:projects"),
      link: "/projects",
    },
    {
      title: t("common:machine_palette"),
      link: "/machine-palette",
    },
  ];

  const renderNavItems = () => {
    return (
      <nav className={`${styles["nav"]}`}>
        <ul className={styles["nav-list"]}>
          {navItems.map((item, index) => (
            <li key={index} className={styles["nav-item"]}>
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
