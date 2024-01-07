import { PB } from "@/app/store/store";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);

  const page = params.get("page") as string;
  const type = params.get("type") as string;

  const allPets = await PB.collection("pets").getList(parseInt(page) || 1, 12, {
    filter: type && 'type = "' + type + '"',
  });
  return new Response(JSON.stringify(allPets));
}
