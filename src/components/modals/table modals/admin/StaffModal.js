import "../index.css";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
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

import { createStaff, updateStaff, verifyStaffEmail } from "../../../../services/actions/staffAdmin.actions";
import { systemControllersActions } from "../../../../services/reducers/system.reducer";
import ModalLayout from "../ModalLayout";
import { validateEmailSchema } from "../../../../utils/formikFormValidators";
import { FCMBEmailStructure } from "../../../../utils/constants";

const StaffModal = (props) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState();
  const [emailVerified, setEmailVerified] = useState(false);
  const isCreate = props.title.toLowerCase().includes("new");
  const isEdit = props.title.toLowerCase().includes("edit");
  const roles = ["SuperAdmin", "Maker", "Checker"];

  useEffect(() => {
    setValues((prev)=>({...prev,...props.initialValues}));
  }, [props.initialValues]);

  const inputChangeHandler = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const formik = useFormik({
    initialValues: {
      emailAddress: "",
    },
    validationSchema: validateEmailSchema,
    onSubmit: (values, { resetForm }) => {
      verifyEmailHandler(values);
      resetForm();
    },
  });

  const verifyEmailAPI = async (prop) => {
    dispatch(systemControllersActions.startLoading());
    const payload = prop;
    try {
      const data = await verifyStaffEmail(payload);
      if (data) {
        setValues({ ...values, ...data });
        setEmailVerified(true);
      }
    } catch (error) {
      dispatch(systemControllersActions.endLoading());
      toast.error(error.message);
    } finally {
      dispatch(systemControllersActions.endLoading());
    }
  };

  const verifyEmailManually = (prop) => {
    dispatch(systemControllersActions.startLoading());
    const emailAddress = prop?.emailAddress;
    const fullName = emailAddress.split("@")[0];
    const firstName = fullName?.split(".")[0];
    const lastName = fullName?.split(".")[1];
    setValues({ ...values, emailAddress, firstName, lastName, staffId:"" });
    setEmailVerified(true);
    dispatch(systemControllersActions.endLoading());
  };

  const verifyEmailHandler = async (prop) => {
    verifyEmailManually(prop); //change to verifyEmailAPI when the API is ready
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(systemControllersActions.startLoading());
    let payload = { ...values };

    try {
      const response = await (isCreate ? createStaff(payload) : updateStaff(payload));
      if (response) {
        toast.success(response);
        props.closeModal();
        setEmailVerified(false);
        props.reload();
      }
    } catch (error) {
      dispatch(systemControllersActions.endLoading());
      toast.error(error.message);
    } finally {
      dispatch(systemControllersActions.endLoading());
    }
  };

  const closeModal = () => {
    setEmailVerified(false);
    props.closeModal();
  };

  return (
    <ModalLayout className="user-modal" open={props.open} closeModal={closeModal} title={props.title}>
      {isCreate && !emailVerified && (
        <form className="modal-body" onSubmit={formik.handleSubmit}>
          <DialogContent className="form-content">
            <TextField
              name="emailAddress"
              label="Email"
              id="emailAddress"
              className="input-section"
              type="email"
              fullWidth
              required
              value={formik.values.emailAddress}
              onChange={formik.handleChange}
              error={formik.touched.emailAddress && Boolean(formik.errors.emailAddress)}
              helperText={formik.touched.emailAddress && formik.errors.emailAddress}
            />
          </DialogContent>
          <DialogActions className="modal-actions">
            <Button
              className="action-btn"
              onClick={() => {
                setEmailVerified(false);
                props.closeModal();
              }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              className="action-btn"
              variant="contained"
              color="primary"
              type="submit"
              disableElevation
              disabled={!formik.values.emailAddress.match(FCMBEmailStructure)}
            >
              Verify Email
            </Button>
          </DialogActions>
        </form>
      )}
      {(emailVerified || isEdit) && (
        <form className="modal-body" onSubmit={submitHandler}>
          <DialogContent className="form-content">
            <TextField
              id="fname"
              className="modal-input"
              label="First Name"
              variant="outlined"
              fullWidth
              value={values?.firstName ||""}
              disabled
            />
            <TextField
              id="lname"
              className="modal-input"
              label="Last Name"
              variant="outlined"
              fullWidth
              value={values?.lastName ||""}
              disabled
            />
            <TextField
              id="email"
              className="modal-input"
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              disabled
              value={values?.emailAddress ||""}
            />
            <TextField
              id="staffId"
              className="modal-input"
              label="Staff ID"
              variant="outlined"
              fullWidth
              value={values?.staffId||""}
              disabled={isEdit}
              onChange={inputChangeHandler("staffId")}
            />
            <FormControl required className="modal-select">
              <InputLabel>Role</InputLabel>
              <Select id="role" value={values.role} label="Role" onChange={inputChangeHandler("role")}>
                {roles.map((role, indx) => (
                  <MenuItem key={indx} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions className="modal-actions">
            <Button
              className="action-btn"
              onClick={() => {
                setEmailVerified(false);
                props.closeModal();
              }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button className="action-btn" variant="contained" color="primary" type="submit" disableElevation>
              {props.title.toLowerCase().includes("new") ? "Add User" : "Update User"}
            </Button>
          </DialogActions>
        </form>
      )}
    </ModalLayout>
  );
};

export default StaffModal;
