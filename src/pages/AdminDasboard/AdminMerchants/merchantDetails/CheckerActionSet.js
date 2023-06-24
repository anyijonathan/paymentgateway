import { useState } from "react";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import CheckerActionsModal from "../../../../components/modals/table modals/admin/CheckerActionsModal";
import { approveDeletion } from "../../../../services/actions/staffMakerChecker.actions";
import { systemControllersActions } from "../../../../services/reducers/system.reducer";
import ConfirmAction from "../../../../components/modals/confirmation/ConfirmAction";
import CButton from "../../../../components/buttons/CButton";
import EditMerchant from "../../../../components/modals/table modals/admin/EditMerchant";
import SendMessageModal from "../../../../components/modals/table modals/admin/SendMessageModal";

const CheckerActionSet = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [decline, setDecline] = useState(null);
  const [open, setOpen] = useState({
    delete: false,
    edit: false,
    other: false,
    success: false,
    comment: false,
    action: "",
  });
  const info = props.info;
  const isDelete = info?.deletionStatus?.includes("pending-deletion");
  const status = props.info?.approvalStatus?.toLowerCase();

  const handleClose = (prop) => setOpen({ ...open, [prop]: false });
  const handleOpen = (prop) => setOpen({ ...open, [prop]: true });

  const openDialog = (prop) => {
    setOpen({ ...open, other: true, action: prop });
  };

  const closeDialog = (prop) => {
    setOpen({ ...open, other: false, action: "" });
  };

  const confirmDelete = async () => {
    dispatch(systemControllersActions.startLoading());

    try {
      const result = await approveDeletion(info?.accountNumber);
      if (result) {
        toast.success(result?.data);
        dispatch(systemControllersActions.endLoading());
        handleClose("delete");
        navigate(-1);
      }
    } catch (error) {
      toast.error(error.message);
      dispatch(systemControllersActions.endLoading());
      handleClose("delete");
    }
  };

  const declineHandler = (prop) => {
    setDecline(prop);
    openDialog("decline");
  };

  return (
    <>
      <Box className="flex gap-4">
        {status !== "approved" && (
          <CButton variant="outlined" minWidth="180px" onClick={() => handleOpen("comment")}>
            Send Message
          </CButton>
        )}
        {status !== "approved" && !isDelete && status !== "declined" && (
          <>
            <CButton minWidth="180px" onClick={() => openDialog("approve")}>
              Approve Merchant
            </CButton>
            {status === "pending" && (
              <CButton minWidth="180px" color="secondary" onClick={() => openDialog("refer")}>
                Refer Merchant
              </CButton>
            )}
          </>
        )}
        {status === "approved" && !isDelete && (
          <CButton minWidth="180px" onClick={() => handleOpen("edit")}>
            Edit Merchant
          </CButton>
        )}
        {((status !== "approved" && status !== "declined") || isDelete) && (
          <CButton
            minWidth="180px"
            color="error"
            variant={isDelete ? "outlined" : "contained"}
            onClick={() =>
              isDelete ? declineHandler("decline-delete") : declineHandler("decline-merchant")
            }
          >
            {isDelete ? "Decline Deletion" : "Decline Merchant"}
          </CButton>
        )}
        {isDelete && (
          <CButton
            minWidth="180px"
            color="error"
            className="delete-button"
            onClick={() => handleOpen("delete")}
          >
            Approve Deletion
          </CButton>
        )}
      </Box>
      <ConfirmAction
        type="delete-modal"
        open={open.delete}
        closeDialog={() => handleClose("delete")}
        focusText={info?.accountName}
        confirmAction={confirmDelete}
        title="Are you sure you want to delete"
        description="This action is permanent and can not be reversed"
      />
      <CheckerActionsModal
        info={info}
        open={open.other}
        type={open.action}
        decline={decline}
        closeDialog={() => closeDialog("other")}
      />
      <SendMessageModal
        handleClose={() => handleClose("comment")}
        merchant={props.info}
        open={open.comment}
        type="message"
        reload={props.refreshComments}
      />
      <EditMerchant
        open={open.edit}
        closeModal={() => {
          handleOpen("success");
          handleClose("edit");
        }}
        reload={props.reload}
        merchant={props.info}
      />
    </>
  );
};

export default CheckerActionSet;
