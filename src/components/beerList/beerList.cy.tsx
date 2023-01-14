import React from "react";
import BeerList from "./beerList";
import { BeerResults } from "../../api/api";
import { MemoryRouter } from "react-router-dom";

const mockData: BeerResults[] = [
  {
    id: 1,
    image: "https://images.punkapi.com/v2/keg.png",
    alcoholVolume: 4.5,
    name: "Buzz",
    desc: "",
    foodPairing: [],
  },
];

describe("<BeerList />", () => {
  it("Displays No Results message", () => {
    cy.mount(<BeerList beerResults={mockData} noResults={true} />, {
      wrapper: MemoryRouter,
    });
    cy.get(".beer-list__no-results__container--text").should(
      "have.text",
      "No beer was found with that search term, please try again with a different search"
    );
  });
  it("should show no results", () => {
    cy.mount(<BeerList beerResults={mockData} noResults={true} />, {
      wrapper: MemoryRouter,
    });
    cy.get(".beer-list__single-container").should("not.exist");
  });
  it("should display correct amount of results", () => {
    cy.mount(
      <MemoryRouter>
        <BeerList beerResults={mockData} noResults={false} />
      </MemoryRouter>
    );
    cy.get(".beer-list__inner").should("have.length", 1);
  });
  it("should display correct information", () => {
    cy.mount(
      <MemoryRouter>
        <BeerList beerResults={mockData} noResults={false} />
      </MemoryRouter>
    );
    cy.get(".beer-list__single-container__info__image--image").should(
      "have.attr",
      "src",
      "https://images.punkapi.com/v2/keg.png"
    );
    cy.get(".beer-list__single-container__info__desc--name").should(
      "have.text",
      "Buzz"
    );
    cy.get(
      ".beer-list__single-container__info__desc--alcohol-percentage"
    ).should("have.text", "4.5%");
  });
});
