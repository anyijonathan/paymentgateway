import "./index.css";
import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Dialog, IconButton, InputAdornment, TextField } from "@mui/material";

import SuccessModalContent from "../../components/modals/table modals/admin/SuccessModalContent";
import { changeDefaultPassword } from "../../services/actions/authentication.actions";
import { systemControllersActions } from "../../services/reducers/system.reducer";
import { changePasswordSchema } from "../../utils/formikFormValidators";
import useLogout from "../../services/hooks/useLogout";
import FormContainer from "./formContainer";
import Loader from "../../utils/Loader";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const logoutUser = useLogout();
  const emailAddress = useSelector((state) => state?.userAuth?.emailAddress);
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState({
    new: false,
    confirm: false,
  });

  const formik = useFormik({
    initialValues: {
      emailAddress: emailAddress,
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: (values) => {
      passwordChangeHandler(values);
    },
  });

  const handleClickShow = (prop) => (e) => {
    setShow({
      ...show,
      [prop]: !show[prop],
    });
  };
  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  const passwordChangeHandler = async (prop) => {
    dispatch(systemControllersActions.startLoading());

    const payload = { ...prop };

    try {
      const result = await changeDefaultPassword(payload);
      if (result) {
        dispatch(systemControllersActions.endLoading());
        toast.success("Password change successful");
        setSuccess(true);
      }
    } catch (error) {
      dispatch(systemControllersActions.endLoading());
      toast.error(error.message);
    } finally {
      dispatch(systemControllersActions.endLoading());
    }
  };

  return (
    <>
      <Box className="change-password-container">
        <Loader />
        <FormContainer sub="Change default password">
          <form className="change-password-form" onSubmit={formik.handleSubmit}>
            <div className="form-fields">
              <TextField
                name="newPassword"
                label="New Password"
                id="newPassword"
                className="input-section"
                fullWidth
                required
                type={show.new ? "text" : "password"}
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                helperText={formik.touched.newPassword && formik.errors.newPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShow("new")}
                        onMouseDown={handleMouseDown}
                        edge="end"
                      >
                        {show?.new ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                className="input-section"
                fullWidth
                required
                type={show.confirm ? "text" : "password"}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShow("confirm")}
                        onMouseDown={handleMouseDown}
                        edge="end"
                      >
                        {show?.confirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="action-buttons">
              <Button
                sx={{
                  height: "55px",
                  fontSize: "16px",
                }}
                className="gradient"
                type="submit"
                variant="contained"
                disableElevation
              >
                Change Password
              </Button>
              <p onClick={() => logoutUser()} style={{ cursor: "pointer" }} className="forgot-link">
                Logout
              </p>
            </div>
          </form>
        </FormContainer>
      </Box>
      <Dialog className="modal-dialog user-modal" open={success} onClose={() => logoutUser()} maxWidth="xs" fullWidth>
        <Box className="modal-dialog-inner">
          <SuccessModalContent
            header="Default password changed successfully!"
            subHeader="you would need to login again to proceed"
            actionText="Proceed"
            closeModal={() => logoutUser()}
          />
        </Box>
      </Dialog>
    </>
  );
};

export default ChangePassword;
