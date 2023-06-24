import Axios from "../../config/Axios";
import store from "../../store";
import { decrypt, encrypt } from "../../utils/security";
import { generateRequestId } from "../../utils/helperFunctions";

export const userLogout = async (token, refreshToken) => {
  const payload = {
    token: token,
    refreshToken: refreshToken,
  };
  try {
    const response = await Axios.post("/auth/logout", payload);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const staffLogin = async (details) => {
  const payload = details;
  payload.requestId = generateRequestId();
  try {
    const response = await Axios.post("/staff/login", payload);
    const data = await response?.data?.data;
    data.isLoggedIn = true;
    localStorage.setItem("PGP", encrypt(JSON.stringify(data)));

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const merchantLogin = async (details) => {
  const payload = details;
  payload.requestId = generateRequestId();
  try {
    const response = await Axios.post("/auth/login", payload);
    const data = await response?.data?.data;
    data.isLoggedIn = true;

    localStorage.setItem("PGP", encrypt(JSON.stringify(data)));

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const merchantSendResetMail = async (email) => {
  try {
    const response = await Axios(`/auth/forget-password?emailAddress=${email}`);
    const data = await response?.data?.data;

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const merchantResetPassword = async (details) => {
  const payload = details;
  payload.requestId = generateRequestId();
  try {
    const response = await Axios.put("/auth/reset-password", payload);
    const data = await response?.data?.data;

    return data;
  } catch (error) {
    if (error.response) {
    }
    throw new Error(error.response?.data?.data);
  }
};

export const changeDefaultPassword = async (details) => {
  const payload = details;
  payload.requestId = generateRequestId();
  try {
    const response = await Axios.put("/auth/change-default-password", payload);
    const data = await response?.data?.data;

    return data;
  } catch (error) {
    if (error.response) {
    }
    throw new Error(error.response?.data?.data);
  }
};

export const changePassword = async (details) => {
  const payload = details;
  payload.requestId = generateRequestId();
  try {
    const response = await Axios.put("/auth/change-password", payload);
    const data = await response?.data?.data;

    return data;
  } catch (error) {
    if (error.response) {
    }
    throw new Error(error.response?.data?.data);
  }
};

export const refreshAuthToken = async () => {
  const token = store.getState().userAuth?.tokenResponse?.token;
  const refreshToken = store.getState().userAuth?.tokenResponse?.refreshToken;
  const payload = {
    token: token,
    refreshToken: refreshToken,
    requestId: generateRequestId(),
  };

  let currentUserData = JSON.parse(decrypt(localStorage.getItem("PGP")));
  try {
    const response = await Axios.post("/auth/refresh-token", payload);
    if (response) {
      localStorage.clear();
      currentUserData.tokenResponse = response.data.data;
      localStorage.setItem("PGP", encrypt(JSON.stringify(currentUserData)));
      return currentUserData;
    }
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};
