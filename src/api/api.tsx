import { BEER_BASE_URL } from "../env";
type Volumes = {
  value: number;
  unit: string;
};

type Methods = {
  temp: Volumes;
  duration: number;
};

type Ingredient = {
  name: string;
  amount: Volumes;
  add: string;
  attribute: string;
};

type BeerResponse = {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: Volumes;
  boil_volume: Volumes;
  method: {
    mash_temp: Methods[];
    fermentation: Omit<Methods, "duration">;
    twist: null;
  };
  ingredients: {
    malt: Omit<Ingredient, "add" | "attribute">[];
    hops: Ingredient[];
  };
  yeast: string;
  food_pairing: string[];
  brewers_tips: string;
};

export const getBeersBySearch = async (searchTerm: string) => {
  console.log("making request");
  const beersResponse = await fetch(`${BEER_BASE_URL}/beers`);
  console.log("response: ", beersResponse);
};
