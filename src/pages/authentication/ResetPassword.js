import "./index.css";
import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";

import Loader from "../../utils/Loader";
import { merchantResetPassword } from "../../services/actions/authentication.actions";
import { systemControllersActions } from "../../services/reducers/system.reducer";
import { changePasswordSchema } from "../../utils/formikFormValidators";
import FormContainer from "./formContainer";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resetComplete, setResetComplete] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const emailAddress = searchParams.get("emailAddress");

  const [show, setShow] = useState({
    new: false,
    confirm: false,
  });

  const formik = useFormik({
    initialValues: {
      emailAddress: emailAddress,
      token: token,
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: (values) => {
      passwordResetHandler(values);
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

  const passwordResetHandler = async (prop) => {
    dispatch(systemControllersActions.startLoading());

    const payload = { ...prop };

    try {
      const result = await merchantResetPassword(payload);
      if (result) {
        dispatch(systemControllersActions.endLoading());
        toast.success("Password change successful");
        setResetComplete(true);
      }
    } catch (error) {
      dispatch(systemControllersActions.endLoading());
      setResetComplete(false);
    } finally {
      dispatch(systemControllersActions.endLoading());
    }
  };

  if (!token || !emailAddress) {
    return <Navigate to="/not-found" />;
  }

  return (
    <Box className="reset-container">
      <Loader />
      <FormContainer sub="Reset your password">
        {!resetComplete && (
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
                error={
                  formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)
                }
                helperText={
                  formik.touched.newPassword && formik.errors.newPassword
                }
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
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
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
              <Link to={"/"} replace className="forgot-link">
                Cancel
              </Link>
            </div>
          </form>
        )}
        {resetComplete && (
          <div className="confirmation">
            <p className="message">
              Your Password has been reset successfully!
            </p>
            <div className="action-buttons">
              <Button
                variant="contained"
                sx={{
                  height: "55px",
                  fontSize: "16px",
                }}
                disableElevation
                className="gradient"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Sign In
              </Button>
            </div>
          </div>
        )}
      </FormContainer>
    </Box>
  );
};

export default ResetPassword;
