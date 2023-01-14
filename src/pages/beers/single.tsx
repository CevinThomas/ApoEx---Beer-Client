import React, { useCallback, useEffect, useReducer } from "react";
import { MemoizedHeader } from "../../components/header";
import { BeerResults, getSingleBeerById } from "../../api/api";
import Loader from "../../components/loader";
import { BiBeer, BiChevronLeft } from "react-icons/bi";

import { Link, useLoaderData } from "react-router-dom";

const InitialState: State = {
  loading: true,
  beerData: null,
};
type State = {
  loading: boolean;
  beerData: BeerResults | null;
};
enum ActionTypes {
  Initialize,
  ToggleLoading,
}
type Actions =
  | {
      type: ActionTypes.Initialize;
      payload: BeerResults | null;
    }
  | {
      type: ActionTypes.ToggleLoading;
    };

const reducer = (state = InitialState, action: Actions): State => {
  switch (action.type) {
    case ActionTypes.Initialize:
      return {
        ...state,
        beerData: action.payload,
        loading: false,
      };
    case ActionTypes.ToggleLoading:
      return {
        ...state,
        loading: !state.loading,
      };
  }
};

const SingleBeer = () => {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const queryParams = useLoaderData();

  const getSingleBeer = useCallback(async (beerId: number) => {
    try {
      const beer = await getSingleBeerById(beerId);

      dispatch({
        type: ActionTypes.Initialize,
        payload: beer[0],
      });
    } catch (e) {
      dispatch({
        type: ActionTypes.Initialize,
        payload: null,
      });
    }
  }, []);

  useEffect(() => {
    // Here comes a Ts Ignore. Never do this, but the React-router-dom types return from useLoaderData is unknown, and not sure why it would be like that, in prod, this would need to be addressed
    // @ts-ignore
    getSingleBeer(queryParams.id);
    return () => {};
  }, []);

  return (
    <section>
      <MemoizedHeader />
      {state.loading && <Loader />}
      {!state.loading && state.beerData === null && (
        <section className={"single-beer"}>
          <div className={"single-beer__home"}>
            <Link className={"single-beer__home--link"} to={"/"}>
              <BiChevronLeft size={40} />
            </Link>
          </div>
          <div className={"single-beer__error"}>
            <h3 className={"single-beer__error--text"}>
              Something went wrong with getting the correct beer information,
              please try another beer
            </h3>
          </div>
        </section>
      )}

      {state.beerData && (
        <section className={"single-beer"}>
          <section className={"single-beer__title"}>
            <div className={"single-beer__home"}>
              <Link className={"single-beer__home--link"} to={"/"}>
                <BiChevronLeft size={40} />
              </Link>
            </div>
            {state.beerData.name && state.beerData.alcoholVolume &&
                <h1 className={"single-beer__title--title"}>
                  {`${state.beerData.name} - ${state.beerData.alcoholVolume}%`}
                </h1>}

          </section>
          <section className={"single-beer__image"}>
            <div className={"single-beer__image__container"}>
              {state.beerData.image ? (
                <img
                  className={"single-beer__image__container--image"}
                  src={state.beerData.image}
                  alt=""
                />
              ) : (
                <BiBeer size={100} />
              )}
            </div>
          </section>
          <section>
            {state.beerData.desc ??
                ( <div className={"single-beer__info__desc"}>
                  <h2 className={"single-beer__info__desc--desc"}>
                    {state.beerData.desc}
                  </h2>
            </div>)}

            <div className={"single-beer__info__food"}>
              <div className={"single-beer__info__food__header"}>
                <h3 className={"single-beer__info__food__header--header"}>
                  This beer would fit perfectly with these foods:{" "}
                </h3>
              </div>

              {state.beerData.foodPairing.length !== 0 && state.beerData.foodPairing.map((food: string, index: number) => (
                <div
                  key={food}
                  className={`single-beer__info__food__single ${
                    index % 2 === 0 ? "odd" : "even"
                  }`}
                >
                  <p className={"single-beer__info__food__single--item"}>
                    {food}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </section>
      )}
    </section>
  );
};

export default SingleBeer;
