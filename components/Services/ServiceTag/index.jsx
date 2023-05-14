import React from "react";
import styles from "./index.module.css";
function ServiceTag({ serviceType, wrapperClassName }) {
  return (
    <div className={`${styles["service-type-tag"]} ${wrapperClassName}`}>
      {serviceType}
    </div>
  );
}

export default React.memo(ServiceTag);
