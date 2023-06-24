import Axios from "../../config/Axios";
import { generateRequestId } from "../../utils/helperFunctions";

export const getRestNotificationsState = async () => {
  try {
    const response = await Axios("/Notifications/settings");
    const data = await response?.data?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const updateNotifications = async (group, type, status) => {
  const payload = {
    requestId: generateRequestId(),
    class: group,
    deliveryType: type,
    status: status,
  };
  try {
    const response = await Axios.patch("/Notifications/settings", payload);
    const data = await response?.data?.data;
    if (data) {
      return payload;
    }
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const getNotifications = async (unread = false, limit = 15, date) => {
  try {
    const response = await Axios(
      `/Notifications?unread=${unread}${limit ? "&take=" + limit : ""}${date ? "&lastSeen=" + date : ""}`
    );
    const data = await response?.data?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};
