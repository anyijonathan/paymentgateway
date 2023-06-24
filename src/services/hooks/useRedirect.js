import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userAuthActions } from "../reducers/userAuth.reducer";
import { stopSignalR } from "../../components/pushNotification/PushNotification";

const useRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirect = useCallback(async () => {
    localStorage.clear();
    const res = dispatch(userAuthActions.logIn());
    if (res) {
      stopSignalR()
      navigate("/login", { replace: true });
    }
  }, [navigate, dispatch]);

  return redirect;
};

export default useRedirect;
