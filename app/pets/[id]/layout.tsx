/* eslint-disable no-unused-vars */
import { PB } from "@/app/lib/connect";
import type { Metadata, ResolvingMetadata } from "next";
import Page from "./page";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  const res = await PB.collection("pets").getOne(id);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: res.name,
    openGraph: {
      images: [res.images[0], ...previousImages],
    },
  };
}

export default Page;
