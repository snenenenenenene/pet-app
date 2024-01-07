"use client";
import Link from "next/link";
import { useState } from "react";
import { PB } from "../store/store";

export default function AccountPopUp({ className }: { className?: string }) {
  const [showAccountPopUp, setShowAccountPopUp] = useState(false);
  return (
    <button
      onClick={() => setShowAccountPopUp(!showAccountPopUp)}
      className={`md:flex hidden ${className}`}
    >
      <picture className="relative">
        <section className="w-10 h-10 bg-light-primary rounded-full" />
        {showAccountPopUp && (
          <div className="absolute top-14 right-0 w-40 h-fit bg-light-light-2 shadow-2xl rounded-lg flex flex-col p-4">
            <Link
              href={"/settings"}
              className="flex flex-col gap-2 hover:bg-light-primary-2 rounded-3xl justify-center items-center p-4"
            >
              <picture className="relative" />
              <p className="text-light-dark font-bold">
                {PB.authStore?.model?.name}
              </p>
              <p className="text-light-dark font-bold"></p>
            </Link>
            <div className="flex flex-col gap-2">
              <button className="w-full h-10 rounded-3xl shadow bg-light-light text-light-dark font-bold hover:bg-light-primary-2">
                Favourites
              </button>
              <button
                onClick={() => {
                  PB.authStore?.clear();
                  setShowAccountPopUp(false);
                }}
                className="w-full h-10 text-light-dark font-bold "
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </picture>
    </button>
  );
}
