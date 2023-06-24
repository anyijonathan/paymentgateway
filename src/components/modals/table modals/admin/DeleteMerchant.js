import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Box, Button, Modal } from "@mui/material";

import { ICONS } from "../../../../assets";
import SuccessModalContent from "./SuccessModalContent";
import { systemControllersActions } from "../../../../services/reducers/system.reducer";
import { deleteMerchant } from "../../../../services/actions/staffMakerChecker.actions";

const DeleteMerchant = (props) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const deleteAction = async () => {
    dispatch(systemControllersActions.startLoading());

    try {
      const result = await deleteMerchant(props?.data?.accountNumber);
      if (result) {
        setStep(2);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(systemControllersActions.endLoading());
    }
  };

  const closeModal = () => {
    setStep(1);
    props.handleClose();
  };

  const done = () => {
    closeModal();
    props.goBack();
  };

  const closeHandler = (e, reason) => {
    if (step === 2 && reason && reason === "backdropClick") {
      return;
    }
    props.handleClose();
  };

  return (
    <div>
      <Modal open={props.open} onClose={closeHandler}>
        <Box className="modal-content">
          {step && step === 1 && (
            <div className="flex flex-col justify-center items-center">
              <img
                src={ICONS.bin}
                alt="check icon"
                className="w-[64px] h-[64px]"
              />
              <h3 className="font-medium text-lg mt-5">{props.header}</h3>
              {props.subHeader && (
                <p className="text-[#928798] text-sm ">{props.subHeader}</p>
              )}
              <div className="flex gap-4 mt-[3rem]">
                <Button
                  variant="outlined"
                  sx={{
                    height: "56px",
                    fontSize: "16px",
                    boxShadow: "none",
                    maxWidth: "100%",
                    width: "200px",
                  }}
                  onClick={closeHandler}
                >
                  No, Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    height: "56px",
                    fontSize: "16px",
                    boxShadow: "none",
                    maxWidth: "100%",
                    width: "200px",
                  }}
                  onClick={deleteAction}
                >
                  Yes, Continue
                </Button>
              </div>
            </div>
          )}

          {step && step === 2 && (
            <SuccessModalContent
              closeModal={done}
              header="Deleted merchant sent for approval!"
              actionText="Done"
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteMerchant;
