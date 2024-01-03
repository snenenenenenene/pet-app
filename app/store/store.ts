import PocketBase from "pocketbase";
import { create } from "zustand";
import { Pet } from "../constants/types";
export interface PetStore {
  allPets: any[];
  fetchAllPets: () => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  setAllPets: (pets: Pet[]) => void;
}
export const PB = new PocketBase("http://127.0.0.1:8090/");
PB.autoCancellation(false);

export const usePetStore = create<PetStore>((set) => ({
  allPets: [],
  fetchAllPets: async () => {
    const allPets = await PB.collection("pets").getFullList();
    set({ allPets });
  },
  setAllPets: (pets: Pet[]) => set({ allPets: pets }),
}));
