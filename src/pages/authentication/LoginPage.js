import "./index.css";
import * as yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, InputAdornment, TextField } from "@mui/material";

import { staffLogin, merchantLogin } from "../../services/actions/authentication.actions";
import { merchantLoginSchema, staffLoginSchema } from "../../utils/formikFormValidators";
import { systemControllersActions } from "../../services/reducers/system.reducer";
import { userAuthActions } from "../../services/reducers/userAuth.reducer";

import FormContainer from "./formContainer";
import Loader from "../../utils/Loader";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [toggle, setToggle] = useState({
    showPassword: false,
    showToken: false,
  });

  const formik = useFormik({
    initialValues: {
      emailAddress: "",
      password: "",
      token: "",
    },
    validationSchema: () =>
      yup.lazy((values) => {
        if (values.emailAddress?.includes("@fcmb.com")) {
          return staffLoginSchema;
        } else {
          return merchantLoginSchema;
        }
      }),
    onSubmit: (values) => {
      loginHandler(values);
    },
  });

  const isStaff = formik.values.emailAddress.includes("@fcmb.com");

  const transition = useTransition(isStaff, {
    from: { x: 0, y: -40, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 0, y: -40, opacity: 0 },
  });

  const handleClickShow = (prop) => (e) => {
    setToggle({
      ...toggle,
      [prop]: !toggle[prop],
    });
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  const loginHandler = async (prop) => {
    dispatch(systemControllersActions.startLoading());

    const loginDetails = { ...prop };

    if (!isStaff) {
      delete loginDetails.token;
    }

    try {
      const result = await (isStaff ? staffLogin(loginDetails) : merchantLogin(loginDetails));
      if (result) {
        dispatch(systemControllersActions.endLoading());
        const res = dispatch(userAuthActions.logIn(result));
        if (res) {
          toast.success("Login successful");
          navigate(`/${result.userType?.toLowerCase()}/overview`, {
            replace: true,
          });
        } else {
          localStorage.clear();
          throw new Error("Login failed");
        }
      }
    } catch (error) {
      dispatch(systemControllersActions.endLoading());
      toast.error(error.message);
    } finally {
      dispatch(systemControllersActions.endLoading());
    }
  };

  return (
    <Box className="login-container">
      <Loader />
      <FormContainer sub="Sign in to your account">
        <form onSubmit={formik.handleSubmit} className="login-form">
          <div className="form-fields">
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
            <TextField
              name="password"
              label="Password"
              id="password"
              className="input-section"
              fullWidth
              required
              type={toggle?.showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShow("showPassword")}
                      onMouseDown={handleMouseDown}
                      edge="end"
                    >
                      {toggle?.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {transition(
              (style, item) =>
                item && (
                  <animated.div style={style}>
                    <TextField
                      name="token"
                      label="Staff Token"
                      id="token"
                      className="input-section"
                      fullWidth
                      required
                      type={toggle?.showToken ? "text" : "password"}
                      value={formik.values.token}
                      onChange={formik.handleChange}
                      error={formik.touched.token && Boolean(formik.errors.token)}
                      helperText={formik.touched.token && formik.errors.token}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle token visibility"
                              onClick={handleClickShow("showToken")}
                              onMouseDown={handleMouseDown}
                              edge="end"
                            >
                              {toggle.showToken ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </animated.div>
                )
            )}
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
              Sign In
            </Button>
            <Link to={"/forgot-password"} className="forgot-link">
              Forgot Password?
            </Link>
          </div>
        </form>
      </FormContainer>
    </Box>
  );
};
export default LoginPage;
