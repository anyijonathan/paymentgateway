import { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { ICONS } from "../assets";
import Income from "../pages/MerchantDashboard/Income";
import Overview from "../pages/MerchantDashboard/Overview";
import Settings from "../pages/MerchantDashboard/Setting";
import Bank from "../pages/MerchantDashboard/settings/Bank";
import SwitchPassword from "../pages/MerchantDashboard/settings/SwitchPassword";
import Contact from "../pages/MerchantDashboard/settings/Contact";
import General from "../pages/MerchantDashboard/settings/General";
import Notifications from "../pages/MerchantDashboard/settings/Notifications";
import Users from "../pages/MerchantDashboard/settings/Users";
import Transactions from "../pages/MerchantDashboard/Transactions";
import TransactionDetails from "../pages/MerchantDashboard/transactions/TransactionDetails";
import ChangePassword from "../pages/authentication/ChangePassword";
import ErrorPage from "../pages/error/ErrorPage";
import LandingPage from "../pages/landing page/LandingPage";
import ApiKeys from "../pages/MerchantDashboard/settings/ApiKeys";

const { OverviewIcon, TransactionsIcon, IncomeIcon, SettingsIcon } = ICONS;

export let merchantRoutesArray = [];

const MerchantRoutes = () => {
  const userRole = useSelector((state) => state?.userAuth?.role)?.toLowerCase();
  const firstTimeLogin = useSelector((state) => state?.userAuth?.userFirstLogin);

  merchantRoutesArray = [
    {
      path: "/merchant/overview",
      element: <Overview />,
      name: "Overview",
      icon: <OverviewIcon />,
    },
    {
      path: "/merchant/transactions",
      element: <Transactions />,
      name: "Transactions",
      icon: <TransactionsIcon />,
      sub: [
        {
          path: "/merchant/transactions/:id",
          element: <TransactionDetails />,
          name: "Transaction",
        },
      ],
    },
    {
      path: "/merchant/income",
      element: <Income />,
      name: "Income",
      icon: <IncomeIcon />,
    },
    {
      path: "/merchant/settings",
      element: <Settings />,
      name: "Settings",
      icon: <SettingsIcon />,
      children: [
        userRole?.includes("admin") && {
          path: "contact",
          element: <Contact />,
          name: "Contact",
        },
        userRole?.includes("admin") && {
          path: "bank",
          element: <Bank />,
          name: "Bank",
        },
        {
          path: "general",
          element: <General />,
          name: "General",
          index: true,
        },
        userRole?.includes("admin") && {
          path: "users",
          element: <Users />,
          name: "Users",
        },
        {
          path: "change-password",
          element: <SwitchPassword />,
          name: "changePassword",
        },
        {
          path: "notifications",
          element: <Notifications />,
          name: "Notifications",
        },
        userRole?.includes("admin") && {
          path: "keys",
          element: <ApiKeys />,
          name: "Keys",
        },
      ],
    },
  ];

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Navigate to="/merchant/overview" replace />} />
      {firstTimeLogin && <Route path="/merchant/change-password" element={<ChangePassword />} />}
      {!firstTimeLogin &&
        merchantRoutesArray?.map((route, index) => {
          return (
            <Fragment key={index}>
              <Route key={index} path={route?.path} element={route?.element}>
                {route.children?.map((child, indx) => {
                  return (
                    <Fragment key={indx}>
                      {child?.index && <Route index element={child?.element} />}
                      <Route path={child?.path} element={child?.element} />
                    </Fragment>
                  );
                })}
              </Route>
              {route.sub?.map((sub, index) => {
                return <Route key={index} path={sub?.path} element={sub?.element} />;
              })}
            </Fragment>
          );
        })}
      <Route
        path="/merchant/*"
        element={firstTimeLogin && <Navigate to="/merchant/change-password" replace />}
      />
      <Route path="/not-found" element={<ErrorPage />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
};

export default MerchantRoutes;
