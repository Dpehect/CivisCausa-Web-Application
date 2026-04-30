import { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Civis Causa | İnsan Hakları Arşivi",
  description: "İnsan hakları ihlallerini veri ve tanıklıklarla belgeleyen editoryal arşiv.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        <Script src="https://d3js.org/d3.v7.min.js" strategy="beforeInteractive" />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
