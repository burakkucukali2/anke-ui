import Head from "next/head";

export default function DynamicHead({ title, description, children }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/anke-mini-icon.png" />
    </Head>
  );
}
