import React, { useReducer } from "react";
import "./styles/App.sass";
import { MemoizedHeader } from "./components/header";
import Search from "./components/search";
import BeerList from "./components/beerList";

//TODO: When searching, take input string, add _ between each space that the user entered

type InitialState = {};
const initialState: InitialState = {};
type Actions = {
  type: ActionTypes.SearchBeers;
  payload: string;
};
enum ActionTypes {
  SearchBeers,
}

const reducer = (state = initialState, action: Actions): InitialState => {
  switch (action.type) {
    case ActionTypes.SearchBeers:
      return {
        ...state,
      };
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const searchForBeer = (searchTerm: string) => {};

  return (
    <div className="app">
      <section className={"app__inner"}>
        <MemoizedHeader />
        <Search searchFn={searchForBeer} />
        <BeerList />
      </section>
    </div>
  );
};

export default App;
