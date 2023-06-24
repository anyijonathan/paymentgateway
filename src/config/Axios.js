import axios from "axios";
import { useEffect } from "react";

import store from "../store";
import config from "./config.json";
import { decrypt, encrypt } from "../utils/security";
import useRedirect from "../services/hooks/useRedirect";

const Axios = axios.create({
  baseURL: config.SERVER_URL + config.URL_PREFIX,
  headers: {
    "Cross-Origin-Opener-Policy": "same-origin",
    "X-Frame-Options": "SAMEORIGIN",
    "X-Content-Type-Options": "nosniff",
    client_id: process.env.REACT_APP_CLIENT_ID,
  },
});

Axios.interceptors.request.use(
  (request) => {
    const isLoggedIn = store.getState().userAuth.isLoggedIn;
    const token = store.getState().userAuth?.tokenResponse?.token;

    let req = request;

    if (!navigator.onLine) {
      return Promise.reject({
        response: {
          data: { data: "No Internet Connection" },
        },
      });
    }

    if (isLoggedIn) {
      req.headers["Authorization"] = `${token}`;
    } else {
      delete req.headers["Authorization"];
    }

    req.data = { encryptedRequest: encrypt(request.data) };

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const AxiosInterceptor = ({ children }) => {
  const redirect = useRedirect();

  useEffect(() => {
    const resInterceptor = (response) => {
      let res = response;
      res.data = JSON.parse(decrypt(response.data.encryptedResponse));

      return res;
    };

    const resErrInterceptor = (error) => {
      if (!!error?.response?.data) {
        if (error?.response?.data?.description === "access denied") {
          redirect();
        }
        return Promise.reject(error);
      }

      return Promise.reject({
        response: {
          data: { data: error?.message || "An error occurred" },
        },
      });
    };

    const responseInterceptor = Axios.interceptors.response.use(resInterceptor, resErrInterceptor);

    return () => Axios.interceptors.response.eject(responseInterceptor);
  }, [redirect]);

  return children;
};

export default Axios;
export { AxiosInterceptor };
