import React from "react";

export type UpdatePageOptions = "incrementPage" | "decrementPage";

type Props = {
  updatePage: (updateOption: UpdatePageOptions) => void;
  currentPage: number;
  amountOfResults: number;
};

const Pagination = ({ updatePage, currentPage, amountOfResults }: Props) => {
  return (
    <section className={"pagination"}>
      <div>
        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => updatePage("decrementPage")}
          >
            Left
          </button>
        </div>
        <div>{`Page: ${currentPage}`}</div>
        <div>
          <button
            disabled={amountOfResults < 10}
            onClick={() => updatePage("incrementPage")}
          >
            right
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pagination;
