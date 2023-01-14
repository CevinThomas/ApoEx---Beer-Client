import axios from "axios";
import { normalizeBeer } from "../utils/functions/functions";

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

export type BeerResponse = {
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
  yeast?: string;
  food_pairing: string[];
  brewers_tips: string;
  contributed_by?: string;
};

export type BeerResults = {
  id: number;
  name: string;
  alcoholVolume: number;
  image: string;
  desc: string;
  foodPairing: string[];
};

export const getBeersBySearch = async (
  currentPage: number,
  searchTerm?: string
): Promise<BeerResults[]> => {
  const baseUrl = `${process.env.REACT_APP_BEER_BASE_API}/beers?per_page=10&page=${currentPage}`;
  const constructedUrl = searchTerm
    ? `${baseUrl}&beer_name=${searchTerm}`
    : baseUrl;

  const beersResponse = await axios.get(constructedUrl);

  return beersResponse.data.map(normalizeBeer);
};

export const getSingleBeerById = async (
  beerId: number
): Promise<BeerResults[]> => {
  const beerResponse = await axios.get(
    `https://api.punkapi.com/v2/beers/${beerId}`
  );

  return beerResponse.data.map(normalizeBeer);
};
