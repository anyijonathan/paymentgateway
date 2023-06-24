import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Modal, TextField } from "@mui/material";

import SuccessModalContent from "./SuccessModalContent";
import { sendMessage } from "../../../../services/actions/staffMakerChecker.actions";
import { systemControllersActions } from "../../../../services/reducers/system.reducer";
import Spinner from "../../../../utils/Spinner";

const SendMessageModal = ({ open, handleClose, type, merchant, reload }) => {
  const dispatch = useDispatch();
  const sender = useSelector((state) => state?.userAuth);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const isChecker = sender?.role?.toLowerCase() === "checker";
  const checker = merchant?.supervisor || "Everyone";
  const maker = merchant?.createdBy;

  const closeModal = () => {
    setMessage("");
    setStep(1);
    reload();
    handleClose();
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setMessage(input);
  };

  const sendMessageHandler = async () => {
    dispatch(systemControllersActions.startLoading());

    const payload = {
      senderId: sender.staffId,
      senderRole: sender.role,
      receiver: isChecker ? maker : checker,
      comment: message,
    };

    try {
      const response = await sendMessage(merchant?.merchantCode, payload);
      if (response) {
        dispatch(systemControllersActions.endLoading());
        setStep(2);
      }
    } catch (error) {
      dispatch(systemControllersActions.endLoading());
      toast.error(error.message);
    }
  };

  let textLength = 96 - message.length > 0 ? 96 - message.length : 0;

  return (
    <div>
      <Modal open={open} onClose={closeModal}>
        <Box className="modal-content">
          {step && step === 1 && (
            <div className="font-medium">
              <h3 className="font-medium text-base pb-2 border-b border-[#E8E6E9]">
                {type === "message" ? "Send Message" : "Approve with Comment"}
              </h3>
              {type === "message" && (
                <p className="text-sm mt-4">
                  To: <span className="text-purple">{isChecker ? maker : checker}</span>
                </p>
              )}
              <p className="text-sm mt-[37px] mb-4">
                {type === "message" ? "Enter Message" : "Comment"}
              </p>
              <Box component="form" sx={{}} autoComplete="off">
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
                    maxLength: 96,
                  }}
                  value={message}
                  onChange={handleChange}
                  helperText={
                    <span className="block text-end">{`${textLength} characters left`}</span>
                  }
                />
              </Box>

              <div className="flex gap-4 mt-[2rem]">
                <Button
                  variant="outlined"
                  sx={{
                    height: "56px",
                    fontSize: "16px",
                    boxShadow: "none",
                    maxWidth: "100%",
                    width: "200px",
                  }}
                  onClick={closeModal}
                >
                  Cancel
                </Button>
                <Button
                  disableElevation
                  variant="contained"
                  sx={{
                    height: "56px",
                    fontSize: "16px",
                    boxShadow: "none",
                    maxWidth: "100%",
                    width: "200px",
                  }}
                  disabled={message.length < 2}
                  onClick={sendMessageHandler}
                >
                  <Spinner size={24} color="secondary" />
                  Submit
                </Button>
              </div>
            </div>
          )}
          {step && step === 2 && (
            <SuccessModalContent
              closeModal={closeModal}
              header={type === "message" ? "Message sent" : "Submission successful!"}
              actionText="Done"
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default SendMessageModal;
