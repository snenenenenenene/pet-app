"use client";
import { useState } from "react";
import { fetchGetJSON } from "../helpers/api_helpers";

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
      {loading && (
        <img src="/cat-loading.png" className="h-40 w-40" alt="Loading" />
      )}
      <button
        onClick={() => {
          fetchAllPets();
        }}
        className="w-full h-10 rounded-3xl shadow bg-light-primary text-light-dark font-bold hover:bg-light-primary-2 px-4 py-2"
      >
        {loading ? "Fetching..." : "Fetch all pets"}
      </button>
    </div>
  );
}
