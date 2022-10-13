import React from "react";
import { Dna } from "react-loader-spinner";

const Loading = (props) => {
  return (
    <Dna
      visible={props.status === "pending"}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperStyle={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      wrapperClass="dna-wrapper"
    />
  );
};

export default Loading;
