import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { BannerSection, Services } from "@/components";
import DynamicHead from "@/components/DynamicHead";

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <>
      <DynamicHead
        title={t("common:home_title")}
        description={t("home_description")}
      />
      <BannerSection />
      <Services />
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
