import React from "react";
import Link from "next/link";
import { convertToKebabCaseTextWithoutSpecialChars } from "@/utils/helper";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { DefaultProjectImageWithLogo } from "@/components";
import styles from "./index.module.css";

function ProjectItem({ projects }) {
  const { t } = useTranslation("common");

  return (
    <>
      {projects.map((item) => (
        <div key={item.id} className={styles["col"]}>
          <Link
            className={styles["anchor-class"]}
            href={`/projeler/${convertToKebabCaseTextWithoutSpecialChars(
              item.name
            )}/${item._id}`}
          >
            {item.thumbnailImgSrc ? (
              <Image
                src={item.thumbnailImgSrc}
                alt={item.name}
                width={350}
                height={450}
                className={styles["image"]}
              />
            ) : (
              <DefaultProjectImageWithLogo />
            )}

            <div className={styles["tags-wrapper"]}>
              <div className={styles["service-type-tag"]}>
                {t(`common:${item.categories[0].name}`)}
              </div>
            </div>
            <div className={styles["project-label"]}>{item.name}</div>
            <div className={styles["project-description"]}>
              <span>{item.location}</span>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}

export default React.memo(ProjectItem);
