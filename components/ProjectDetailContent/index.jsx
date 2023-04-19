import React from "react";
import { Spinner } from "@/components";
import Image from "next/image";
import { splitDateAccordingToMinusSignAndReverse } from "@/utils/helper";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import styles from "./index.module.css";

function ProjectDetailContent({ projectData, isLoading }) {
  const { t } = useTranslation("common");
  const { locale } = useRouter();

  const projectInfoValueAndKey = [
    {
      key: "projectOwner",
      value: projectData?.data?.attributes?.projectOwner,
    },
    {
      key: "projectFeature",
      value: projectData?.data?.attributes[locale]?.projectFeature,
    },
    {
      key: "structureFeature",
      value: projectData?.data?.attributes[locale]?.structureFeature,
    },
    {
      key: "moldArea",
      value: projectData?.data?.attributes?.moldArea,
    },
    {
      key: "location",
      value: projectData?.data?.attributes?.location,
    },
    {
      key: "startDate",
      value: splitDateAccordingToMinusSignAndReverse(
        projectData?.data?.attributes?.startDate ?? ""
      ),
    },
    {
      key: "endDate",
      value: splitDateAccordingToMinusSignAndReverse(
        projectData?.data?.attributes?.endDate
      ),
    },
  ];

  const projectBoxValueAndKey = [
    {
      key: "totalArea",
      value: projectData?.data?.attributes?.totalArea,
      unit: "㎡",
    },
    {
      key: "ironAmount",
      value: projectData?.data?.attributes?.ironAmount,
      unit: "Ton",
    },
    {
      key: "concreteAmount",
      value: projectData?.data?.attributes?.concreteAmount,
      unit: "m³",
    },
  ];

  const renderProjectInfos = () => {
    return (
      <div className={styles["info"]}>
        {projectInfoValueAndKey.map((item) => (
          <div key={item.key}>
            {item.value && (
              <div key={item.key} className={styles["info-item"]}>
                <span className={styles["info-item-key"]}>{t(item.key)}:</span>
                <span className={styles["info-item-value"]}>{item.value}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

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

  return (
    <>
      {isLoading ? (
        <div className={styles["spinner-wrapper"]}>
          {" "}
          <Spinner isLoading={isLoading} />
        </div>
      ) : (
        <div className={styles["wrapper"]}>
          <Image
            src={projectData?.data?.attributes.imgUrl ?? "/turnkey-img.png"}
            alt={projectData?.data?.attributes[locale].name}
            width={710}
            height={400}
            className={styles["image"]}
          />
          <div className={styles["info-section"]}>
            <div className={styles["title"]}>
              {projectData?.data?.attributes[locale].name}
            </div>
            {renderProjectInfos()}
            {renderBoxes()}
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectDetailContent;
