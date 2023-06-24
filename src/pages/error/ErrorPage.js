import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import FormContainer from "../authentication/formContainer";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Box className="error-container">
      <FormContainer sub="404! PAGE NOT FOUND">
        <div className="confirmation">
          <p className="message">
            Sorry, the page you are looking for could not been found. Try
            checking the URL for errors, then hit the refresh button on your
            browser.
          </p>
          <div className="action-buttons">
            <Button
              disableElevation
              variant="contained"
              sx={{
                height: "55px",
                fontSize: "16px",
                boxShadow: "none",
              }}
              className="gradient"
              onClick={() => {
                navigate(-1);
              }}
            >
              Go back
            </Button>
          </div>
        </div>
      </FormContainer>
    </Box>
  );
};

export default ErrorPage;
