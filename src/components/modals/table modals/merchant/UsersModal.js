import "../index.css";
import { useState, useEffect } from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import ModalLayout from "../ModalLayout";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { systemControllersActions } from "../../../../services/reducers/system.reducer";
import { createUser, updateUser } from "../../../../services/actions/merchant.actions";

const UsersModal = (props) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const isCreate = props.title.toLowerCase().includes("new");
  const isEdit = props.title.toLowerCase().includes("edit");
  useEffect(() => {
    setValues(props.initialValues);
  }, [props.initialValues]);

  const inputChangeHandler = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(systemControllersActions.startLoading());
    let payload = { ...values };
    if (isEdit) {
      payload = {
        fullName: values?.fullName,
        emailAddress: values?.emailAddress,
        role: values?.role,
      };
    }
    try {
      const response = await (isCreate ? createUser(payload) : updateUser(payload));
      if (response) {
        toast.success(isEdit ? "User updated successfully" : "User created successfully");
        props.closeModal();
        props.reload();
      }
    } catch (error) {
      dispatch(systemControllersActions.endLoading());
      toast.error(error.message);
    } finally {
      dispatch(systemControllersActions.endLoading());
    }
  };

  return (
    <ModalLayout className="user-modal" open={props.open} closeModal={props.closeModal} title={props.title}>
      <form className="modal-body" onSubmit={submitHandler}>
        <DialogContent className="form-content">
          <TextField
            id="name"
            className="modal-input"
            label="Full Name"
            variant="outlined"
            fullWidth
            required
            value={values.fullName}
            onChange={inputChangeHandler("fullName")}
          />
          <TextField
            id="email"
            className="modal-input"
            label="Email Address"
            type="email"
            variant="outlined"
            fullWidth
            required
            disabled={isEdit}
            value={values.emailAddress}
            onChange={inputChangeHandler("emailAddress")}
          />
          <FormControl required className="modal-select">
            <InputLabel>Role</InputLabel>
            <Select id="role" value={values.role} label="Role" onChange={inputChangeHandler("role")}>
              <MenuItem value="MerchantAdmin">MerchantAdmin</MenuItem>
              <MenuItem value="MerchantUser">MerchantUser</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions className="modal-actions">
          <Button className="action-btn" onClick={props.closeModal} variant="outlined">
            Cancel
          </Button>
          <Button className="action-btn" variant="contained" color="primary" type="submit" disableElevation>
            {props.title.toLowerCase().includes("new") ? "Invite User" : "Update User"}
          </Button>
        </DialogActions>
      </form>
    </ModalLayout>
  );
};

export default UsersModal;
