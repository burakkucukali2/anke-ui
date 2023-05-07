import React, { useState } from "react";
import { DefaultProjectImageWithLogo, Spinner } from "@/components";
import Image from "next/image";
import { convertISODateToReadableDate } from "@/utils/helper";
import { useTranslation } from "next-i18next";
import { IoIosArrowDropdown } from "react-icons/io";
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

  const projectBoxValueAndKey = [
    {
      key: "totalArea",
      value: projectData?.totalArea,
      unit: "㎡",
    },
    {
      key: "ironAmount",
      value: projectData?.ironAmount,
      unit: "Ton",
    },
    {
      key: "concreteAmount",
      value: projectData?.concreteAmount,
      unit: "m³",
    },
  ];

  const [isRenderedBoxes, setIsRenderedBoxes] = useState(false);

  const renderBoxes = () => {
    return (
      <div className={styles["box-group"]}>
        {projectBoxValueAndKey.map((item) => (
          <div key={item.key}>
            {item.value && (
              <div key={item.key} className={styles["box"]}>
                <div className={styles["box-value"]}>
                  <div className={styles["box-value-text"]}>{item.value}</div>
                  <div className={styles["box-value-unit"]}>{item.unit}</div>
                </div>
                <div className={styles["box-title"]}>
                  {t(`common:${item.key}`)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

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
        <span
          onClick={() => setIsRenderedBoxes((prevState) => !prevState)}
          className={styles["show-box-details-text"]}
        >
          <IoIosArrowDropdown
            size={15}
            className={
              styles[`detail-arrow-icon${isRenderedBoxes ? "-up" : ""}`]
            }
          />
          Yapı Detaylarını {isRenderedBoxes ? "Kapat" : "Görüntüle"}{" "}
        </span>
        {isRenderedBoxes && renderBoxes()}
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
