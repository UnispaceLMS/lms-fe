import React from "react";

import HandleAuth from "./HandleAuth";

import { montSerrat } from "@/styles/font";
import ReduxProvider from "@redux/ReduxProvider";

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
      <ReduxProvider>
        <HandleAuth>{children}</HandleAuth>
      </ReduxProvider>
    </main>
  );
};

export default RootLayout;
