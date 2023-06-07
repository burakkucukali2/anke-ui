import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DynamicHead from "@/components/DynamicHead";
import { useTranslation } from "next-i18next";
import { ProjectsContent } from "@/components";
import { getAllProjects } from "@/utils/dataFetch";

export default function Projects(props) {
  const { t } = useTranslation("common");

  return (
    <>
      <DynamicHead
        title={t("common:projects_title")}
        description={t("home_description")}
      />
      <div className="layout">
        <ProjectsContent
          projectsData={props.projectsData}
          totalPages={props.totalPages}
        />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const projectsData = await getAllProjects();

  return {
    props: {
      projectsData: projectsData.data.projects,
      totalPages: projectsData.data.totalPages,
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
