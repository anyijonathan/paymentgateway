import "./index.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import LogoutModal from "../../../components/modals/logout/LogoutModal";
import { merchantRoutesArray } from "../../../routes/merchantRoutes";
import { staffRoutesArray } from "../../../routes/staffRoutes";
import useLogout from "../../../services/hooks/useLogout";
import { ICONS, IMAGES } from "../../../assets";

const LayoutMenu = ({ type }) => {
  const navigate = useNavigate();
  const logoutUser = useLogout()
  const [open, setOpen] = useState(false);
  const userType = useSelector(
    (state) => state?.userAuth?.userType
  )?.toLowerCase();
  const { LogOutIcon } = ICONS;
  const routes =
    type && type.toLowerCase() === "staff"
      ? staffRoutesArray
      : merchantRoutesArray;

  const closeMenu = () => {
    document.querySelector(".layout-menu").classList.remove("mobile-open");
  };

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const confirmLogout = () => {
    logoutUser()
    closeDialog();
  };

  return (
    <>
      <LogoutModal
        open={open}
        closeDialog={closeDialog}
        confirmAction={confirmLogout}
      />
      <aside className="layout-menu mobile-open xl:z-30 w-[256px] max-w-full bg-[#F8F8F9] pl-6 pt-4">
        <div className="app-brand relative">
          <div
            className="app-brand cursor-pointer"
            onClick={() => {
              navigate(`/${userType}/overview`);
            }}
          >
            <img
              src={IMAGES.DashboardLogo}
              alt="FCMB logo and payment gateway text"
            />
          </div>
          <div
            className="layout-menu-toggle cursor-pointer border-[2px] bg-purple border-purple"
            onClick={closeMenu}
            aria-label="button"
          >
            <img
              src={ICONS.angleDown}
              alt="arrow pointing left"
              className="toggle-arrow text-white"
            />
          </div>
        </div>
        <nav className="mt-[56px]">
          <ul className="menu-container w-full ">
            <li>
              {routes?.map((route, index) => (
                <NavLink
                  key={index}
                  to={route?.path}
                  className={"menu-item flex items-center"}
                >
                  {route?.icon}
                  <span>{route?.name}</span>
                </NavLink>
              ))}
            </li>
            <li
              className="menu-item flex items-center sign-out"
              onClick={openDialog}
            >
              <LogOutIcon />
              <span>Sign Out</span>
            </li>
          </ul>
        </nav>
        <nav></nav>
      </aside>
    </>
  );
};

export default LayoutMenu;
