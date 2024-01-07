import { Pet } from "@/app/constants/types";
import { scrapeAce, scrapeNalasFriends } from "@/app/data/scrapeNalasfriends";
import { PB } from "@/app/lib/connect";

export async function GET(request: Request) {
  await PB.collection("pets")
    .getFullList({
      "--sort": "name",
    })
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
        .create(pet)
        .then((resp) => {
          console.log(resp);
          console.log("created pet", pet.name);
        })
        .catch((err) => {
          console.error(
            "Something went wrong with retrieving the pets from Nala's Friends",
            err
          );
        });
    });
  });

  //     await PB.collection("pets")
  //       .getOne(pet.name)
  //       .catch(async () => {

  //       });
  //   });
  // });

  await scrapeAce().then((pets) => {
    pets.forEach(async (pet: Pet) => {
      await PB.collection("pets")
        .getOne(pet.name)
        .catch(async () => {
          await PB.collection("pets")
            .create(pet)
            .then((resp) => {
              console.log("created pet", pet.name);
            })
            .catch((err) => {
              console.error(
                "Something went wrong with retrieving the pets from Ace",
                err
              );
            });
        });
    });
  });

  return new Response(
    JSON.stringify({
      message: "Successfully retrieved all pets",
    })
  );
}
