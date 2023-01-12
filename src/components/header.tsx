import React from "react";

const Header = () => {
  return (
    <section className="header">
      <div className={"header__logo"}>
        <img
          className={"header__logo--logoImg"}
          src="/logo.png"
          alt="ApoEx logo"
        />
      </div>
      <div className={"header__desc"}>
        <h1 className={"header__desc--title"}>
          Vi förenklar och förbättrar för vården
        </h1>
      </div>
    </section>
  );
};

export const MemoizedHeader = React.memo(Header);
