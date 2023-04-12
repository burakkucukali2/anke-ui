import Image from "next/image";
import styles from "./index.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { generateLowercaseAndKebabCasePath } from "@/utils/helper";
import { useTranslation } from "next-i18next";

const SERVICES_IDS = {
  all: 0,
  turnkey: 1,
  contracting: 2,
  exchangeForFloor: 3,
  ongoing: 5,
  completed: 6,
  upcoming: 7,
};

const PATH_ACCORDING_TO_SERVICE = {
  en: {
    turnkey: "turnkey",
    contracting: "contracting",
    exchangeForFloor: "exchange-for-floor",
    ongoing: "ongoing",
    completed: "completed",
    upcoming: "upcoming",
  },
  tr: {
    turnkey: "anahtar-teslim-projeler",
    contracting: "taahhüt-hizmeti-projeler",
    exchangeForFloor: "kat-karsiligi-projeler",
    ongoing: "devam-eden-projeler",
    completed: "tamamlanan-projeler",
    upcoming: "başlanacak-projeler",
  },
};

const PAGE_SIZE = 4;
const INITIAL_PAGE = 1;

export default function ProjectsContent() {
  const { t } = useTranslation("common");
  const locale = useRouter().locale;

  const [page, setPage] = useState(INITIAL_PAGE);
  const [selectedService, setSelectedService] = useState("all");
  const [projects, setProjects] = useState([]);

  const fetchAllProjects = async () => {
    const url = `http://localhost:1337/api/projects?populate=*`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application2/json",
      },
    });
    const json = await response.json();
    setProjects(json.data);
  };

  const fetchProjectsByService = async (service) => {
    const url = `http://localhost:1337/api/categories/${SERVICES_IDS[service]}?populate=projects`;
    const response = await fetch(url);
    const json = await response.json();
    setProjects(json?.data?.attributes.projects.data);
  };

  const handleServiceSelect = (e) => {
    const service = e.target.value;
    setSelectedService(service);
  };

  useEffect(() => {
    if (selectedService && selectedService !== "all") {
      fetchProjectsByService(selectedService);
    } else {
      fetchAllProjects();
    }
  }, [selectedService]);

  return (
    <>
      <div className={styles["selectbox-wrapper"]}>
        <select
          value={selectedService}
          onChange={handleServiceSelect}
          className={styles["selectbox"]}
        >
          {Object.keys(SERVICES_IDS).map((service) => (
            <option key={service} value={service}>
              {t(`common:${service}_projects`)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles["row"]}>
        {projects.map((item, index) => (
          <div key={item.id} className={styles["col"]}>
            <Link
              className={styles["anchor-class"]}
              href={`/projects/${
                PATH_ACCORDING_TO_SERVICE[locale][item.attributes.type]
              }/${generateLowercaseAndKebabCasePath(
                item.attributes[locale].name
              )}`}
            >
              <div>
                <Image
                  src={"/turnkey-img.png"}
                  alt={item.attributes.type}
                  width={350}
                  height={350}
                  className={styles["image"]}
                />
              </div>
              <div className={styles["tags-wrapper"]}>
                {item.attributes?.categories?.data.map((category) => (
                  <div key={category} className={styles["service-type-tag"]}>
                    {t(`common:${category.attributes.name}`)}
                  </div>
                ))}
              </div>
              <div className={styles["project-label"]}>
                {item.attributes[locale].name}
              </div>
              <div className={styles["project-description"]}>
                {item.attributes.projectFeature}
                <span>{item.attributes.location}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
