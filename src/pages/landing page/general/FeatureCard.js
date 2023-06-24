import React from "react";
import "./index.css";

export const FeatureCard = (props) => {
  return (
    <div className="feature-container">
      <div className="icon">
        <img src={props.icon} alt={props.title} />
      </div>
      <div className="desc">
        <h6 className="title">{props.title}</h6>
        <p className="sub">{props.subtitle}</p>
      </div>
    </div>
  );
};
