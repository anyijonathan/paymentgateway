import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, InputAdornment, Stack, TextField } from "@mui/material";

import { changePassword, merchantSendResetMail } from "../../../services/actions/authentication.actions";
import { systemControllersActions } from "../../../services/reducers/system.reducer";
import ConfirmAction from "../../../components/modals/confirmation/ConfirmAction";
import { resetPasswordSchema } from "../../../utils/formikFormValidators";
import useLogout from "../../../services/hooks/useLogout";

const SwitchPassword = () => {
  const dispatch = useDispatch();
  const logoutUser = useLogout();
  const email = useSelector((state) => state?.userAuth?.emailAddress)?.toLowerCase();
  const [reset, setReset] = useState(false);
  const [show, setShow] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      changePasswordHandler(values);
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

  const confirmReset = async () => {
    dispatch(systemControllersActions.startLoading());

    try {
      const result = await merchantSendResetMail(email);
      if (result) {
        dispatch(systemControllersActions.endLoading());
        toast.success("Password reset successful");
        setReset(false);
        logoutUser();
      }
    } catch (error) {
      dispatch(systemControllersActions.endLoading());
      toast.error(error.message);
    }
  };

  const changePasswordHandler = async (prop) => {
    dispatch(systemControllersActions.startLoading());

    const payload = { ...prop };

    try {
      const result = await changePassword(payload);
      if (result) {
        dispatch(systemControllersActions.endLoading());
        toast.success("Password change successful");
        formik.resetForm()
      }
    } catch (error) {
      dispatch(systemControllersActions.endLoading());
      toast.error(error.message);
    }
  };

  return (
    <>
      <ConfirmAction
        type="reset-email-modal"
        open={reset}
        closeDialog={() => setReset(false)}
        confirmAction={confirmReset}
        focusText="Are you sure you want to reset your password?"
        description="you will be logged out immediately and a mail will be sent to your registered email with a reset link"
      />
      <Box className="password-settings-container">
        <h1 className="title">Change Password</h1>
        <form className="settings-form" onSubmit={formik.handleSubmit}>
          <div className="form-fields">
            <Stack gap="5px" alignItems="flex-end" direction="column">
              <p className="forgot-password text-purple" onClick={() => setReset(true)}>
                Forgot Password?
              </p>
              <TextField
                name="oldPassword"
                label="Old Password"
                id="oldPassword"
                className="input-section"
                fullWidth
                required
                type={show.oldPassword ? "text" : "password"}
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
                error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShow("oldPassword")}
                        onMouseDown={handleMouseDown}
                        edge="end"
                      >
                        {show?.oldPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <TextField
              name="newPassword"
              label="New Password"
              id="newPassword"
              className="input-section"
              fullWidth
              required
              type={show.newPassword ? "text" : "password"}
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              helperText={formik.touched.newPassword && formik.errors.newPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShow("newPassword")}
                      onMouseDown={handleMouseDown}
                      edge="end"
                    >
                      {show?.newPassword ? <VisibilityOff /> : <Visibility />}
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
              type={show.confirmPassword ? "text" : "password"}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShow("confirmPassword")}
                      onMouseDown={handleMouseDown}
                      edge="end"
                    >
                      {show?.confirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Button type="submit" className="save-changes-btn" color="primary" variant="contained" disableElevation>
            Update Password
          </Button>
        </form>
      </Box>
    </>
  );
};

export default SwitchPassword;
