import "./index.css";
import Moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Badge, Tooltip } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import { ICONS } from "../../../assets";
import Notifications from "../Notifications/Notifications";

const LayoutPageNav = (props) => {
  const currentDate = Moment().format("E Do MMM YYYY");
  const role = useSelector((state) => state?.userAuth?.role?.toLowerCase());
  const { notifications } = useSelector((state) => state.systemControllers);
  const userType = useSelector((state) => state?.userAuth?.userType?.toLowerCase());
  const lastName = useSelector((state) => state?.userAuth?.lastName?.toLowerCase());
  const firstName = useSelector((state) => state?.userAuth?.firstName?.toLowerCase());
  const accountName = useSelector((state) => state?.userAuth?.accountName?.toLowerCase());

  const userName = firstName + " " + lastName;
  const MobileMenuIcon = ICONS.MobileMenuIcon;
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const openMenu = () => {
    document.querySelector(".layout-menu").classList.add("mobile-open");
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 35,
        height: 35,
        padding: "20px",
        fontSize: "18px",
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className="layout-navbar flex justify-between w-full items-center border-b border-b-gray mr-4">
      <div className="flex items-center">
        <div className="mobile-menu mr-1 xl:mr-4 cursor-pointer" aria-label="button" onClick={openMenu}>
          <MobileMenuIcon />
        </div>
        <CalendarMonthIcon color="primary" fontSize="small" className="mr-1" />
        <p className="font-medium text-sm text-black-100 currentTime">{`${
          days[currentDate[0] - 1]
        }, ${currentDate.slice(2)}`}</p>
      </div>
      <div className="user-info flex items-center">
        <Badge color="primary" overlap="circular" variant="dot" invisible={notifications?.length === 0}>
          <NotificationsNoneIcon className="text-black cursor-pointer" onClick={handleClick} />
        </Badge>
        <Notifications anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        <div className="flex items-center ml-2 xl:ml-6">
          <Tooltip arrow title={<span className="capitalize text-xs">{userName}</span>}>
            <Avatar {...stringAvatar(userName?.toUpperCase())} />
          </Tooltip>
          <div className="user-data text-black-10 xl:pl-2.5">
            <p className="username font-medium text-sm capitalize">{userType === "staff" ? userName : accountName}</p>
            <p className="user-role font-normal text-xs capitalize">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutPageNav;
