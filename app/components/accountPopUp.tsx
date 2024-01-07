"use client";
import Link from "next/link";
import { useState } from "react";

export default function AccountPopUp() {
  const [showAccountPopUp, setShowAccountPopUp] = useState(false);
  return (
    <button
      onClick={() => setShowAccountPopUp(!showAccountPopUp)}
      className="absolute top-0 py-8 right-4 w-20 h-10 md:flex hidden"
    >
      <picture className="relative">
        <img src="/user.svg" className="object-contain w-1/2" alt="Loading" />
        {showAccountPopUp && (
          <div className="absolute top-14 right-0 w-40 h-fit bg-light-light-2 shadow-2xl rounded-lg flex flex-col p-4">
            <Link
              href={"/settings"}
              className="flex flex-col gap-2 hover:bg-light-primary-2 rounded-3xl justify-center items-center p-4"
            >
              <picture className="relative">
                <img
                  src="/user.svg"
                  className="object-contain w-1/2"
                  alt="Loading"
                />
              </picture>
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
  );
}
