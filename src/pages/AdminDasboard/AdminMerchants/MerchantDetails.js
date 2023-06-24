import "./index.css";
import moment from "moment";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";

import TransactionDetailsLayout from "../../../layouts/dashboard/transactionDetails/TransactionDetailsLayout";
import { systemControllersActions } from "../../../services/reducers/system.reducer";
import {
  activateMerchant,
  allComments,
  deactivateMerchant,
  getMerchantByAccountNumber,
} from "../../../services/actions/staffMakerChecker.actions";
import DashboardLayout from "../../../layouts/dashboard/DashboardLayout";
import CustomBreadcrumbs from "./merchantDetails/CustomBreadcrumbs";
import CheckerActionSet from "./merchantDetails/CheckerActionSet";
import MakerActionSet from "./merchantDetails/MakerActionSet";
import Comments from "./merchantDetails/Comments";

const MerchantDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const page = params.page;
  const location = useLocation();
  const merchantCode = location?.state?.merchantCode;
  const accountNumber = location?.state?.accountNumber;
  const [comment, setComment] = useState(null);
  const [merchant, setMerchant] = useState(location?.state);
  const status = merchant?.approvalStatus?.toLowerCase();
  const accountStatus = merchant?.accountStatus?.toLowerCase();
  const userRole = useSelector((state) => state?.userAuth?.role?.toLowerCase());
  const [isToggled, setIsToggled] = useState(accountStatus === "active" ? true : false);

  const fetchMerchantDetails = useCallback(async () => {
    dispatch(systemControllersActions.startLoading());
    try {
      const response = await getMerchantByAccountNumber(accountNumber);
      if (response) {
        setMerchant(response?.data);
        setIsToggled(response?.data?.accountStatus?.toLowerCase() === "active" ? true : false);
      }
    } catch (error) {
      toast.error("Error fetching merchant details");
    } finally {
      dispatch(systemControllersActions.endLoading());
    }
  }, [dispatch, accountNumber]);

  const fetchComments = useCallback(async () => {
    dispatch(systemControllersActions.startLoading());

    try {
      const result = await allComments(merchantCode);
      if (result) {
        dispatch(systemControllersActions.endLoading());
        setComment(result);
      }
    } catch (error) {
      dispatch(systemControllersActions.endLoading());
      toast.error("error fetching comments");
    }
  }, [dispatch, merchantCode]);

  useEffect(() => {
    fetchComments();
    fetchMerchantDetails();
  }, [fetchComments, fetchMerchantDetails]);

  const toggleHandler = async () => {
    dispatch(systemControllersActions.startLoading());

    try {
      const result = await (isToggled
        ? deactivateMerchant(merchant.merchantCode)
        : activateMerchant(merchant.merchantCode));
      if (result) {
        dispatch(systemControllersActions.endLoading());
        toast.success(result?.data);
        setIsToggled((isToggled) => !isToggled);
      }
    } catch (error) {
      dispatch(systemControllersActions.endLoading());
      toast.error(error.message);
    }
  };

  return (
    <DashboardLayout type="staff">
      <Box className="transaction-container">
        <CustomBreadcrumbs page={page} accountNumber={accountNumber} />
        <div className="transaction-details merchant-details">
          <Box className="payment-details">
            <TransactionDetailsLayout
              title="Merchant Details"
              isToggled={isToggled}
              onToggle={toggleHandler}
              status={status}
              switch={userRole === "checker" ? true : false}
            >
              <div className="details-breakdown">
                <div className="detail name">
                  <p className="label">Account Name</p>
                  <h3 className="value" style={{ textTransform: "capitalize" }}>
                    {merchant?.accountName?.toLowerCase()}
                  </h3>
                </div>
                <div className="detail amount">
                  <p className="label">Account Number</p>
                  <h3 className="value">{merchant?.accountNumber}</h3>
                </div>
                <div className="detail method">
                  <p className="label">Merchant Code</p>
                  <h3 className="value">FCMB{merchant?.merchantCode}</h3>
                </div>
                <div className="detail date">
                  <p className="label">Email Address</p>
                  <h3 className="value">{merchant?.emailAddress?.toLowerCase()}</h3>
                </div>
                <div className="detail bank">
                  <p className="label">Phone Number</p>
                  <h3 className="value">{merchant?.phoneNumber}</h3>
                </div>
                <div className="detail country">
                  <p className="label">Residential Address</p>
                  <h3 className="value" style={{ textTransform: "capitalize" }}>
                    {merchant?.merchantAddress?.toLowerCase()}, {merchant?.city?.toLowerCase()},{" "}
                    {merchant?.merchantState?.toLowerCase()}.
                  </h3>
                </div>
              </div>
            </TransactionDetailsLayout>
          </Box>
          <Box className="transaction-status" id="purple-details--box">
            <TransactionDetailsLayout title="Account Details" className="purple-details--box">
              <div className="status-details">
                <div className="refund">
                  <p className="label">Date/Time Created</p>
                  <h3 className="value font-medium text-center">
                    {moment(merchant?.dateCreated).format("MM/DD/YYYY")} <br />{" "}
                    {moment(merchant?.dateCreated).format("HH:MM:SS")}
                  </h3>
                </div>
                <div className="chargeback">
                  <p className="label">Created By</p>
                  <h3 className="value font-medium text-center">{merchant?.createdBy}</h3>
                </div>
              </div>
              <div className="status-details">
                <div className="refund">
                  <p className="label">Supervisor</p>
                  <p className="value font-medium text-center">{merchant?.supervisor}</p>
                </div>
                <div className="chargeback items-start">
                  <p className="label">Approval Status</p>
                  <p className="value capitalize" id={status}>
                    {merchant?.approvalStatus}
                  </p>
                </div>
              </div>
            </TransactionDetailsLayout>
          </Box>
        </div>
        {comment && comment?.length > 0 && <Comments comment={comment} />}
        {userRole === "maker" && (
          <MakerActionSet
            reload={fetchMerchantDetails}
            info={merchant}
            refreshComments={fetchComments}
          />
        )}
        {userRole === "checker" && (
          <CheckerActionSet
            info={merchant}
            reload={fetchMerchantDetails}
            refreshComments={fetchComments}
          />
        )}
      </Box>
    </DashboardLayout>
  );
};

export default MerchantDetails;
