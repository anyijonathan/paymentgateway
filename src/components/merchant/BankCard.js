import "./index.css";
import { Box, Button } from "@mui/material";

import { IMAGES } from "../../assets";

const BankCard = (props) => {
  return (
    <Box
      className={`bank-card-container ${
        !props.id.includes("main") ? "other-bank-card" : ""
      }`}
    >
      <div className="bank-details">
        <div className="logo">
          <img src={IMAGES.logo} alt="FCMB Logo" />
        </div>
        <div className="details">
          <div className="account-details">
            <h1 className="bank-name">{props.bankName}</h1>
            <div className="account">
              <p>{props.accountNumber}</p>
              <p>{props.currency}</p>
            </div>
          </div>
        </div>
      </div>
      <Button
        className="status-btn"
        id={props.id}
        variant="outlined"
        color="primary"
        disableElevation
        disableRipple
      >
        {props.status}
      </Button>
    </Box>
  );
};

export default BankCard;
