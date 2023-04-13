import React from "react";
import styles from "./index.module.css";

function Spinner(props) {
  if (!props.isLoading) return null;

  return (
    <div className={styles["loading-overlay"]}>
      <div className={styles["spinner"]} />
    </div>
  );
}

export default Spinner;
