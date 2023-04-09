import Image from "next/image";
import styles from "./index.module.css";
import Link from "next/link";

export default function ProjectsContent() {
  const projects = [
    {
      title: "Turnkey",
      imgSrc: "/turnkey-img.png",
      description:
        "lorem10 a web applicationlorem10 a web applicationlorem10 a web application that allows users to cr",
      serviceType: "turnkey",
    },
    {
      title: "Turnkey2",
      imgSrc: "/turnkey-img.png",
      description: "lorem10 a web application that allows users to cr",
      serviceType: "turnkey",
    },
    {
      title: "Turnkey3",
      imgSrc: "/turnkey-img.png",
      description: "lorem10 a web application that allows users to cr",
      serviceType: "turnkey",
    },
    {
      title: "Turnkey4",
      imgSrc: "/turnkey-img.png",
      description: "lorem10 a web application that allows users to cr",
      serviceType: "turnkey",
    },
    {
      title: "Turnkey5",
      imgSrc: "/turnkey-img.png",
      description:
        "lorem10 a web applicationweb applicationweb application that allows users to cr",
      serviceType: "turnkey",
    },
    {
      title: "Turnkey35",
      imgSrc: "/turnkey-img.png",
      description: "lorem10 a web application that allows users to cr",
      serviceType: "turnkey",
    },
  ];
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["row"]}>
        {projects.map((item, index) => (
          <div key={index} className={styles["col"]}>
            <Link href={`/projects/${index}`}>
              <Image
                src={item.imgSrc}
                alt={item.title}
                width={400}
                height={400}
                className={styles["image"]}
              />
              <div className={styles["project-label"]}>{item.title}</div>
              <span className={styles["service-type-tag"]}>
                {item.serviceType}
              </span>
              <div className={styles["project-description"]}>
                {item.description}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
