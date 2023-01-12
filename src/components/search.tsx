import React, { ChangeEvent, useRef } from "react";
import MainButton from "./buttons/mainButton";

type Props = {
  searchFn: (searchTerm: string) => void;
};

const Search = ({ searchFn }: Props) => {
  const searchInput = useRef<string>("");

  return (
    <section className={"search"}>
      <div className={"search__container"}>
        <div className={"search__input"}>
          <input
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              (searchInput.current = event.target.value)
            }
            placeholder={"What's your favorite beer?"}
            className={"search__input--input"}
            type="text"
          />
        </div>
        <MainButton onClick={() => searchFn(searchInput.current)}>
          Search
        </MainButton>
      </div>
    </section>
  );
};

export default Search;
