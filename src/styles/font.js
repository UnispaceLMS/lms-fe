import { Montserrat } from "next/font/google";

export const montSerrat = Montserrat({
  preload: true,
  display: "swap",
  subsets: ["latin"],
  fallback: ["sans-serif"],
});
