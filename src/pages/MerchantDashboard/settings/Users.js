import { useCallback, useEffect, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import UsersModal from "../../../components/modals/table modals/merchant/UsersModal";
import { systemControllersActions } from "../../../services/reducers/system.reducer";
import { allSubMerchants } from "../../../services/actions/merchant.actions";
import UsersTable from "../../../components/tables/merchant/UsersTable";

const Users = () => {
  const dispatch = useDispatch();
  const merchantCode = useSelector((state) => state?.userAuth?.merchantCode);
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [tableRows, setTableRows] = useState([]);

  const emptyUser = {
    fullName: "",
    emailAddress: "",
    role: "",
  };
  const [initialValues, setInitialValues] = useState(emptyUser);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setModalTitle("");
    setInitialValues(emptyUser);
    setOpen(false);
  };

  const editUserHandler = (prop) => {
    setInitialValues(prop);
    setModalTitle("Edit " + prop.fullName);
    openModal();
  };

  const createUserHandler = () => {
    setInitialValues(emptyUser);
    setModalTitle("Invite New User");
    openModal();
  };

  const fetchAllUsers = useCallback(async () => {
    dispatch(systemControllersActions.startLoading());
    try {
      const response = await allSubMerchants(merchantCode);
      if (response) {
        setTableRows(response);
      }
    } catch (error) {
      dispatch(systemControllersActions.endLoading());
      toast.error("Couldn't fetch users data at this time");
    } finally {
      dispatch(systemControllersActions.endLoading());
    }
  }, [dispatch, merchantCode]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <>
      <UsersModal
        open={open}
        closeModal={closeModal}
        initialValues={initialValues}
        title={modalTitle}
        reload={() => fetchAllUsers()}
      />
      <Box className="users-settings-container">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <h1 className="title">Account Users</h1>
          <Button
            className="invite-user-button"
            variant="contained"
            disableElevation
            onClick={createUserHandler}
            disabled={tableRows.length >= 5}
          >
            <Stack className="user-invite" gap="10px" alignItems="center" direction="row">
              <AddIcon />
              Invite New User
            </Stack>
          </Button>
        </Stack>
        {tableRows.length > 0 && (
          <UsersTable tableRows={tableRows} onEdit={editUserHandler} reload={() => fetchAllUsers()} />
        )}
      </Box>
    </>
  );
};

export default Users;
