import React from "react";
import { BeerResults } from "../api/api";
import { BiChevronRight } from "react-icons/bi";
import { BiBeer } from "react-icons/bi";
import { Link } from "react-router-dom";

type Props = {
  beerResults: BeerResults[];
};

const BeerList = ({ beerResults }: Props) => {
  return (
    <section className={"beer-list"}>
      <div className={"beer-list__inner"}>
        {beerResults.length !== 0 &&
          beerResults.map((beer: BeerResults) => (
            <Link key={beer.id} to={`/beer/${beer.id}`}>
              <div className={`beer-list__single-container`}>
                <div className={"beer-list__single-container__info"}>
                  <div className={"beer-list__single-container__info__image"}>
                    {beer.image ? (
                      <img
                        alt={"Image of specific beer"}
                        className={
                          "beer-list__single-container__info__image--image"
                        }
                        src={beer.image}
                      />
                    ) : (
                      <BiBeer
                        className={
                          "beer-list__single-container__info__image--image"
                        }
                        size={40}
                      />
                    )}
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
            </Link>
          ))}
      </div>
    </section>
  );
};

export default BeerList;
