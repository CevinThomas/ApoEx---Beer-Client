import React from "react";
import MainButton from "./buttons/mainButton";

type Props = {};

const Search = ({}: Props) => {
  return (
    <section className={"search"}>
      <div>
        <input type="text" />
      </div>
      <div>
        <MainButton>Search</MainButton>
      </div>
    </section>
  );
};

export default Search;
