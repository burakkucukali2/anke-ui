import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DynamicHead from "@/components/DynamicHead";
import { useTranslation } from "next-i18next";
import { ProjectDetailContent } from "@/components";
import { getProjectById } from "@/utils/dataFetch";

export default function ProjectDetail({ projectData }) {
  const { t } = useTranslation("common");

  return (
    <>
      <DynamicHead
        title={`${projectData?.projectDetails.data.name} | ${t(
          "common:general_title"
        )}`}
        description={projectData?.projectDetails.data.name}
      />
      <div className="layout">
        <ProjectDetailContent projectData={projectData.projectDetails.data} />
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const projectId = ctx.params.projectId;

  const projectData = await getProjectById(projectId);

  return {
    props: {
      projectData,
      ...(await serverSideTranslations(ctx.locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
