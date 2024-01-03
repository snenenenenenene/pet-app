export type Pet = {
  id?: number;
  name: string;
  age: number;
  type: string;
  breed: string;
  description: string;
  images: string[];
  neutered?: boolean;
  organisation?: string;
  adopted?: boolean;
};
