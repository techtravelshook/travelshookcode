"use client";

import { usePathname } from "next/navigation";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Header />}

      <main>{children}</main>

      {!isAdmin && <Footer />}
    </>
  );
}