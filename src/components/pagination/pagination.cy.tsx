import React from "react";
import Pagination, { UpdatePageOptions } from "./pagination";

describe("<Pagination  />", () => {
  it("Renders correct page number", () => {
    cy.mount(
      <Pagination currentPage={1} amountOfResults={1} updatePage={() => {}} />
    );

    cy.get(".pagination__inner__current-page").should("have.text", "Page: 1");
  });

  it("Should make decrement button disabled - On Page 1", () => {
    cy.mount(
      <Pagination currentPage={1} amountOfResults={11} updatePage={() => {}} />
    );

    cy.get(".pagination__inner__decrement--button").should("be.disabled");
  });
  it("should make increment button disabled - Last page", () => {
    cy.mount(
      <Pagination currentPage={2} amountOfResults={1} updatePage={() => {}} />
    );

    cy.get(".pagination__inner__increment--button").should("be.disabled");
  });
});
