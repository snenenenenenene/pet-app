"use client";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import { Navbar } from "./components/navbar";
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
        <main className="bg-light-light font-sniglet flex-col flex h-screen w-screen text-light-dark">
          <Navbar />
          <div className="flex justify-center overflow-x-hidden">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
