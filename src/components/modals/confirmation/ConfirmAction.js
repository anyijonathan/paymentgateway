import "./index.css";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";

import { IMAGES } from "../../../assets/index";
import Spinner from "../../../utils/Spinner";

const ConfirmAction = (props) => {
  return (
    <Dialog
      id={props.type}
      className="confirm-dialog"
      open={props.open}
      onClose={props.closeDialog}
      fullWidth
    >
      <Box className="confirm-dialog-inner">
        <div className="logo">
          <img src={IMAGES.logo} alt="FCMB Logo" />
        </div>
        <DialogTitle className="dialog-title" color="primary">
          <Stack direction="column">
            {props.title}
            <span className="item-title">{props.focusText}</span>
          </Stack>
        </DialogTitle>
        <DialogContent className="dialog-content">
          <p className="description">{props.description}</p>
        </DialogContent>
        <DialogActions className="dialog-actions">
          {props.type?.includes("delete") ? (
            <>
              <Button
                sx={{ minWidth: "150px", height: "45px" }}
                variant="outlined"
                color="primary"
                disableElevation
                onClick={props.closeDialog}
              >
                Cancel
              </Button>
              <Button
                sx={{ minWidth: "150px", height: "45px" }}
                variant="contained"
                color="error"
                disableElevation
                onClick={props.confirmAction}
              >
                <Spinner size={24} color="error" />
                Confirm
              </Button>
            </>
          ) : (
            <>
              <Button
                sx={{ minWidth: "150px", height: "45px" }}
                variant="outlined"
                disableElevation
                onClick={props.closeDialog}
              >
                No, Cancel
              </Button>
              <Button
                sx={{ minWidth: "150px", height: "45px" }}
                variant="contained"
                disableElevation
                onClick={props.confirmAction}
              >
                <Spinner size={24} color="secondary" />
                Yes, Continue
              </Button>
            </>
          )}
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ConfirmAction;
