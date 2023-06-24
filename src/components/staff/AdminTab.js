import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

const AdminTab = (props) => {
  return (
    <>
      <div className="dashboard-navigation mb-10">
        <div className="links">
          {props.links.map((link, index) => {
            return (
              <NavLink className="link" key={index} to={link.path}>
                {link.linkName}
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AdminTab;
