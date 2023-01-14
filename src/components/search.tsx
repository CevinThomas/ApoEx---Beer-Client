import React, { ChangeEvent, useEffect } from "react";
import MainButton from "./buttons/mainButton";

type Props = {
  searchFn: () => void;
  updateSearchText: (searchText: string) => void;
};

const Search = ({ searchFn, updateSearchText }: Props) => {
  const enterListener = (event: KeyboardEvent) => {
    if (event.code === "Enter") {
      searchFn();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", enterListener);

    return () => {
      document.removeEventListener("keydown", enterListener);
    };
  }, []);

  return (
    <section className={"search"}>
      <div className={"search__container-title"}>
        <h2>BEER LIST</h2>
      </div>
      <div className={"search__container-input"}>
        <div className={"search__input"}>
          <input
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateSearchText(event.target.value)
            }
            placeholder={"What's your favorite beer?"}
            className={"search__input--input"}
            type="text"
          />
        </div>
        <MainButton id={"search"} onClick={searchFn}>
          Search
        </MainButton>
      </div>
    </section>
  );
};

export default Search;
