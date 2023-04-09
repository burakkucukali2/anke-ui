import "@/styles/reset.css";
import "@/styles/globals.css";
import { Layout } from "@/components";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }) {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(MyApp);
