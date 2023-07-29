import { getAllServices } from "@/utils/dataFetch";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import DynamicHead from "@/components/DynamicHead";

const NotFoundPage = () => {
  const links = [
    {
      href: "/",
      label: "Anasayfa",
    },
    {
      href: "/hakkimizda",
      label: "Hakkımızda",
    },
    {
      href: "/projelerimiz",
      label: "Projelerimiz",
    },
  ];

  return (
    <>
      <DynamicHead title="Sayfa Bulunamadı" description="Sayfa Bulunamadı" />
      <div className="layout">
        <div className="links-wrapper">
          <h1 className="not-found-title">Oops! Sayfa Bulunamadı.</h1>
          <p className="not-found-text">
            Aradığınız sayfa mevcut değil. Lütfen diğer sayfalarımıza göz atın:
          </p>
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="not-found-link-item"
            >
              <span> {link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;

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
