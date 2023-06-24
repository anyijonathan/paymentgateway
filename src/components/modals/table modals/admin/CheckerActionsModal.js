import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";

import { IMAGES } from "../../../../assets";
import CButton from "../../../buttons/CButton";
import Spinner from "../../../../utils/Spinner";
import {
  approveMerchant,
  declineDeletion,
  declineMerchant,
  referMerchant,
} from "../../../../services/actions/staffMakerChecker.actions";
import { systemControllersActions } from "../../../../services/reducers/system.reducer";

const CheckerActionsModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [comment, setComment] = useState(false);

  const isDelete = props.decline?.includes("decline-delete");
  const isRefer = props.type?.includes("refer");
  const merchant = props.info;

  const handleClose = () => {
    setComment(false);
    setMessage("");
    props.closeDialog();
  };

  const actionHandler = async (prop) => {
    dispatch(systemControllersActions.startLoading());
    const payload = comment || isRefer ? { message } : null;

    const getActionType = (page) => {
      switch (page) {
        case "approve":
          return approveMerchant(merchant?.merchantCode, payload);
        case "refer":
          return referMerchant(merchant?.merchantCode, payload);
        case "decline-merchant":
          return declineMerchant(merchant?.merchantCode, payload);
        case "decline-delete":
          return declineDeletion(merchant?.merchantCode, payload);
        default:
          return null;
      }
    };

    try {
      const result = await getActionType(prop);
      if (result) {
        toast.success(result?.data);
        dispatch(systemControllersActions.endLoading());
        handleClose();
        navigate(-1);
      }
    } catch (error) {
      toast.error(error.message);
      dispatch(systemControllersActions.endLoading());
      handleClose();
    }
  };

  return (
    <Dialog
      id={props.type}
      className="confirm-dialog"
      open={props.open}
      onClose={props.closeDialog}
      fullWidth
    >
      <Box className="confirm-dialog-inner relative">
        <IconButton
          sx={{ position: "absolute" }}
          color="error"
          aria-label="close"
          className=" top-1 right-1"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <div className="logo">
          <img src={IMAGES.logo} alt="FCMB Logo" />
        </div>
        <DialogTitle className="dialog-title" color="primary">
          <Stack direction="column">
            <span className="item-title uppercase">
              {props.type} {merchant?.accountName}
            </span>
          </Stack>
        </DialogTitle>
        <DialogContent className="dialog-content">
          <Stack gap="10px">
            {!isRefer && (
              <p className="description">
                you have the option to add a comment or {props.type} this
                merchant directly
              </p>
            )}
            {(comment || isRefer) && (
              <Box>
                <TextField
                  name="message"
                  id="message"
                  className="input-section"
                  fullWidth
                  required
                  multiline
                  rows={5}
                  type="text"
                  inputProps={{
                    maxLength: 100,
                  }}
                  value={message}
                  error={message.length > 100}
                  onChange={(e) => setMessage(e.target.value)}
                  helperText={
                    <span className="block text-end">{`${
                      100 - message.length
                    } characters left`}</span>
                  }
                />
              </Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions className="dialog-actions">
          {props.type?.includes("approve") && (
            <>
              <CButton
                variant="outlined"
                onClick={comment ? handleClose : () => setComment(true)}
              >
                {!comment ? "Approve with comment" : "Cancel"}
              </CButton>
              <CButton
                onClick={() => actionHandler("approve")}
                disabled={comment && message?.length < 2}
              >
                <Spinner size={24} color="primary" />
                Approve Merchant
              </CButton>
            </>
          )}
          {props.type?.includes("refer") && (
            <>
              <CButton variant="outlined" onClick={handleClose}>
                Cancel
              </CButton>
              <CButton
                onClick={() => actionHandler("refer")}
                disabled={message?.length < 2}
              >
                <Spinner size={24} color="secondary" />
                Refer Merchant
              </CButton>
            </>
          )}
          {props.type?.includes("decline") && (
            <>
              <CButton
                variant="outlined"
                onClick={comment ? handleClose : () => setComment(true)}
              >
                {!comment ? "Decline with comment" : "Cancel"}
              </CButton>
              <CButton
                color="error"
                onClick={() => actionHandler(props.decline)}
                disabled={comment && message?.length < 2}
              >
                <Spinner size={24} color="error" />
                {isDelete ? "Decline Deletion" : "Decline Merchant"}
              </CButton>
            </>
          )}
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default CheckerActionsModal;
