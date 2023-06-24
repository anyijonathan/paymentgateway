import "./index.css";
import { useState } from "react";
import styled from "@emotion/styled";
import { Button, Menu, MenuItem, Tooltip } from "@mui/material";
import DownloadSharpIcon from "@mui/icons-material/DownloadSharp";

import { IMAGES } from "../../assets";
import Spinner from "../../utils/Spinner";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    background: "transparent",
    boxShadow: "none",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        marginRight: theme.spacing(1.5),
      },
    },
    "& .MuiMenuItem-root:hover": {
      backgroundColor: "transparent",
    },
  },
}));

const ExportButton = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectHandler = (prop) => {
    props.onExport(prop);
    handleClose();
  };

  return (
    <div className="export-button">
      <Button
        sx={{ width: "100%", height: "40px" }}
        disableElevation
        disableRipple
        onClick={handleClick}
        color={props.color}
        size={props.size}
        variant="contained"
        endIcon={<DownloadSharpIcon fontSize={props.iconSize} />}
      >
        Export
        <Spinner size={24} color={"primary"} />
      </Button>

      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => selectHandler("excel")} disableRipple>
          <Tooltip placement="left" title="Download Excel">
            <div className="export-icon">
              <img src={IMAGES.excel} alt="Excel" />
            </div>
          </Tooltip>
        </MenuItem>
        <MenuItem onClick={() => selectHandler("pdf")} disableRipple>
          <Tooltip placement="left" title="Download PDF">
            <div className="export-icon pdf">
              <img src={IMAGES.pdf} alt="PDF" />
            </div>
          </Tooltip>
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default ExportButton;
