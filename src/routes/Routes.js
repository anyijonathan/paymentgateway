import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AxiosInterceptor } from "../config/Axios";

import StaffRoutes from "./staffRoutes";
import IdleLogout from "../utils/IdleLogout";
import MerchantRoutes from "./merchantRoutes";
import ScrollToTop from "../utils/ScrollToTop";
import Notification from "../utils/Notification";
import SessionTimeout from "../utils/SessionTimeout";

import ErrorPage from "../pages/error/ErrorPage";
import DocxPage from "../pages/documentation/DocxPage";
import LoginPage from "../pages/authentication/LoginPage";
import LandingPage from "../pages/landing page/LandingPage";
import ResetPassword from "../pages/authentication/ResetPassword";
import ForgotPassword from "../pages/authentication/ForgotPassword";
import TermsAndConditions from "../pages/others/TermsAndConditions";

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => state?.userAuth?.isLoggedIn);
  const userType = useSelector(
    (state) => state?.userAuth?.userType
  )?.toLowerCase();

  return (
    <Router>
      <AxiosInterceptor />
      <ScrollToTop />
      <Notification />
      {isLoggedIn && <IdleLogout />}
      {isLoggedIn && <SessionTimeout />}
      {isLoggedIn && userType?.includes("staff") && <StaffRoutes />}
      {isLoggedIn && userType?.includes("merchant") && <MerchantRoutes />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/documentation" element={<DocxPage />} />
        <Route path="/not-found" element={<ErrorPage />} />
        {!isLoggedIn && (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/merchant/*"
              element={<Navigate to="/login" replace />}
            />
            <Route path="/staff/*" element={<Navigate to="/login" replace />} />
            <Route path="/admin/*" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
