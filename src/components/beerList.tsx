import React from "react";
import { BeerResults } from "../api/api";
import { BiChevronRight } from "react-icons/bi";

type Props = {
  beerResults: BeerResults[];
};

const BeerList = ({ beerResults }: Props) => {
  return (
    <>
      {beerResults.length !== 0 &&
        beerResults.map((beer: BeerResults, index: number) => (
          <section className={"beer-list"}>
            <div className={"beer-list__inner"}>
              <div
                className={`beer-list__single-container ${
                  index % 2 === 0 ? "odd" : "even"
                }`}
              >
                <div className={"beer-list__single-container__info"}>
                  <div className={"beer-list__single-container__info__image"}>
                    <img
                      alt={"Image of specific beer"}
                      className={
                        "beer-list__single-container__info__image--image"
                      }
                      src={beer.image}
                    />
                  </div>
                  <div className={"beer-list__single-container__info__desc"}>
                    <p
                      className={
                        "beer-list__single-container__info__desc--name"
                      }
                    >
                      {beer.name}
                    </p>
                    <p
                      className={
                        "beer-list__single-container__info__desc--alcohol-percentage"
                      }
                    >
                      {`${beer.alcoholVolume}%`}
                    </p>
                  </div>
                </div>
                <div className={"beer-list__single-container__button"}>
                  <a
                    className={"beer-list__single-container__button--button"}
                    href="#"
                  >
                    <BiChevronRight size={40} />
                  </a>
                </div>
              </div>
            </div>
          </section>
        ))}
    </>
  );
};

export default BeerList;
