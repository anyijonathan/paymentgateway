import React from "react";
import "./index.css";

const Inner = (props) => {
  return <div className="inner-layout">{props.children}</div>;
};

export default Inner;
