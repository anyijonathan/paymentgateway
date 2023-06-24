import "../index.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";

import { StyledTableCell, StyledTableRow } from "../../../layouts/tables/TableLayout";
import { systemControllersActions } from "../../../services/reducers/system.reducer";
import { deleteUser } from "../../../services/actions/merchant.actions";
import ConfirmAction from "../../modals/confirmation/ConfirmAction";
import TextActions from "../TextActions";
import CustomTable from "../CustomTable";

const UsersTable = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [focusUser, setFocusUser] = useState({});
  const tableHeads = ["Name", "Email Address", "Role", "Actions"];

  const openDialog = (prop) => {
    setFocusUser(prop);
    setOpen(true);
  };

  const closeDialog = () => {
    setFocusUser({});
    setOpen(false);
  };

  const confirmDelete = async () => {
    dispatch(systemControllersActions.startLoading());

    try {
      const result = await deleteUser(focusUser.emailAddress);
      if (result) {
        dispatch(systemControllersActions.endLoading());
        toast.success("User deleted successfully");
        props?.reload();
      }
    } catch (error) {
      dispatch(systemControllersActions.endLoading());
      toast.error(error.message);
    } finally {
      closeDialog();
    }
  };

  return (
    <>
      <ConfirmAction
        type="delete-modal"
        open={open}
        closeDialog={closeDialog}
        focusText={focusUser.fullName}
        confirmAction={confirmDelete}
        title="Are you sure you want to delete"
        description="This action is permanent and can not be reversed"
      />
      <Box className="users-table">
        <CustomTable headers={tableHeads}>
          {props?.tableRows?.map((row, index) => (
            <StyledTableRow props={props} hover key={index}>
              <StyledTableCell className="capitalize" component="th" scope="row">
                {row?.fullName?.toLowerCase()}
              </StyledTableCell>
              <StyledTableCell>{row?.emailAddress?.toLowerCase()}</StyledTableCell>
              <StyledTableCell>{row?.role}</StyledTableCell>
              <StyledTableCell>
                <TextActions onEdit={() => props.onEdit(row)} onDelete={openDialog} row={row} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </CustomTable>
      </Box>
    </>
  );
};

export default UsersTable;
