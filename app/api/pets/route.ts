import { Pet } from "@/app/constants/types";
import { scrapeAce, scrapeNalasFriends } from "@/app/data/scrapeNalasfriends";
import { PB } from "@/app/store/store";
const getNewPets = false;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const page = params.get("page") as string;

  if (getNewPets) {
    await PB.collection("pets")
      .getFullList()
      .then((pets) => {
        pets.forEach(async (pet: Pet) => {
          await PB.collection("pets")
            .delete(pet.id)
            .then(() => {
              console.log("deleted pet", pet.name);
            })
            .catch((err) => {
              console.error(
                "Something went wrong with retrieving the pets",
                err
              );
            });
        });
      });

    await scrapeNalasFriends().then((pets) => {
      pets.forEach(async (pet: Pet) => {
        await PB.collection("pets")
          .getOne(pet.name)
          .catch(async () => {
            await PB.collection("pets")
              .create(pet)
              .catch((err) => {
                console.error(
                  "Something went wrong with retrieving the pets from Nala's Friends",
                  err
                );
              });
          });
      });
    });

    await scrapeAce().then((pets) => {
      pets.forEach(async (pet: Pet) => {
        await PB.collection("pets")
          .getOne(pet.name)
          .catch(async () => {
            await PB.collection("pets")
              .create(pet)
              .catch((err) => {
                console.error(
                  "Something went wrong with retrieving the pets from Ace",
                  err
                );
              });
          });
      });
    });
  }
  const allPets = await PB.collection("pets").getList(parseInt(page) || 1, 12);
  return new Response(JSON.stringify(allPets));
}
