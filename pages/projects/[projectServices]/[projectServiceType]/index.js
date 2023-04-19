import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DynamicHead from "@/components/DynamicHead";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProjectDetail() {
  const router = useRouter();

  return (
    <div className="layout">
      <DynamicHead />
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
