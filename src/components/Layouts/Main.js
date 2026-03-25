"use client";

import Header from "../organisms/Header";
import Footer from "../organisms/Footer";

export default function Main({ children }) {
  return (
    <>
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </>
  );
}
