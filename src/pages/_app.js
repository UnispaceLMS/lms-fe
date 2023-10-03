import React from "react";

import MetaInfo from "@layouts/MetaInfo";
import RootLayout from "@layouts/RootLayout";

import "@styles/globals.css";

const App = ({ pageProps, Component }) => {
  return (
    <MetaInfo>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </MetaInfo>
  );
};

export default App;
