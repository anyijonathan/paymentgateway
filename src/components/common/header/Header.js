import "./index.css";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IMAGES } from "../../../assets";

const Header = () => {
  const isLoggedIn = useSelector((state) => state?.userAuth?.isLoggedIn);
  const navigate = useNavigate();
  return (
    <div className="header-container">
      <div
        className="logo"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={IMAGES.logo} alt="FCMB Logo" />
      </div>
      <div className="buttons">
        <Button
          variant="outlined"
          sx={{
            width: "147px",
            height: "40px",
            fontSize: "14px",
          }}
          onClick={() => navigate("/login")}
        >
          {isLoggedIn ? "Dashboard" : "Sign In"}
        </Button>
      </div>
    </div>
  );
};

export default Header;
