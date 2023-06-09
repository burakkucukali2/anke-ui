import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DynamicHead from "@/components/DynamicHead";

export default function ProjectDetail() {
  return (
    <div className="layout">
      <DynamicHead />
    </div>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
