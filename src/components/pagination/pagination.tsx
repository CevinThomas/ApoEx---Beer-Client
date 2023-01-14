import React from "react";
import { BiChevronRight } from "react-icons/bi";
import { BiChevronLeft } from "react-icons/bi";

export type UpdatePageOptions = "incrementPage" | "decrementPage";

type Props = {
  updatePage: (updateOption: UpdatePageOptions) => void;
  currentPage: number;
  amountOfResults: number;
};

const Pagination = ({ updatePage, currentPage, amountOfResults }: Props) => {
  return (
    <section className={"pagination"}>
      <div className={"pagination__inner"}>
        <div className={"pagination__inner__decrement"}>
          <button
            className={"pagination__inner__decrement--button"}
            disabled={currentPage <= 1}
            onClick={() => updatePage("decrementPage")}
          >
            <BiChevronLeft size={20} />
          </button>
        </div>
        <div
          className={"pagination__inner__current-page"}
        >{`Page: ${currentPage}`}</div>
        <div className={"pagination__inner__increment"}>
          <button
            className={"pagination__inner__increment--button"}
            disabled={amountOfResults < 10}
            onClick={() => updatePage("incrementPage")}
          >
            <BiChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pagination;
