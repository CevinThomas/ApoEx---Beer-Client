import React from "react";
import "./styles/App.sass";
import { MemoizedHeader } from "./components/header";
import Search from "./components/search";
import BeerList from "./components/beerList";

function App() {
  return (
    <div className="app">
      <section className={"app__inner"}>
        <MemoizedHeader />
        <Search />
        <BeerList />
      </section>
    </div>
  );
}

export default App;
