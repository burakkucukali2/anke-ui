import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DynamicHead from "@/components/DynamicHead";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ProjectDetailContent } from "@/components";

export default function ProjectDetail() {
  const { t } = useTranslation("common");
  const { locale, query } = useRouter();
  const { projectId } = query;

  const [projectData, setProjectData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjectDetail = async () => {
    const res = await fetch(
      `https://anke-api.onrender.com/api/projects/${projectId}`
    );
    const data = await res.json();
    setProjectData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProjectDetail();
  }, []);

  return (
    <div className="layout">
      <DynamicHead
        title={`${projectData?.data?.attributes[locale].name} | ${t(
          "common:general_title"
        )}`}
        description={projectData?.data?.attributes[locale].name}
      />
      <ProjectDetailContent projectData={projectData} isLoading={isLoading} />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
