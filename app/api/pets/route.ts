import { Pet } from "@/app/constants/types";
import { scrapeNalasFriends } from "@/app/data/scrapeNalasfriends";
import { PB } from "@/app/store/store";
const getNewPets = false;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const page = params.get("page") as string;

  if (getNewPets) {
    await scrapeNalasFriends().then((pets) => {
      pets.forEach(async (pet: Pet) => {
        await PB.collection("pets")
          .getOne(pet.name)
          .catch(async () => {
            await PB.collection("pets")
              .create(pet)
              .catch((err) => {
                console.error(
                  "Something went wrong with retrieving the pets",
                  err
                );
              });
          });
      });
    });
  }
  const allPets = await PB.collection("pets").getList(parseInt(page) || 1, 15);
  return new Response(JSON.stringify(allPets));
}
