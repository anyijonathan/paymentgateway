import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../assets";
import Spinner from "../../utils/Spinner";

const FormContainer = (props) => {
  const navigate = useNavigate();
  return (
    <div className="auth-container">
      <div className="form-container">
        <Spinner />
        <div className="form-header">
          <div
            className="logo"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={IMAGES.logo} alt="FCMB Logo" />
          </div>
          <p className="sub">{props.sub}</p>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default FormContainer;
