import "./index.css";
import { Box, Dialog, DialogTitle } from "@mui/material";

import { IMAGES } from "../../../assets/index";
import Spinner from "../../../utils/Spinner";

const ModalLayout = (props) => {
  return (
    <Dialog
      className={`${props.className} modal-dialog`}
      open={props.open}
      onClose={props.closeModal}
      maxWidth="xs"
      fullWidth
    >
      <Box className="modal-dialog-inner">
        <Spinner />
        <div className="modal-header">
          <div className="logo">
            <img src={IMAGES.logo} alt="FCMB Logo" />
          </div>
          <DialogTitle className="modal-title">{props.title}</DialogTitle>
        </div>
        {props.children}
      </Box>
    </Dialog>
  );
};

export default ModalLayout;
