import "./index.css";
import { toast } from "react-toastify";
import { Box, Stack } from "@mui/material";
import { useState, useCallback, useEffect } from "react";

import NotificationGroup from "../../../components/merchant/NotificationGroup";
import { getRestNotificationsState, updateNotifications } from "../../../services/actions/notifications.actions";

const Notifications = () => {
  const empty = {
    push: false,
    sms: false,
    email: false,
  };
  const [accountUpdates, setAccountUpdates] = useState(empty);
  const [paymentAlerts, setPaymentAlerts] = useState(empty);

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await getRestNotificationsState();
      setAccountUpdates({ ...response?.account });
      setPaymentAlerts({ ...response?.payment });
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleChange = (prop) => async (event) => {
    try {
      const response = await updateNotifications(prop, event.target.name, event.target.checked);
      if (response) {
        switch (response?.class) {
          case "account":
            setAccountUpdates({
              ...accountUpdates,
              [response?.deliveryType]: response?.status,
            });
            break;
          case "payment":
            setPaymentAlerts({
              ...paymentAlerts,
              [response?.deliveryType]: response?.status,
            });
            break;
          default:
            return;
        }
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };
  return (
    <Box className="notifications-settings-container">
      <Stack gap="10px">
        <h1 className="title">Notification Settings</h1>
        <p className="sub-title">We may still send you important information about your account your settings</p>
      </Stack>
      <div className="settings-form">
        <NotificationGroup
          title="Account updates"
          subtitle="New log in, roles and permissions"
          hideSMS={true}
          state={accountUpdates}
          onChange={handleChange("account")}
        />
        <hr />
        <NotificationGroup
          title="Payment Alerts"
          subtitle="Credits, errors, and successful transactions"
          hideSMS={true}
          state={paymentAlerts}
          onChange={handleChange("payment")}
        />
      </div>
    </Box>
  );
};

export default Notifications;
