import Axios from "../../config/Axios";
import { generateRequestId } from "../../utils/helperFunctions";
import { decrypt, encrypt } from "../../utils/security";

export const allSubMerchants = async (merchantCode) => {
  try {
    const response = await Axios(`/merchant/sub-users?merchantCode=${merchantCode}`);
    const data = await response?.data?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const createUser = async (details) => {
  const payload = details;
  payload.requestId = generateRequestId();
  try {
    const response = await Axios.post("/merchant/create-user", payload);
    const data = await response?.data?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const updateUser = async (details) => {
  const payload = details;
  payload.requestId = generateRequestId();
  try {
    const response = await Axios.post("/merchant/update-user", payload);
    const data = await response?.data?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const deleteUser = async (emailAddress) => {
  try {
    const response = await Axios.post(`/merchant/delete-user?emailAddress=${emailAddress}`);
    const data = await response?.data?.data;

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const updateProfile = async (details) => {
  const payload = details;
  payload.requestId = generateRequestId();
  try {
    const response = await Axios.post("/merchant/edit-profile", payload);
    const data = await response?.data?.data;
    let decryptedData = JSON.parse(decrypt(localStorage.getItem("PGP")));
    const storedData = { ...decryptedData, ...data };
    localStorage.setItem("PGP", encrypt(JSON.stringify(storedData)));
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const fetchToken = async (merchantCode) => {
  try {
    const response = await Axios(`/merchant/access-key?merchantCode=${merchantCode}`);
    const data = await response?.data?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};
