import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userAuthActions } from "../reducers/userAuth.reducer";
import { userLogout } from "../actions/authentication.actions";
import { stopSignalR } from "../../components/pushNotification/PushNotification";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state?.userAuth?.tokenResponse?.token);
  const refreshToken = useSelector((state) => state?.userAuth?.tokenResponse?.refreshToken);

  const logoutUser = async () => {
    try {
      const response = await userLogout(token, refreshToken);
      if (response) {
        localStorage.clear();
        const res = dispatch(userAuthActions.logIn());
        if (res) {
          stopSignalR()
          navigate("/login", { replace: true });
        }
      }
    } catch (error) {
      throw new Error(error.response?.data?.data);
    }
  };

  return logoutUser;
};

export default useLogout;
