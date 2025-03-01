"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar/Sidebar";
import { usePathname } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const hideSidebar = ["/auth/login", "/auth/signup"].includes(pathname);

  return (
    <html lang="en">
      <title>Nexsphere</title>
      <body
        className={`${inter.className} antialiased bg-primaryBg text-primaryText`}
      >
        {!hideSidebar && <Sidebar />}

        <main className={`flex-1 ${!hideSidebar ? "md:ml-64" : ""}`}>
          {children}
        </main>
      </body>
    </html>
  );
}
