import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { refreshAuthToken } from "../services/actions/authentication.actions";
import { userAuthActions } from "../services/reducers/userAuth.reducer";
import { calculateSessionTime } from "./helperFunctions";
import useLogout from "../services/hooks/useLogout";

let timer;
let refresh;

const SessionTimeout = () => {
  const dispatch = useDispatch();
  const logoutUser = useLogout();
  const jwtTokenExpiry = useSelector((state) => state?.userAuth?.tokenResponse?.jwtTokenExpiry);

  const refreshHandler = useCallback(async () => {
    try {
      const response = await refreshAuthToken();
      if (response) {
        dispatch(userAuthActions.logIn(response));
      }
    } catch (error) {
      return;
    } finally {
    }
  }, [dispatch]);

  clearTimeout(refresh);
  timer = calculateSessionTime(jwtTokenExpiry);
  const twoMins = 2 * 60 * 1000;

  if (!timer) {
    logoutUser();
    return;
  }

  if (timer <= 2 * 60 * 1000) {
    refreshHandler();
    return;
  }

  refresh = setTimeout(() => {
    refreshHandler();
  }, timer - twoMins);

  return <></>;
};

export default SessionTimeout;
