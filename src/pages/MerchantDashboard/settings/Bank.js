import { Box } from "@mui/material";
import { useSelector } from "react-redux";

import BankCard from "../../../components/merchant/BankCard";

const Bank = () => {
  const accountNumber =
    useSelector((state) => state?.userAuth?.accountNumber)?.toLowerCase() || "";
  return (
    <Box className="bank-settings-container">
      <h1 className="title">Bank Information</h1>
      <div className="settings-form">
        <BankCard
          id="main"
          bankName="First City Monument Bank (FCMB)"
          accountNumber={accountNumber}
          currency="Naira (NGN)"
          status="Primary"
        />
      </div>
    </Box>
  );
};

export default Bank;
