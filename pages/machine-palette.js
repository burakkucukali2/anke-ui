import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DynamicHead from "@/components/DynamicHead";
import { useTranslation } from "next-i18next";

export default function MachinePalette() {
  const { t } = useTranslation("common");

  return (
    <>
      <DynamicHead
        title={t("common:machine_palette_title")}
        description={t("home_description")}
      />
      <h1>Machine Palette</h1>
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
