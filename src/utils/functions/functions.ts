import { BeerResponse } from "../../api/api";

export const normalizeBeer = (beer: BeerResponse) => ({
  id: beer.id,
  name: beer.name,
  alcoholVolume: beer.abv,
  image: beer.image_url,
  desc: beer.description,
});
