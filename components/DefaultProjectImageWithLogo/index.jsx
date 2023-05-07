import React from "react";
import Image from "next/image";
import styles from "./index.module.css";

function DefaultProjectImageWithLogo({ isLarge = false }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className={styles[`wrapper${isLarge ? "-large" : ""}`]}>
      <Image
        src="/anke-logo.png"
        alt="Anke Logo"
        width={isMobile ? 300 : 400}
        height={isMobile ? 150 : 240}
      />
    </div>
  );
}

export default React.memo(DefaultProjectImageWithLogo);
