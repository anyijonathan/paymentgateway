import Axios from "../../config/Axios";
import { downloadFile, generateRequestId } from "../../utils/helperFunctions";

export const verifyMerchantAccountNumber = async (accountNumber) => {
  try {
    const response = await Axios.get(`/AccountInquiry?accountNumber=${accountNumber}`);
    const data = await response?.data?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const createMerchant = async (details) => {
  const payload = details;
  payload.requestId = generateRequestId();
  try {
    const response = await Axios.post("/merchant", payload);
    const data = await response?.data?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const editMerchant = async (details) => {
  const payload = details;
  payload.requestId = generateRequestId();
  try {
    const response = await Axios.post("/merchant/update", payload);
    const data = await response?.data?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const allMerchant = async (page = 1, params) => {
  try {
    const response = await Axios.get(`/merchants?page=${page}&limit=15`, {
      params,
    });
    const data = await response?.data?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const allStatusMerchant = async (status, page = 1) => {
  try {
    const response = await Axios.get(
      `/merchants/merchant-list?query=${status}&page=${page}&limit=15`
    );
    const data = await response?.data?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const getMerchantByAccountNumber = async (accountNumber) => {
  try {
    const response = await Axios.get(`/merchant/search?accountNumber=${accountNumber}`);
    const data = await response?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const deleteMerchant = async (accountNumber) => {
  try {
    const response = await Axios.post(`/merchant/deletion-request?accountNumber=${accountNumber}`);
    const data = await response?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const approveDeletion = async (accountNumber) => {
  try {
    const response = await Axios.post(`/merchant/approve-deletion?accountNumber=${accountNumber}`);
    const data = await response?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const declineDeletion = async (merchantCode, comment) => {
  let payload;
  if (comment) {
    payload = comment;
    payload.requestId = generateRequestId();
  } else {
    payload = {
      message: null,
      requestId: generateRequestId(),
    };
  }

  try {
    const response = await Axios.post(
      `/merchant/decline-delete?merchantCode=${merchantCode}`,
      payload
    );
    const data = await response?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const approveMerchant = async (merchantCode, comment) => {
  let payload;
  if (comment) {
    payload = comment;
    payload.requestId = generateRequestId();
  } else {
    payload = {
      message: null,
      requestId: generateRequestId(),
    };
  }

  try {
    const response = await Axios.post(`/merchant/approve?merchantCode=${merchantCode}`, payload);
    const data = await response?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const declineMerchant = async (merchantCode, comment) => {
  let payload;
  if (comment) {
    payload = comment;
    payload.requestId = generateRequestId();
  } else {
    payload = {
      message: null,
      requestId: generateRequestId(),
    };
  }

  try {
    const response = await Axios.post(`/merchant/decline?merchantCode=${merchantCode}`, payload);
    const data = await response?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const referMerchant = async (merchantCode, comment) => {
  const payload = comment;
  payload.requestId = generateRequestId();
  try {
    const response = await Axios.post(`/merchant/refer?merchantCode=${merchantCode}`, payload);
    const data = await response?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const allComments = async (merchantCode) => {
  try {
    const response = await Axios.get(`/merchant/staff-comments?merchantCode=${merchantCode}`);
    const data = await response?.data?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const downloadMerchants = async (type, params) => {
  try {
    const response = await Axios(`/merchant/merchant-list/export-${type}`, { params });
    const data = await response?.data?.data?.fileContents;
    const dataType = await response?.data?.data?.contentType;
    const fileName = await response?.data?.data?.fileDownloadName;

    downloadFile(data, dataType, fileName);

    return response;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const activateMerchant = async (merchantCode) => {
  try {
    const response = await Axios.post(`/merchant/activate?merchantCode=${merchantCode}`);
    const data = await response?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const deactivateMerchant = async (merchantCode) => {
  try {
    const response = await Axios.post(`/merchant/deactivate?merchantCode=${merchantCode}`);
    const data = await response?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const resubmitMerchant = async (merchantCode) => {
  try {
    const response = await Axios.post(`/merchant/re-submit?merchantCode=${merchantCode}`);
    const data = await response?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const sendMessage = async (merchantCode, details) => {
  const payload = details;
  payload.requestId = generateRequestId();
  try {
    const response = await Axios.post(`/staff/send-message?merchantCode=${merchantCode}`, payload);
    const data = await response?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};
