import React from "react";
import "./index.css";

const LayoutContainer = (props) => {
  return (
    <div className="layout-wrapper layout-content-navbar max-h-screen">
      <div className="layout-container">{props.children}</div>
    </div>
  );
};

export default LayoutContainer;
