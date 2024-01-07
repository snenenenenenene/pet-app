/* eslint-disable @next/next/no-img-element */
"use client";
import { Pet } from "@/app/constants/types";
import { fetchGetJSON } from "@/app/helpers/api_helpers";
import Link from "next/link";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

import { PB } from "@/app/lib/connect";
import { useEffect, useState } from "react";
export default function Pets(context: any) {
  const [data, setData] = useState<Pet>();

  const [favourited, setFavourited] = useState<boolean>(
    PB.authStore?.model?.favourites?.includes(context.params.id) ?? false
  );

  useEffect(() => {
    // set data to fetch from /api/pets
    const fetchData = async () => {
      const res = await fetchGetJSON(`/api/pets/${context.params.id}`);
      setData(res);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    async function checkFavourite() {
      if (favourited) {
        const prevFavourites = PB.authStore?.model?.favourites;
        PB.collection("users").update(PB.authStore?.model?.id as string, {
          favourites: [...prevFavourites, context.params.id],
        });
      } else {
        const prevFavourites = PB.authStore?.model?.favourites;

        if (Array.isArray(prevFavourites)) {
          const index = prevFavourites.indexOf(context.params.id);
          if (index !== -1) {
            prevFavourites.splice(index, 1);
            PB.collection("users").update(PB.authStore?.model?.id as string, {
              favourites: prevFavourites,
            });
          }
        }
      }
      await PB.collection("users").authRefresh();
    }
    checkFavourite();
  }, [favourited]);

  return data ? (
    <div className="flex md:flex-row flex-col md:p-0 p-6">
      <section className="w-full md:w-1/2 md:m-8  flex flex-col gap-4">
        <span className="flex w-full">
          <h1 className="text-3xl font-bold underline">{data?.name}</h1>
          <button onClick={() => setFavourited(!favourited)}>
            {favourited ? (
              <IoMdHeart className="text-3xl ml-auto" />
            ) : (
              <IoMdHeartEmpty className="text-3xl ml-auto" />
            )}
          </button>
        </span>
        <img
          className="w-full object-cover rounded-lg min-h-96"
          src={data?.images[0]}
          alt={`Picture of ${data?.name}`}
        />
        {data?.images.length > 1 && (
          <div className="gap-2 grid grid-cols-2">
            {data?.images.slice(1).map((image, index) => (
              <picture
                key={index}
                className="rounded-lg min-h-96 overflow-hidden"
              >
                <img
                  className="object-cover h-full w-full"
                  src={image}
                  alt={`Picture of ${data?.name}`}
                />
              </picture>
            ))}
          </div>
        )}
      </section>
      <section className="w-full md:w-1/2 ">
        <p
          dangerouslySetInnerHTML={{
            __html: data?.description
              .replace(/\n/g, "<br />")
              .replace(/<br \/><br \/>/g, "<br />")
              .replace(
                /https:\/\/youtube.com\/shorts\/([a-zA-Z0-9_-]{11})\?feature=share/g,
                '<iframe width="560" height="315" src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
              )
              .replace(
                /https:\/\/youtube.com\/shorts\/([a-zA-Z0-9_-]{11})/g,
                '<iframe width="560" height="315" src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
              )
              .replace(
                /https:\/\/youtu.be\/([a-zA-Z0-9_-]{11})/g,
                '<iframe width="560" height="315" src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
              ),
          }}
        ></p>{" "}
      </section>
    </div>
  ) : (
    <Link href="/">Not found</Link>
  );
}
