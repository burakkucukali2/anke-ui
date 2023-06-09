import React from "react";
import styles from "./index.module.css";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { Spinner, NoData, ProjectItem } from "@/components";
import { getAllProjects, getProjectsByCategoryId } from "@/utils/dataFetch";

const PAGE_SIZE = 12;
const INITIAL_PAGE = 1;
const INITIAL_TOTAL_PAGE_COUNT = 0;
const ALL_PROJECTS_CATEGORY_ID = "6441a923f9e38780f7e7ad7f";
const CATEGORIES = [
  {
    _id: "6441a923f9e38780f7e7ad7f",
    name: "all",
  },
  {
    _id: "64407e6ed784226d764ae20c",
    name: "completed",
  },
  {
    _id: "64407eb680ef9213960be3ff",
    name: "ongoing",
  },
  {
    _id: "64407ed955c84b663aa5a3f1",
    name: "upcoming",
  },
];

function ProjectsContent({ projectsData, totalPages }) {
  const { t } = useTranslation("common");

  const totalPageCount = useRef(totalPages);
  const buttonClickedRef = useRef(false);

  const [projects, setProjects] = useState(projectsData);
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
    buttonClickedRef.current = false;
    setIsLoading(false);
    setIsLoadingMore(false);
    setProjects((prevProjects) => [...prevProjects, ...response.data.projects]);
    totalPageCount.current = response.data.totalPages;
  };

  const fetchProjectsByCategory = async (categoryId, page) => {
    const response = await getProjectsByCategoryId(categoryId, page, PAGE_SIZE);
    buttonClickedRef.current = false;
    setIsLoading(false);
    setIsLoadingMore(false);
    setProjects((prevProjects) => [...prevProjects, ...response.data.projects]);
    totalPageCount.current = response.data.totalPages;
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setIsLoadingMore(true);
    buttonClickedRef.current = true;
    selectedCategoryId === ALL_PROJECTS_CATEGORY_ID
      ? fetchAllProjects(page + 1)
      : fetchProjectsByCategory(selectedCategoryId, page + 1);
  };

  const handleServiceCategory = (e) => {
    resetParameters();
    const categoryId = e.target.value;
    setIsLoading(true);
    setSelectedCategoryId(categoryId);
    categoryId === ALL_PROJECTS_CATEGORY_ID
      ? fetchAllProjects(INITIAL_PAGE)
      : fetchProjectsByCategory(categoryId, INITIAL_PAGE);
  };

  useEffect(() => {
    if (projects.length > 0) {
      setIsLoading(false);
    }
  }, [projectsData]);

  const renderCategorySelectBox = () => {
    return (
      <div className={styles["selectbox-wrapper"]}>
        <select
          value={selectedCategoryId}
          onChange={handleServiceCategory}
          className={styles["selectbox"]}
        >
          {CATEGORIES.map((category) => (
            <option key={category._id} value={category._id}>
              {`${t(`common:${category.name}_projects`)}imiz`}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const renderProjects = () => {
    return (
      <div className={styles["row"]}>
        <ProjectItem projects={projects} />
      </div>
    );
  };

  const renderLoadMoreButton = () => {
    return (
      <>
        {totalPageCount.current !== page && projects.length > 0 && (
          <button
            onClick={handleLoadMore}
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

  return (
    <div className={styles["wrapper"]}>
      {renderCategorySelectBox()}
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
