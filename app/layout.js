import { Jost, Plus_Jakarta_Sans, Mulish } from "next/font/google";
import "./globals.css";
import Providers from "./provider/providers";
import Header from "../components/header/Header";
import SmoothScroll from "../components/smoothScroll";
import Footer from "../components/footer/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});
const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
});
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export const metadata = {
  title: "Travel Hooks - Premium Travel & Umrah Packages",
  description: "Book 5-star Umrah experiences, dynamic holiday packages, and worldwide flights.",
};



import LayoutWrapper from "@/components/LayoutWrapper";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${mulish.variable} ${jost.variable}`}
      suppressHydrationWarning
    >
      <body
        className="bg-white dark:bg-[#01080C] text-slate-900 dark:text-white antialiased"
        suppressHydrationWarning
      >
        <Providers>
          <SmoothScroll>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}