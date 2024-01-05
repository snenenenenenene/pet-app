"use client";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import "./globals.css";
import { usePetStore } from "./store/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { fetchAllPets } = usePetStore((state) => state);

  useEffect(() => {
    fetchAllPets();
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="bg-light-light font-sniglet flex-col flex h-screen w-screen text-light-dark overflow-hidden">
          {/* <Navbar /> */}
          <div className="h-full w-full flex justify-center overflow-x-hidden">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
