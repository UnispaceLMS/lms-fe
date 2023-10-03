import Head from "next/head";
import { assetPrefix } from "@/constants";

const MetaInfo = ({ children }) => {
  return (
    <>
      <Head>
        <title>Unispace</title>
        <link
          rel="icon"
          type="image/x-icon"
          href={assetPrefix + "/assets/images/unispace-logo.svg"}
        />
      </Head>

      {children}
    </>
  );
};

export default MetaInfo;
