import "./admin/style.css";
import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

import { ICONS } from "../../assets";

const Actions = ({ row, id, menu }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        disableElevation
        disableRipple
        sx={{ "&:hover": { backgroundColor: "transparent" } }}
        id="basic-button"
        onClick={handleClick}
      >
        <img src={ICONS.threeDots} alt="three dots" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {menu &&
          menu.map((menuItem) => (
            <MenuItem
              disabled={
                menuItem?.name?.toLowerCase() === "delete" &&
                row?.deletionStatus === "pending-deletion"
                  ? true
                  : false
              }
              key={menuItem.name}
              id={menuItem.style}
              onClick={() => {
                handleClose();
                menuItem.action(id, row);
              }}
              sx={{ width: "190px", height: "32px" }}
              className="action-menu-item"
            >
              {menuItem.name}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};

export default Actions;
