import { PB } from "@/app/store/store";

export async function GET(request: Request) {
  const id = request.url.split("/").at(-1);
  if (!id) {
    return new Response("Failed to fetch pet", { status: 404 });
  }
  const pet = await PB.collection("pets").getOne(id);
  return new Response(JSON.stringify(pet));
}
