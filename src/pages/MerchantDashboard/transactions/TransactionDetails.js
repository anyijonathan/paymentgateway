import "../index.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { Alert, Box, Breadcrumbs, Typography } from "@mui/material";

import DashboardLayout from "../../../layouts/dashboard/DashboardLayout";
import { numberWithCommas } from "../../../utils/helperFunctions";
import TransactionDetailsLayout from "../../../layouts/dashboard/transactionDetails/TransactionDetailsLayout";

const TransactionDetails = () => {
  const params = useParams();
  const location = useLocation();
  const info = location.state;
  const transactionId = params.id;
  return (
    <DashboardLayout type="merchant">
      <Box className="transaction-container">
        <Breadcrumbs
          separator=">"
          sx={{
            fontSize: "14px",
            fontFamily: "General Sans",
            letterSpacing: "0.02em",
          }}
        >
          <Link underline="hover" color="inherit" to="/merchant/transactions">
            Transactions
          </Link>
          <Typography
            color="primary"
            sx={{
              fontSize: "14px",
              fontFamily: "General Sans",
              fontWeight: 500,
            }}
          >
            {transactionId?.toUpperCase()}
          </Typography>
        </Breadcrumbs>
        <div className="transaction-details">
          <Box className="payment-details">
            <TransactionDetailsLayout title="Payment Details">
              <div className="details-breakdown">
                <div className="detail name">
                  <p className="label">Customer Name</p>
                  <h1 className="value">{info?.customerName}</h1>
                </div>
                <div className="detail name">
                  <p className="label">Customer Email</p>
                  <h1 className="value">{info?.customerEmail}</h1>
                </div>
                <div className="detail amount">
                  <p className="label">Amount</p>
                  <h1 className="value">NGN {numberWithCommas(info?.amount)}</h1>
                </div>
                <div className="detail method">
                  <p className="label">Payment Method</p>
                  <h1 className="value">{info?.paymentChannel}</h1>
                </div>
                <div className="detail date">
                  <p className="label">Transaction Date/Time</p>
                  <h1 className="value">{info?.transactionDate}</h1>
                </div>
                <div className="detail bank">
                  <p className="label">Issuing Bank</p>
                  <h1 className="value">{info?.bank}</h1>
                </div>
                <div className="detail country">
                  <p className="label">Issuing Country</p>
                  <h1 className="value">{info?.country}</h1>
                </div>
              </div>
            </TransactionDetailsLayout>
          </Box>
          <Box className="transaction-status">
            <TransactionDetailsLayout title="Transaction Status">
              <Alert
                severity={
                  info?.status?.toLowerCase()?.includes("success")
                    ? "success"
                    : info?.status?.toLowerCase()?.includes("pending")
                    ? "warning"
                    : "error"
                }
                icon={false}
                sx={{ justifyContent: "center" }}
              >
                {info?.status}
              </Alert>
              <div className="status-details">
                <div className="refund">
                  <p className="label">Refund</p>
                  <h1 className="amount">-</h1>
                </div>
                <div className="chargeback">
                  <p className="label">Chargeback</p>
                  <h1 className="amount">NGN {numberWithCommas(info?.amount)}</h1>
                </div>
              </div>
            </TransactionDetailsLayout>
          </Box>
        </div>
      </Box>
    </DashboardLayout>
  );
};

export default TransactionDetails;
