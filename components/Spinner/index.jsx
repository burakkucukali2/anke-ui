import React from "react";
import styles from "./index.module.css";

function Spinner({ overlayClassName, spinnerClassName, isLoading }) {
  if (!isLoading) return null;

  return (
    <div className={`${styles["loading-overlay"]} ${overlayClassName}`}>
      <div className={`${styles["spinner"]} ${spinnerClassName}`} />
    </div>
  );
}

export default React.memo(Spinner);
