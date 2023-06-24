import Axios from "../../config/Axios";
import { generateRequestId } from "../../utils/helperFunctions";

export const verifyStaffEmail = async (email) => {
  const payload = email;
  payload.requestId = generateRequestId();
  try {
    const response = await Axios.post("/staff/isvalidemail", payload);
    const data = await response?.data?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const createStaff = async (details) => {
  const payload = details;
  payload.requestId = generateRequestId();
  try {
    const response = await Axios.post("/staff", payload);
    const data = await response?.data?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const updateStaff = async (details) => {
  const payload = details;
  payload.requestId = generateRequestId();
  try {
    const response = await Axios.put("/staff", payload);
    const data = await response?.data?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const deleteStaff = async (id) => {
  try {
    const response = await Axios.post(`/staff/delete?staffId=${id}`);
    const data = await response?.data?.data;

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const allStaff = async (params, page = 1) => {
  try {
    const response = await Axios(`/staffs?page=${page}&limit=15`, { params });
    const data = await response?.data?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const getGraphData = async (range) => {
  try {
    const response = await Axios(`/staff/dashboard-data?range=${range}`);
    const data = await response?.data?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};