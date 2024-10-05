import { Poppins, Playfair_Display } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "300",
});

export const playFairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});
