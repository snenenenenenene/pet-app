import PocketBase from "pocketbase";

export const PB = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
PB.autoCancellation(false);
