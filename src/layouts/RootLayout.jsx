import React from "react";

import ReduxProvider from "@/redux/ReduxProvider";
import { montSerrat } from "@/styles/font";

export const metadata = {
  title: "",
  description: "",
  icons: {
    icon: "/favicon.ico",
  },
};

const RootLayout = ({ children }) => {
  return (
    <main className={montSerrat.className}>
      <ReduxProvider>{children}</ReduxProvider>
    </main>
  );
};

export default RootLayout;
