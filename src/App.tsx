import React, { useReducer } from "react";
import "./styles/App.sass";
import { MemoizedHeader } from "./components/header";
import Search from "./components/search";
import BeerList from "./components/beerList";
import { BeerResults, getBeersBySearch } from "./api/api";

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
    };

enum ActionTypes {
  ToggleLoading,
  UpdateBeerResults,
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
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const searchForBeer = async (searchTerm: string) => {
    const beersResults = await getBeersBySearch(state.currentPage, searchTerm);
    console.log(beersResults);
    dispatch({
      type: ActionTypes.UpdateBeerResults,
      payload: beersResults,
    });
  };

  return (
    <div className="app">
      <section className={"app__inner"}>
        <MemoizedHeader />
        <section className={"test"}>
          <Search searchFn={searchForBeer} />
          <BeerList beerResults={state.beerResults} />
        </section>
      </section>
    </div>
  );
};

export default App;
