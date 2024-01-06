"use client";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./globals.css";
import { usePetStore } from "./store/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { fetchAllPets } = usePetStore((state) => state);
  const [showAccountPopUp, setShowAccountPopUp] = useState(false);
  useEffect(() => {
    fetchAllPets();
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="bg-light-light font-sniglet flex-col flex h-screen w-screen text-light-dark overflow-hidden">
          {/* <Navbar /> */}
          <button
            onClick={() => setShowAccountPopUp(!showAccountPopUp)}
            className="absolute top-0 py-8 right-4 w-20 h-10"
          >
            <picture className="relative">
              <img
                src="/user.svg"
                className="object-contain w-1/2"
                alt="Loading"
              />
              {showAccountPopUp && (
                <div className="absolute top-14 right-0 w-40 h-fit bg-light-light-2 shadow-2xl rounded-lg flex flex-col p-4">
                  <Link
                    href={"/settings"}
                    className="flex flex-col gap-2 hover:bg-light-primary-2 rounded-3xl justify-center items-center p-4"
                  >
                    <img
                      src="/user.svg"
                      className="object-contain w-1/2"
                      alt="Loading"
                    />
                    <p className="text-light-dark font-bold">John Doe</p>
                    <p className="text-light-dark font-bold"></p>
                  </Link>
                  <div className="flex flex-col gap-2">
                    <button className="w-full h-10 rounded-3xl shadow bg-light-light text-light-dark font-bold hover:bg-light-primary-2">
                      Favourites
                    </button>
                    <button className="w-full h-10 text-light-dark font-bold ">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </picture>
          </button>
          <div className="h-full w-full flex justify-center overflow-x-hidden">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
