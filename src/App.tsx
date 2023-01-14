import React, { useEffect, useReducer, useRef } from "react";
import "./styles/App.sass";
import { MemoizedHeader } from "./components/header";
import Search from "./components/search";
import BeerList from "./components/beerList";
import { BeerResults, getBeersBySearch } from "./api/api";
import Pagination, { UpdatePageOptions } from "./components/pagination";

type InitialState = {
  clientLoading: boolean;
  currentPage: number;
  beerResults: BeerResults[];
  networkError: boolean;
  noResults: boolean;
};
const initialState: InitialState = {
  clientLoading: false,
  currentPage: 1,
  beerResults: [],
  networkError: false,
  noResults: false,
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
    }
  | {
      type: ActionTypes.SearchForBeer;
      payload: BeerResults[];
    }
  | {
      type: ActionTypes.NetworkError;
    }
  | {
      type: ActionTypes.NoResultsOnSearch;
    };

enum ActionTypes {
  ToggleLoading,
  UpdateBeerResults,
  UpdatePage,
  SearchForBeer,
  NetworkError,
  NoResultsOnSearch,
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
        networkError: false,
        noResults: false,
      };
    case ActionTypes.UpdatePage:
      return {
        ...state,
        currentPage:
          action.payload === "incrementPage"
            ? state.currentPage++
            : state.currentPage--,
        networkError: false,
        noResults: false,
      };
    case ActionTypes.SearchForBeer:
      return {
        ...state,
        beerResults: action.payload,
        currentPage: 1,
        networkError: false,
        noResults: false,
      };
    case ActionTypes.NetworkError:
      return {
        ...state,
        networkError: true,
        clientLoading: false,
        beerResults: [],
        currentPage: 1,
      };
    case ActionTypes.NoResultsOnSearch:
      return {
        ...state,
        noResults: true,
        beerResults: [],
      };
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const searchInput = useRef<string>("");

  useEffect(() => {
    loadMoreBeer();
    return () => {};
  }, [state.currentPage]);

  const searchForBeer = async () => {
    try {
      const beerResults = await getBeersBySearch(1, searchInput.current);

      if (beerResults.length === 0) {
        return dispatch({
          type: ActionTypes.NoResultsOnSearch,
        });
      }

      dispatch({
        type: ActionTypes.SearchForBeer,
        payload: beerResults,
      });
    } catch (e) {
      dispatch({
        type: ActionTypes.NetworkError,
      });
    }
  };

  const loadMoreBeer = async () => {
    try {
      const beersResults = await getBeersBySearch(
        state.currentPage,
        searchInput.current
      );

      if (beersResults.length === 0) {
        return dispatch({
          type: ActionTypes.NoResultsOnSearch,
        });
      }

      dispatch({
        type: ActionTypes.UpdateBeerResults,
        payload: beersResults,
      });
    } catch (e) {
      dispatch({
        type: ActionTypes.NetworkError,
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updatePage = (updateOption: UpdatePageOptions) => {
    dispatch({
      type: ActionTypes.UpdatePage,
      payload: updateOption,
    });
    scrollToTop();
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
          {!state.networkError ? (
            <>
              <BeerList
                noResults={state.noResults}
                beerResults={state.beerResults}
              />
              {state.beerResults.length !== 0 && (
                <Pagination
                  currentPage={state.currentPage}
                  updatePage={updatePage}
                  amountOfResults={state.beerResults.length}
                />
              )}
            </>
          ) : (
            <section className={"network-error"}>
              <div className={"network-error__container"}>
                <h3 className={"network-error__container--text"}>
                  Unfortunately, we encountered a network error, please try
                  searching again. If the problem persists, please contact our
                  support at 1-800-555-4243
                </h3>
              </div>
            </section>
          )}
        </section>
      </section>
    </div>
  );
};

export default App;
