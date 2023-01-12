import React from "react";
import { BiChevronRight } from "react-icons/bi";

type Props = {
  children: string;
};

const MainButton: React.FC<Props> = ({ children }) => {
  return (
    <div className={"main-button"}>
      <button className={"main-button__button"}>
        <span className={"main-button__button--text"}>{children}</span>
        <BiChevronRight className={"main-button__button--icon"} />
      </button>
    </div>
  );
};

export default MainButton;
