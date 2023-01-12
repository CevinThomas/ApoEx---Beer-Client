console.log("HELLO");
if (process.env.REACT_APP_BEER_BASE_URL === undefined) {
  throw Error("Missing Beer API Base URL Env Variable");
}

export const BEER_BASE_URL = process.env.REACT_APP_BEER_BASE_URL;
