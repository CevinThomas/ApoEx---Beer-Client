import { BeerResponse } from "../../api/api";

export const normalizeBeer = (beer: BeerResponse) => ({
  id: beer.id,
  name: beer.name,
  alcoholVolume: beer.abv,
  image: beer.image_url ?? null,
  desc: beer.description,
  foodPairing: beer.food_pairing,
});

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
