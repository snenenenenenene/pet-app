import { Pet } from "@/app/constants/types";
import { scrapeAce, scrapeNalasFriends } from "@/app/data/scrapeNalasfriends";
import { PB } from "@/app/store/store";

export async function GET(request: Request) {
  await PB.collection("pets")
    .getFullList()
    .then((pets) => {
      pets.forEach(async (pet: any) => {
        await PB.collection("pets")
          .delete(pet.id)
          .then(() => {
            console.log("deleted pet", pet.name);
          })
          .catch((err) => {
            console.error("Something went wrong with retrieving the pets", err);
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

  return new Response("Done");
}
