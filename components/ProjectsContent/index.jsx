import React from "react";
import Image from "next/image";
import styles from "./index.module.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { generateLowercaseAndKebabCasePath } from "@/utils/helper";
import { useTranslation } from "next-i18next";
import { Spinner, NoData } from "@/components";
import {
  getAllProjects,
  getProjectsByCategoryId,
  getAllCategories,
} from "@/utils/dataFetch";

const PAGE_SIZE = 12;
const INITIAL_PAGE = 1;
const INITIAL_TOTAL_PAGE_COUNT = 0;
const ALL_PROJECTS_CATEGORY_ID = "6441a923f9e38780f7e7ad7f";
const DEFAULT_PROJECT_IMAGE = "/default-anke.webp";

function ProjectsContent() {
  const { t } = useTranslation("common");

  const totalPageCount = useRef(INITIAL_TOTAL_PAGE_COUNT);

  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    ALL_PROJECTS_CATEGORY_ID
  );
  const [page, setPage] = useState(INITIAL_PAGE);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const resetParameters = () => {
    setPage(INITIAL_PAGE);
    totalPageCount.current = INITIAL_TOTAL_PAGE_COUNT;
    setProjects([]);
  };

  const fetchAllProjects = async (page) => {
    const response = await getAllProjects(page, PAGE_SIZE);
    setIsLoading(false);
    setIsLoadingMore(false);
    setProjects((prevProjects) => [...prevProjects, ...response.data.projects]);
    totalPageCount.current = response.data.totalPages;
  };

  const fetchProjectsByCategory = async (categoryId, page) => {
    const response = await getProjectsByCategoryId(categoryId, page, PAGE_SIZE);
    setIsLoading(false);
    setIsLoadingMore(false);
    setProjects((prevProjects) => [...prevProjects, ...response.data.projects]);
    totalPageCount.current = response.data.totalPages;
  };

  const fetchAllCategories = async () => {
    const response = await getAllCategories();
    setCategories(response.categories.data);
  };

  const handlePageChange = () => {
    setPage((prevPage) => prevPage + 1);
    setIsLoadingMore(true);
    console.log("page", page);
  };

  const handleServiceCategory = (e) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId);
    categoryId !== selectedCategoryId && resetParameters();
    setIsLoading(true);
  };

  const renderSelectBox = () => {
    return (
      <div className={styles["selectbox-wrapper"]}>
        <select
          value={selectedCategoryId}
          onChange={handleServiceCategory}
          className={styles["selectbox"]}
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {t(`common:${category.name}_projects`)}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const renderProjects = () => {
    return (
      <div className={styles["row"]}>
        {projects.map((item) => (
          <div key={item.id} className={styles["col"]}>
            <Link
              className={styles["anchor-class"]}
              href={`/projects/${generateLowercaseAndKebabCasePath(
                item.name
              )}/${item._id}`}
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
      </div>
    );
  };

  const renderLoadMoreButton = () => {
    return (
      <>
        {totalPageCount.current !== page && projects.length > 0 && (
          <button
            onClick={handlePageChange}
            className={styles["load-more-button"]}
          >
            {isLoadingMore ? (
              <Spinner
                isLoading={isLoadingMore}
                overlayClassName={styles["loading-overlay"]}
                spinnerClassName={styles["spinner"]}
              />
            ) : (
              t("common:load_more")
            )}
          </button>
        )}
      </>
    );
  };

  useEffect(() => {
    selectedCategoryId === ALL_PROJECTS_CATEGORY_ID
      ? fetchAllProjects(page)
      : fetchProjectsByCategory(selectedCategoryId, page);
  }, [selectedCategoryId, page]);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <div className={styles["wrapper"]}>
      {renderSelectBox()}
      {isLoading ? (
        <Spinner isLoading={isLoading} />
      ) : (
        <div className={styles["content-section"]}>
          {projects.length > 0 ? renderProjects() : <NoData />}
          {renderLoadMoreButton()}
        </div>
      )}
    </div>
  );
}

export default React.memo(ProjectsContent);
