export type Pet = {
  id?: number;
  name: string;
  age: number;
  type: string;
  random: number;
  breed: string;
  description: string;
  images: string[];
  country: string;
  neutered?: boolean;
  organisation?: string;
  adopted?: boolean;
};
