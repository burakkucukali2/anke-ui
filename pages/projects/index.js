import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DynamicHead from "@/components/DynamicHead";
import { useTranslation } from "next-i18next";
import { ProjectsContent } from "@/components";

export default function Projects() {
  const { t } = useTranslation("common");

  return (
    <>
      <DynamicHead
        title={t("common:projects_title")}
        description={t("home_description")}
      />
      <div className="layout">
        <ProjectsContent />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
