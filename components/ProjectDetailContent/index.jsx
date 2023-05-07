import React from "react";
import { DefaultProjectImageWithLogo, Spinner } from "@/components";
import Image from "next/image";
import { convertISODateToReadableDate } from "@/utils/helper";
import { useTranslation } from "next-i18next";
import styles from "./index.module.css";

function ProjectDetailContent({ projectData, isLoading }) {
  const { t } = useTranslation("common");

  const projectInfoValueAndKey = [
    {
      key: "projectOwner",
      value: projectData?.projectOwner,
    },
    {
      key: "location",
      value: projectData?.location,
    },
    {
      key: "startDate",
      value: convertISODateToReadableDate(projectData?.startDate),
    },
    {
      key: "endDate",
      value: convertISODateToReadableDate(projectData?.endDate),
    },
    {
      key: "projectFeature",
      value: projectData?.projectFeature,
    },
    {
      key: "structureFeature",
      value: projectData?.structureFeature,
    },
  ];

  const renderProjectInfos = () => {
    return (
      <div className={styles["info-section"]}>
        <div className={styles["title"]}>{projectData?.name}</div>
        <div className={styles["info"]}>
          {projectInfoValueAndKey.map((item) => (
            <div key={item.key}>
              {item.value && (
                <div key={item.key} className={styles["info-item"]}>
                  <span className={styles["info-item-key"]}>
                    {t(item.key)}:
                  </span>
                  <span className={styles["info-item-value"]}>
                    {item.value} {item.key === "moldArea" ? "㎡" : ""}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {isLoading ? (
        <div className={styles["spinner-wrapper"]}>
          <Spinner isLoading={isLoading} />
        </div>
      ) : (
        <div className={styles["wrapper"]}>
          {projectData?.largeImgSrc ? (
            <Image
              src={projectData?.largeImgSrc}
              alt={projectData?.name}
              width={710}
              height={400}
              className={styles["image"]}
            />
          ) : (
            <DefaultProjectImageWithLogo isLarge={true} />
          )}
          {renderProjectInfos()}
        </div>
      )}
    </>
  );
}

export default React.memo(ProjectDetailContent);
