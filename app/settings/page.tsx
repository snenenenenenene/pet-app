"use client";
import { useState } from "react";
import { fetchGetJSON } from "../helpers/api_helpers";
import { PB } from "../store/store";

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const fetchAllPets = () => {
    setLoading(true);
    fetchGetJSON("/api/setup")
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <section className="flex mb-4">
        <picture className="w-20 h-20 rounded-full bg-light-primary"></picture>
        <span className="flex flex-col justify-center ml-4">
          <h1 className="text-3xl font-bold">{PB.authStore?.model?.name}</h1>
          <p className="">{PB.authStore?.model?.email}</p>
        </span>
      </section>
      {PB.authStore?.model?.role === "admin" && (
        <>
          {loading && (
            <picture className="h-40 w-40">
              <img src="/cat-loading.png" alt="Loading" />
            </picture>
          )}
          <button
            onClick={() => {
              fetchAllPets();
            }}
            className="w-full h-10 rounded-3xl shadow bg-light-primary text-light-dark font-bold hover:bg-light-primary-2 px-4 py-2"
          >
            {loading ? "Fetching..." : "Fetch all pets"}
          </button>
        </>
      )}
    </div>
  );
}
