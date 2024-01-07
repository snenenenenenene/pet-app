"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import AccountPopUp from "../components/accountPopUp";
import { Pet } from "../constants/types";
import { fetchGetJSON } from "../helpers/api_helpers";
import { PB } from "../store/store";

export default function Favourites() {
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

  useEffect(() => {
    const favouritesIDs = PB.authStore?.model?.favourites;

    // fetch all pets with the IDs in favouritesIDs
    const fetchData = async () => {
      setLoading(true);
      const res = await fetchGetJSON(
        `/api/pets?page=${page}&ids=${favouritesIDs}`
      );
      setData(res);
      setLoading(false);
    };

    router.push(
      process.env.NEXT_PUBLIC_URL +
        "/favourites?" +
        createQueryString("page", page.toString())
    );

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="flex py-4 md:py-8 w-full h-full">
      <section className="flex w-full h-full overflow-y-scroll flex-col">
        <AccountPopUp />
        <div className="flex flex-col">
          {data.items && data.items.length > 0 ? (
            <div className="grid h-full w-full xl:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-8 gap-4 md:p-8 p-4">
              {data.items.map((pet) => (
                <Link
                  href={`/pets/${pet.id}`}
                  key={pet.id}
                  className="flex shadow-xl flex-col hover:scale-110 hover:z-50 hover:bg-light-primary md:p-8 p-2 rounded-lg transition-all duration-150 border-2 border-red-800"
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
              <picture>
                <img
                  src="/cat-loading.png"
                  className="object-contain w-1/2"
                  alt="Loading"
                />
              </picture>
              <h1 className="text-3xl font-bold">Loading pets...</h1>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <picture>
                <img
                  src="/no-pets.svg"
                  className="object-contain w-1/3"
                  alt="No pets found"
                />
              </picture>
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
