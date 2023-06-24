import React from "react";
import "./index.css";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const LogoutModal = (props) => {
  return (
    <Dialog
      className="logout-dialog"
      open={props.open}
      onClose={props.closeDialog}
      fullWidth
    >
      <Box className="logout-dialog-inner">
        <div className="icon">
          <LogoutIcon fontSize="large" color="primary" />
        </div>
        <DialogContent className="dialog-content">
          <p className="description text-black">
            Are you sure you want to Sign Out?
          </p>
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button
            color="primary"
            variant="outlined"
            disableElevation
            onClick={props.closeDialog}
          >
            No, Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            disableElevation
            onClick={props.confirmAction}
          >
            Yes, Continue
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default LogoutModal;
