import "./index.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Button, TextField } from "@mui/material";
import { toast } from "react-toastify";

import { merchantSendResetMail } from "../../services/actions/authentication.actions";
import { systemControllersActions } from "../../services/reducers/system.reducer";

import Loader from "../../utils/Loader";
import FormContainer from "./formContainer";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState("");
  const [resetComplete, setResetComplete] = useState(false);

  const onChangeHandler = (e) => {
    setEmailAddress(e.target.value);
  };

  const resetHandler = async (e) => {
    e.preventDefault();
    dispatch(systemControllersActions.startLoading());

    try {
      const result = await merchantSendResetMail(emailAddress);
      if (result) {
        dispatch(systemControllersActions.endLoading());
        toast.success("Reset successful");
        setResetComplete(true);
      }
    } catch (error) {
      setResetComplete(false);
      dispatch(systemControllersActions.endLoading());
      toast.error(error.message);
    } finally {
      dispatch(systemControllersActions.endLoading());
    }
  };

  return (
    <Box className="reset-container">
      <Loader />
      <FormContainer sub="Reset your password">
        {!resetComplete && (
          <form onSubmit={resetHandler} className="reset-form">
            <div className="form-fields">
              <TextField
                name="emailAddress"
                label="Email"
                id="emailAddress"
                className="input-section"
                type="email"
                fullWidth
                required
                value={emailAddress}
                onChange={onChangeHandler}
              />
            </div>
            <div className="action-buttons">
              <Button
                variant="contained"
                disableElevation
                sx={{
                  height: "55px",
                  fontSize: "16px",
                }}
                className="gradient"
                type="submit"
              >
                Reset Password
              </Button>
              <Link to={"/login"} className="forgot-link">
                Back to login
              </Link>
            </div>
          </form>
        )}
        {resetComplete && (
          <div className="confirmation">
            <p className="message">
              We just sent a recovery email to{" "}
              <span className="text-purple font-medium">
                {emailAddress?.toLowerCase()}
              </span>
              <br />
              Please click the link to create a new password.
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

export default ForgotPassword;
