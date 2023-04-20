import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { BannerSection, Services } from "@/components";
import { getAllServices } from "@/utils/dataFetch";
import DynamicHead from "@/components/DynamicHead";

export default function Home({ serviceData }) {
  const { t } = useTranslation("common");

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <>
      <DynamicHead
        title={t("common:home_title")}
        description={t("home_description")}
      />
      <BannerSection scrollTo={scrollToBottom} />
      <Services serviceData={serviceData.services.data} />
    </>
  );
}

export async function getStaticProps({ locale }) {
  const serviceData = await getAllServices();

  return {
    props: {
      serviceData,
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
