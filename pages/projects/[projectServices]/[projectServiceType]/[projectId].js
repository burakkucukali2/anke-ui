import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DynamicHead from "@/components/DynamicHead";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import { splitDateAccordingToMinusSignAndReverse } from "@/utils/helper";

export default function ProjectDetail(props) {
  const { t } = useTranslation("common");
  const locale = useRouter().locale;

  const projectInfoValueAndKey = [
    {
      key: "projectOwner",
      value: props.projectData.data.attributes.projectOwner,
    },
    {
      key: "projectFeature",
      value: props.projectData.data.attributes[locale].projectFeature,
    },
    {
      key: "structureFeature",
      value: props.projectData.data.attributes[locale].structureFeature,
    },
    {
      key: "moldArea",
      value: props.projectData.data.attributes.moldArea,
    },
    {
      key: "location",
      value: props.projectData.data.attributes.location,
    },
    {
      key: "startDate",
      value: splitDateAccordingToMinusSignAndReverse(
        props.projectData.data.attributes.startDate ?? ""
      ),
    },
    {
      key: "endDate",
      value: splitDateAccordingToMinusSignAndReverse(
        props.projectData.data.attributes.endDate
      ),
    },
  ];

  const projectBoxValueAndKey = [
    {
      key: "totalArea",
      value: props.projectData.data.attributes.totalArea,
      unit: "㎡",
    },
    {
      key: "ironAmount",
      value: props.projectData.data.attributes.ironAmount,
      unit: "Ton",
    },
    {
      key: "concreteAmount",
      value: props.projectData.data.attributes.concreteAmount,
      unit: "m³",
    },
  ];

  return (
    <div className="layout">
      <DynamicHead
        title={props.projectData.data.attributes[locale].name}
        description={props.projectData.data.attributes[locale].name}
      />
      <div className={styles["wrapper"]}>
        <Image
          src={"/turnkey-img.png"}
          alt={props.projectData.data.attributes[locale].name}
          width={550}
          height={550}
          loading="lazy"
          className={styles["image"]}
        />
        <div>
          <div className={styles["title"]}>
            {props.projectData.data.attributes[locale].name}
          </div>
          <div className={styles["info"]}>
            {projectInfoValueAndKey.map((item) => (
              <div key={item}>
                {item.value && (
                  <div key={item.key} className={styles["info-item"]}>
                    <span className={styles["info-item-key"]}>
                      {t(item.key)}:
                    </span>
                    <span className={styles["info-item-value"]}>
                      {item.value}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className={styles["box-group"]}>
            {projectBoxValueAndKey.map((item) => (
              <div key={item.key}>
                {item.value && (
                  <div key={item.key} className={styles["box"]}>
                    <div className={styles["box-value"]}>
                      <div className={styles["box-value-text"]}>
                        {item.value}
                      </div>
                      <div className={styles["box-value-unit"]}>
                        {item.unit}
                      </div>
                    </div>
                    <div className={styles["box-title"]}>
                      {t(`common:${item.key}`)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const projectDetail = await fetch(
    `http://localhost:1337/api/projects/${ctx.params.projectId} `
  );
  const projectDetailData = await projectDetail.json();

  return {
    props: {
      projectData: projectDetailData,
      ...(await serverSideTranslations(ctx.locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
