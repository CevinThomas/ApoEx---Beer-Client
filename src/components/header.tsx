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
    </section>
  );
};

export const MemoizedHeader = React.memo(Header);
