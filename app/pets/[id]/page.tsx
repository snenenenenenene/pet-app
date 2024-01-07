/* eslint-disable @next/next/no-img-element */
"use client";
import { Pet } from "@/app/constants/types";
import { fetchGetJSON } from "@/app/helpers/api_helpers";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Pets(context: any) {
  const [data, setData] = useState<Pet>();
  useEffect(() => {
    // set data to fetch from /api/pets
    const fetchData = async () => {
      const res = await fetchGetJSON(`/api/pets/${context.params.id}`);
      setData(res);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data ? (
    <div className="flex md:flex-row flex-col md:p-0 p-6">
      <section className="w-full md:w-1/2 md:m-8  flex flex-col gap-4">
        <h1 className="text-3xl font-bold underline">{data?.name}</h1>
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
