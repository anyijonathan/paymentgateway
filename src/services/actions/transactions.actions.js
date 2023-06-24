import Axios from "../../config/Axios";
import { downloadFile } from "../../utils/helperFunctions";

export const allTransactions = async (params, page = 1, id) => {
  try {
    const response = await Axios(
      `/transactions/search?page=${page}&limit=15${id ? `&merchantId=${id}` : ""}`,
      {
        params,
      }
    );
    const data = await response?.data?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const downloadTransactions = async (type, params) => {
  try {
    const response = await Axios(`/transaction/export-${type}`, { params });
    const data = await response?.data?.data?.fileContents;
    const dataType = await response?.data?.data?.contentType;
    const fileName = await response?.data?.data?.fileDownloadName;

    downloadFile(data, dataType, fileName);

    return response;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const merchantTransactionsOverview = async (merchantId) => {
  try {
    const response = await Axios(`/transaction?MerchantId=${merchantId}`);
    const data = await response?.data?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const allIncome = async (params, page = 1, id) => {
  try {
    const response = await Axios(
      `/transactions/settled?query=${id}&page=${page}&limit=15`,
      {
        params,
      }
    );
    const data = await response?.data?.data;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};

export const downloadIncome = async (type, params) => {
  try {
    const response = await Axios(`/transactions/settled/export-${type}`, { params });
    const data = await response?.data?.data?.fileContents;
    const dataType = await response?.data?.data?.contentType;
    const fileName = await response?.data?.data?.fileDownloadName;

    downloadFile(data, dataType, fileName);

    return response;
  } catch (error) {
    throw new Error(error.response?.data?.data);
  }
};
