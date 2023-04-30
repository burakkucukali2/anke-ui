import React from "react";
import Link from "next/link";
import { generateLowercaseAndKebabCasePath } from "@/utils/helper";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import styles from "./index.module.css";

const DEFAULT_PROJECT_IMAGE = "/default-anke.webp";

function ProjectItem({ projects }) {
  const { t } = useTranslation("common");

  return (
    <>
      {projects.map((item) => (
        <div key={item.id} className={styles["col"]}>
          <Link
            className={styles["anchor-class"]}
            href={`/projects/${generateLowercaseAndKebabCasePath(item.name)}/${
              item._id
            }`}
          >
            <Image
              src={item.thumbnailImgSrc || DEFAULT_PROJECT_IMAGE}
              alt={item.name}
              width={350}
              height={450}
              className={styles["image"]}
            />
            <div className={styles["tags-wrapper"]}>
              {item.categories.map((category, index) => (
                <div key={index} className={styles["service-type-tag"]}>
                  {t(`common:${category.name}`)}
                </div>
              ))}
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
