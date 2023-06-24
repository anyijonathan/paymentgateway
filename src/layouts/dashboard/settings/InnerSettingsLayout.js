import { Fragment } from "react";
import "./index.css";
import { Box } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const InnerSettingsLayout = (props) => {
  const userRole = useSelector((state) => state?.userAuth?.role)?.toLowerCase();
  return (
    <>
      <div className="settings-navigation">
        <div className="links">
          {props.links.map((link, index) => {
            return (
              <Fragment key={index}>
                {!userRole?.includes("admin") && !link?.adminOnly && (
                  <NavLink className="link" to={link.path}>
                    {link.linkName}
                  </NavLink>
                )}
                {userRole?.includes("admin") && (
                  <NavLink className="link" to={link.path}>
                    {link.linkName}
                  </NavLink>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
      <Box className="settings-box">
        <Outlet />
      </Box>
    </>
  );
};

export default InnerSettingsLayout;
