/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdNotifications, MdSearch } from "react-icons/md";
import AccountPopUp from "./components/accountPopUp";
import { Pet } from "./constants/types";
import { fetchGetJSON } from "./helpers/api_helpers";
export default function Home() {
  const [name, setName] = useState("");
  const [data, setData] = useState<{
    items: Pet[];
    perPage: number;
    page: number;
    totalItems: number;
    totalPages: number;
  }>({
    items: [],
    perPage: 0,
    page: 0,
    totalItems: 0,
    totalPages: 0,
  });

  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(
    searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const router = useRouter();
  const [type, setType] = useState<Array<"dog" | "cat">>([]);

  useEffect(() => {
    router.push(
      process.env.NEXT_PUBLIC_URL +
        "?" +
        createQueryString("page", page.toString())
    );
    const fetchData = async () => {
      const formattedType = type.length === 0 || type.length === 2 ? "" : type;
      setLoading(true);
      const res = await fetchGetJSON(
        `/api/pets?page=${page}${type && `&type=${formattedType}`}`
      );
      setData(res);
      setLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, type, name]);

  const types = data.items
    .map((pet) => pet.type)
    .filter((type, i, arr) => arr.indexOf(type) === i);

  const [selectedType, setSelectedType] = useState(types[0]);

  const races = data.items
    .filter((pet) => pet.type === selectedType)
    .map((pet) => pet.breed)
    .filter((race, i, arr) => arr.indexOf(race) === i);

  const [selectedRace, setSelectedRace] = useState(races[0]);

  const [showFilters, setShowFilters] = useState(false);
  return (
    <div className="flex py-4 md:py-8 w-full h-full">
      <section className="flex w-full h-full overflow-y-scroll flex-col">
        <div className="flex flex-col md:hidden px-6 gap-2 pb-2">
          <section className="flex justify-between">
            <div className="flex justify-center items-center gap-2">
              <AccountPopUp />
              <span>
                <h1 className="text-md font-bold text-xl">Location</h1>
                <p className="text-sm">Antwerp, Belgium</p>
              </span>
            </div>
            <div className="flex">
              <button className="rounded-3xl bg-light-primary-2 text-3xl h-12 p-2">
                <MdNotifications />
              </button>
              <button className="rounded-3xl bg-light-primary-2 text-3xl h-12 p-2">
                <MdSearch />
              </button>
            </div>
          </section>
          <p>Categories</p>
        </div>
        <div className="w-full flex md:gap-x-10 gap-x-2 px-6 md:px-10">
          <section className="relative">
            <button
              onClick={() => {
                setShowFilters(!showFilters);
              }}
              className="rounded-3xl bg-light-primary-2 px-4 py-2 w-24"
            >
              Filters
            </button>
            {showFilters && (
              <section className="w-fit mb-10 bg-light-light-2 shadow-2xl h-fit absolute top-12 left-0 rounded-lg py-10 ml-8 flex flex-col px-6 gap-2">
                <section className="flex flex-col gap-2 w-56">
                  <h2 className="text-lg font-bold">Breed</h2>
                  <select
                    onChange={(e) => {
                      setSelectedRace(e.target.value);
                    }}
                    className="text-light-dark bg-light-light  rounded-md px-4 h-8 w-full"
                  >
                    <option value="all" defaultChecked>
                      All
                    </option>
                    {races.map((race) => (
                      <option key={race} value={race}>
                        {race}
                      </option>
                    ))}
                  </select>
                </section>
                <section>
                  <h2 className="text-lg font-bold">Organisation</h2>
                  <select className="text-light-dark bg-light-light  rounded-md px-4 h-8 w-full">
                    <option value="all" defaultChecked>
                      All
                    </option>
                    {data.items.map((pet) => (
                      <option key={pet.organisation} value={pet.organisation}>
                        {pet.organisation}
                      </option>
                    ))}
                  </select>
                </section>
              </section>
            )}
          </section>
          <section>
            <button
              onClick={() => {
                // add type to array if not already in array, else remove it
                if (type.includes("cat")) {
                  setType(type.filter((t) => t !== "cat"));
                } else {
                  setType([...type, "cat"]);
                }
              }}
              className={`${
                type.includes("cat") ? "bg-light-primary" : "bg-light-primary-2"
              } rounded-3xl flex px-4 py-2 w-24 justify-between`}
            >
              <img src="/cat.svg" alt="Logo" className="object-cover w-6 h-6" />
              Cats
            </button>
          </section>
          <section>
            <button
              onClick={() => {
                if (type.includes("dog")) {
                  setType(type.filter((t) => t !== "dog"));
                } else {
                  setType([...type, "dog"]);
                }
              }}
              className={`${
                type.includes("dog") ? "bg-light-primary" : "bg-light-primary-2"
              } rounded-3xl flex px-4 py-2 w-24 justify-between `}
            >
              <img src="/dog.svg" alt="Logo" className="object-cover w-6 h-6" />
              Dogs
            </button>
          </section>
          {/* <input
            className="mx-auto text-light-dark bg-light-light border-2 border-light-dark rounded-md px-4 h-8 w-1/3"
            placeholder="Search a name..."
            onChange={(e) => {
              setName(e.target.value);
            }}
          /> */}
          <AccountPopUp className="ml-auto" />
        </div>
        <div className="flex flex-col">
          {data.items && data.items.length > 0 ? (
            <div className="grid h-full w-full xl:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-8 gap-4 md:p-8 p-4">
              {data.items.map((pet) => (
                <Link
                  href={`/pets/${pet.id}`}
                  key={pet.id}
                  className="flex shadow-xl flex-col hover:scale-110 hover:z-50 hover:bg-light-primary md:p-8 p-2 rounded-lg transition-all duration-150"
                >
                  <picture className="w-full h-40 sm:h-64 rounded-lg overflow-hidden">
                    <img
                      className="object-cover h-full flex w-full"
                      src={pet.images[0]}
                      alt={`Picture of ${pet.name}`}
                    />
                  </picture>
                  <div
                    justify-center
                    overflow-x-hidden
                    className="flex flex-col md:px-2 md:py-4 py-2"
                  >
                    <span className="flex justify-between">
                      <h2 className="md:text-2xl font-bold line-clamp-1">
                        {pet.name}
                      </h2>
                      <p>{pet.age}</p>
                    </span>
                    <p className="md:text-base text-sm line-clamp-1">
                      {pet.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : loading ? (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <img
                src="/cat-loading.png"
                className="object-contain w-1/2"
                alt="Loading"
              />
              <h1 className="text-3xl font-bold">Loading pets...</h1>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <img
                src="/no-pets.svg"
                className="object-contain w-1/3"
                alt="No pets found"
              />
              <h1 className="text-3xl font-bold">No pets found</h1>
            </div>
          )}
          <div className="flex my-8 justify-center w-full h-full">
            <div className="flex gap-4">
              {Array.from(Array(data.totalPages).keys()).map((p) => (
                <button
                  onClick={() => {
                    setPage(p + 1);
                  }}
                  key={p}
                  className={`${
                    page === p + 1 ? "bg-light-secondary" : "bg-light-primary"
                  } text-light-dark font-bold rounded-lg px-4 py-2`}
                >
                  {p + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
