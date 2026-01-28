import type { Metadata } from "next";
import "./globals.scss";
import { workSans, avenirNext } from "./fonts";
import { QueryProvider } from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Lendsqr Test",
  description: "",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${avenirNext.variable}`}
    >
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
