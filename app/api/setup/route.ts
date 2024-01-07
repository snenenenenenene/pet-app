import { Pet } from "@/app/constants/types";
import { scrapeAce, scrapeNalasFriends } from "@/app/data/scrapeNalasfriends";
import { PB } from "@/app/lib/connect";

// eslint-disable-next-line no-unused-vars
export async function GET(_request: Request) {
  const random = Math.floor(Math.random() * 1000000);
  // await PB.collection("pets")
  //   .getFullList()
  //   .then((pets) => {
  //     pets.forEach(async (pet: any) => {
  //       await PB.collection("pets")
  //         .delete(pet.id)
  //         .then(() => {
  //           console.log("deleted pet", pet.name);
  //         })
  //         .catch((err) => {
  //           console.error("Something went wrong with retrieving the pets", err);
  //         });
  //     });
  //   })
  //   .catch((err) => {
  //     console.error("Something went wrong with retrieving the pets", err);
  //   });

  const nalaCats = await scrapeNalasFriends({
    type: "cat",
    random: random,
  });
  const nalaDogs = await scrapeNalasFriends({ type: "dog", random: random });
  const aceCats = await scrapeAce({
    type: "cat",
    random: random,
  });
  const aceDogs = await scrapeAce({
    type: "dog",
    random: random,
  });

  const pets = await [...nalaCats, ...nalaDogs, ...aceCats, ...aceDogs];
  console.log(pets.length);

  pets.forEach(async (pet: Pet) => {
    await PB.collection("pets")
      .create(pet)
      .catch((err) => {
        console.error(
          "Something went wrong with retrieving the pets from ACE",
          err
        );
      });
  });

  return new Response(
    JSON.stringify({
      message: "Successfully retrieved all pets",
    })
  );
}
