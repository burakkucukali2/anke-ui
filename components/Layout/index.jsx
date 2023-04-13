import React from "react";
import { Header, Footer } from "@/components";
import styles from "./index.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles["container"]}>
      <Header />
      <main className={styles["main"]}>{children}</main>
      <Footer />
    </div>
  );
}
