import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

interface Props {}

const Loader = ({}: Props) => {
  return (
    <div className={"loader"}>
      <Player
        style={{ height: 200, width: 200 }}
        autoplay
        src={"https://assets1.lottiefiles.com/packages/lf20_b88nh30c.json"}
        loop
      />
    </div>
  );
};

export default Loader;
