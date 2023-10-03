import Head from "next/head";

const MetaInfo = ({ children }) => {
  return (
    <>
      <Head>
        <title>Unispace</title>
        <link
          rel="icon"
          type="image/x-icon"
          href="/assets/images/unispace-logo.svg"
        />
      </Head>

      {children}
    </>
  );
};

export default MetaInfo;
