import React, { useEffect, useReducer, useRef } from "react";
import "./styles/App.sass";
import { MemoizedHeader } from "./components/header";
import Search from "./components/search";
import BeerList from "./components/beerList";
import { BeerResults, getBeersBySearch } from "./api/api";
import Pagination, { UpdatePageOptions } from "./components/pagination";

//TODO: When searching, take input string, add _ between each space that the user entered

type InitialState = {
  clientLoading: boolean;
  currentPage: number;
  beerResults: BeerResults[];
};
const initialState: InitialState = {
  clientLoading: false,
  currentPage: 1,
  beerResults: [],
};
type Actions =
  | {
      type: ActionTypes.ToggleLoading;
    }
  | {
      type: ActionTypes.UpdateBeerResults;
      payload: BeerResults[];
    }
  | {
      type: ActionTypes.UpdatePage;
      payload: UpdatePageOptions;
    };

enum ActionTypes {
  ToggleLoading,
  UpdateBeerResults,
  UpdatePage,
}

const reducer = (state = initialState, action: Actions): InitialState => {
  switch (action.type) {
    case ActionTypes.ToggleLoading:
      return {
        ...state,
        clientLoading: !state.clientLoading,
      };

    case ActionTypes.UpdateBeerResults:
      return {
        ...state,
        beerResults: action.payload,
      };
    case ActionTypes.UpdatePage:
      return {
        ...state,
        currentPage:
          action.payload === "incrementPage"
            ? state.currentPage++
            : state.currentPage--,
      };
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const searchInput = useRef<string>("");

  useEffect(() => {
    searchForBeer();
    return () => {};
  }, [state.currentPage]);

  const searchForBeer = async () => {
    const beersResults = await getBeersBySearch(
      state.currentPage,
      searchInput.current
    );
    dispatch({
      type: ActionTypes.UpdateBeerResults,
      payload: beersResults,
    });
  };

  const updatePage = (updateOption: UpdatePageOptions) => {
    dispatch({
      type: ActionTypes.UpdatePage,
      payload: updateOption,
    });
  };

  return (
    <div className="app">
      <section className={"app__inner"}>
        <MemoizedHeader />
        <section>
          <Search
            searchFn={searchForBeer}
            updateSearchText={(newText: string) =>
              (searchInput.current = newText)
            }
          />
          <BeerList beerResults={state.beerResults} />
          <Pagination
            currentPage={state.currentPage}
            updatePage={updatePage}
            amountOfResults={state.beerResults.length}
          />
        </section>
      </section>
    </div>
  );
};

export default App;
