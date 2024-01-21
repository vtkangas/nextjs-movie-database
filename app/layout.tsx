import "./globals.css";
import { Bebas_Neue, Montserrat } from "@next/font/google";
import Providers from "./Providers";
import Drawer from "@/components/Drawer";

const headerFont = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-header",
});

const mainFont = Montserrat({
  weight: "300",
  subsets: ["latin"],
  variable: "--font-main",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body
        className={`${mainFont.variable} ${headerFont.variable} bg-violet-50 text-slate-600 dark:bg-black dark:text-white`}
      >
        <Providers>
          <Drawer> {children} </Drawer>
        </Providers>
      </body>
    </html>
  );
}
