import "../index.css";
import { useState } from "react";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import {
  StyledTableCell,
  StyledTableRow,
} from "../../../layouts/tables/TableLayout";
import { systemControllersActions } from "../../../services/reducers/system.reducer";
import { deleteStaff } from "../../../services/actions/staffAdmin.actions";
import ConfirmAction from "../../modals/confirmation/ConfirmAction";
import CustomTable from "../CustomTable";
import TextActions from "../TextActions";

const StaffTable = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [focusUser, setFocusUser] = useState(null);
  const tableHeads = [
    "Staff Id",
    "First Name",
    "Last Name",
    "Email Address",
    "Role",
    "Actions",
  ];

  const openDialog = (prop) => {
    setFocusUser(prop);
    setOpen(true);
  };

  const closeDialog = () => {
    setFocusUser(null);
    setOpen(false);
  };

  const confirmDelete = async () => {
    dispatch(systemControllersActions.startLoading());

    try {
      const result = await deleteStaff(focusUser.staffId);
      if (result) {
        toast.success("Delete successful");
        props?.reload();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(systemControllersActions.endLoading());
      closeDialog();
    }
  };

  return (
    <>
      <ConfirmAction
        type="delete-modal"
        open={open}
        closeDialog={closeDialog}
        focusText={focusUser?.firstName + " " + focusUser?.lastName}
        confirmAction={confirmDelete}
        title="Are you sure you want to delete"
        description="This action is permanent and can not be reversed"
      />
      <Box className="staff-table">
        <div className="table-top">
          <h1 className="table-title">Staff Users</h1>
        </div>
        <CustomTable headers={tableHeads}>
          {props?.tableRows?.map((row, index) => (
            <StyledTableRow props={props} hover key={index}>
              <StyledTableCell component="th" scope="row">
                FCMB{row?.staffId}
              </StyledTableCell>
              <StyledTableCell sx={{ textTransform: "capitalize" }}>
                {row?.firstName?.toLowerCase()}
              </StyledTableCell>
              <StyledTableCell sx={{ textTransform: "capitalize" }}>
                {row?.lastName?.toLowerCase()}
              </StyledTableCell>
              <StyledTableCell>
                {row?.emailAddress?.toLowerCase()}
              </StyledTableCell>
              <StyledTableCell>{row?.role}</StyledTableCell>
              <StyledTableCell>
                <TextActions
                  onEdit={props?.onEdit}
                  onDelete={openDialog}
                  row={row}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </CustomTable>
      </Box>
    </>
  );
};

export default StaffTable;
