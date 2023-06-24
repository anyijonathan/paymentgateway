import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import CButton from "../../../../components/buttons/CButton";
import EditMerchant from "../../../../components/modals/table modals/admin/EditMerchant";
import DeleteMerchant from "../../../../components/modals/table modals/admin/DeleteMerchant";
import SendMessageModal from "../../../../components/modals/table modals/admin/SendMessageModal";
import ConfirmAction from "../../../../components/modals/confirmation/ConfirmAction";
import { resubmitMerchant } from "../../../../services/actions/staffMakerChecker.actions";
import { systemControllersActions } from "../../../../services/reducers/system.reducer";

const MakerActionSet = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState({
    delete: false,
    comment: false,
    edit: false,
    success: false,
    submit: false,
  });

  const status = props.info?.approvalStatus?.toLowerCase();
  const isDelete = props.info?.deletionStatus?.includes("pending-deletion");

  const handleClose = (prop) => setOpen({ ...open, [prop]: false });
  const handleOpen = (prop) => setOpen({ ...open, [prop]: true });

  const resubmitHandler = async() => {
    dispatch(systemControllersActions.startLoading());
    try {
      const response = await resubmitMerchant(props.info?.merchantCode)
      if (response) {
        props.reload()
        handleClose("submit")
      }
    } catch (error) {
      dispatch(systemControllersActions.endLoading());
      toast.error(error.message);
      handleClose("submit")
    }
  };

  return (
    <>
      <div className="flex gap-4">
        {status !== "declined" && (
          <>
            {status !== "approved" && (
              <CButton variant="outlined" minWidth="180px" onClick={() => handleOpen("comment")}>
                Send Message
              </CButton>
            )}
            {status === "referred" && (
              <CButton
                variant="contained"
                color="secondary"
                minWidth="180px"
                onClick={() => handleOpen("submit")}
              >
                Re-Submit
              </CButton>
            )}
            {!isDelete && status !== "approved" && (
              <CButton minWidth="180px" onClick={() => handleOpen("edit")}>
                Edit Merchant
              </CButton>
            )}
          </>
        )}
        <CButton
          minWidth="180px"
          color="error"
          className="delete-button"
          disabled={isDelete}
          onClick={() => handleOpen("delete")}
        >
          {isDelete ? "Pending Deletion" : "Delete Merchant"}
        </CButton>
      </div>
      <DeleteMerchant
        open={open.delete}
        header="Are you sure you want to delete?"
        data={props.info}
        handleClose={() => handleClose("delete")}
        goBack={() => navigate(-1)}
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
      <ConfirmAction
        type="submit-modal"
        open={open.submit}
        closeDialog={() => handleClose("submit")}
        focusText={props.info?.accountName}
        confirmAction={resubmitHandler}
        title="Do you want to re-submit"
        description="This would send this merchant back for approval"
      />
    </>
  );
};

export default MakerActionSet;
