import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DynamicHead from "@/components/DynamicHead";

export default function ProjectDetail(props) {
  console.log(props.projectData.data.attributes);
  return (
    <div className="layout">
      <DynamicHead />
      <div>{props.projectData.data.attributes.name}</div>
      <div>{props.projectData.data.attributes.projectOwner}</div>
      <div>{props.projectData.data.attributes.projectFeature}</div>
      <div>{props.projectData.data.attributes.structureFeature}</div>
      <div>{props.projectData.data.attributes.moldArea}</div>
      <div>{props.projectData.data.attributes.location}</div>
      <br />
      <br />
      <div>boxes</div>
      <div>{props.projectData.data.attributes.totalArea}</div>
      <div>{props.projectData.data.attributes.ironAmount}</div>
      <div>{props.projectData.data.attributes.concreteAmount}</div>
      <div>{props.projectData.data.attributes.startDate}</div>
      <div>{props.projectData.data.attributes.endDate}</div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  console.log(ctx);
  const projectDetail = await fetch(
    `http://localhost:1337/api/projects/${ctx.params.projectId} `
  );
  const projectDetailData = await projectDetail.json();

  return {
    props: {
      projectData: projectDetailData,
      ...(await serverSideTranslations(ctx.locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
