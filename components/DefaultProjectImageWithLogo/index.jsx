import React from "react";
import Image from "next/image";
import styles from "./index.module.css";
import useMediaQuery from "@/hooks/useMediaQuery";

function DefaultProjectImageWithLogo({ isLarge = false }) {
  const isMobile = useMediaQuery(768);

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
