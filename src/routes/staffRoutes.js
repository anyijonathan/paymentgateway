import { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { ICONS } from "../assets";
import ApprovedRequests from "../pages/AdminDasboard/AdminMerchants/adminChecker/ApprovedRequests";
import DeclinedRequests from "../pages/AdminDasboard/AdminMerchants/adminChecker/DeclinedRequests";
import MerchantDeletion from "../pages/AdminDasboard/AdminMerchants/adminChecker/MerchantDeletion";
import PendingApprovals from "../pages/AdminDasboard/AdminMerchants/adminChecker/PendingApprovals";
import AllMerchants from "../pages/AdminDasboard/AdminMerchants/AllMerchants";
import MakerDeclined from "../pages/AdminDasboard/AdminMerchants/adminMaker/MakerDeclined";
import MakerPending from "../pages/AdminDasboard/AdminMerchants/adminMaker/MakerPending";
import MakerReferred from "../pages/AdminDasboard/AdminMerchants/adminMaker/MakerReferred";
import AdminMerchants from "../pages/AdminDasboard/AdminMerchants/AdminMerchants";
import MerchantDetails from "../pages/AdminDasboard/AdminMerchants/MerchantDetails";
import AdminOverview from "../pages/AdminDasboard/AdminOverview/AdminOverview";
import AdminReports from "../pages/AdminDasboard/AdminReports";
import AdminSettings from "../pages/AdminDasboard/AdminSettings";
import AdminTransactions from "../pages/AdminDasboard/AdminTransactions";
import General from "../pages/AdminDasboard/settings/General";
import Notifications from "../pages/AdminDasboard/settings/Notifications";
import MerchantReports from "../pages/AdminDasboard/AdminReports/MerchantReports";
import TransactionReports from "../pages/AdminDasboard/AdminReports/TransactionReports";
import AdminManageStaff from "../pages/AdminDasboard/AdminManageStaff";
import ErrorPage from "../pages/error/ErrorPage";
import LandingPage from "../pages/landing page/LandingPage";

const {
  OverviewIcon,
  TransactionsIcon,
  CustomersIcon,
  ReportIcon,
  SettingsIcon,
  ManageAccountsIcon,
} = ICONS;

export let staffRoutesArray = [];

const StaffRoutes = () => {
  const userRole = useSelector((state) => state?.userAuth?.role)?.toLowerCase();
  if (userRole?.includes("admin")) {
    staffRoutesArray = [
      {
        path: "/admin/manage-staff",
        element: <AdminManageStaff />,
        name: "Manage Users",
        icon: <ManageAccountsIcon />,
      },
    ];
  } else {
    staffRoutesArray = [
      {
        path: "/staff/overview",
        element: <AdminOverview />,
        name: "Overview",
        icon: <OverviewIcon />,
        sub: [
          {
            path: "/staff/overview/:currentView",
            element: <AdminOverview />,
            name: "Amount",
          },
        ],
      },
      {
        path: "/staff/transactions",
        element: <AdminTransactions />,
        name: "Transactions",
        icon: <TransactionsIcon />,
      },
      {
        path: `/staff/merchant/${userRole}`,
        element: <AdminMerchants />,
        name: "Merchants",
        icon: <CustomersIcon />,
        sub: [
          {
            path: `/staff/merchant/${userRole}/:page/details/:id`,
            element: <MerchantDetails />,
            name: "Merchant Details",
          },
        ],
        children: [
          {
            path: "view",
            element: <AllMerchants />,
            name: "All Merchants",
            index: true,
          },
          userRole === "maker" && {
            path: "pending",
            element: <MakerPending />,
            name: "Pending Requests",
          },
          userRole === "maker" && {
            path: "declined",
            element: <MakerDeclined />,
            name: "declined Requests",
          },
          userRole === "maker" && {
            path: "referred",
            element: <MakerReferred />,
            name: "Referred Merchants",
          },
          userRole === "checker" && {
            path: "pending-approvals",
            element: <PendingApprovals />,
            name: "Pending Approvals",
          },
          userRole === "checker" && {
            path: "approved",
            element: <ApprovedRequests />,
            name: "Approved Requests",
          },
          userRole === "checker" && {
            path: "declined-requests",
            element: <DeclinedRequests />,
            name: "Declined Requests",
          },
          userRole === "checker" && {
            path: "deletion",
            element: <MerchantDeletion />,
            name: "Approve Merchants Deletion",
          },
        ],
      },
      {
        path: "/staff/reports",
        element: <AdminReports />,
        name: "Reports",
        icon: <ReportIcon />,
        children: [
          {
            path: "merchant",
            element: <MerchantReports />,
            name: "Merchant Reports",
            index: true,
          },
          {
            path: "transaction",
            element: <TransactionReports />,
            name: "Transaction Reports",
          },
        ],
      },
      {
        path: "/staff/settings",
        element: <AdminSettings />,
        name: "Settings",
        icon: <SettingsIcon />,
        children: [
          {
            path: "general",
            element: <General />,
            name: "General",
            index: true,
          },
          {
            path: "notifications",
            element: <Notifications />,
            name: "Notifications",
          },
        ],
      },
    ];
  }
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={<Navigate to="/staff/overview" replace />}
      />
      {staffRoutesArray?.map((route, index) => {
        return (
          <Fragment key={index}>
            <Route path={route?.path} element={route?.element}>
              {route?.children?.map((child, indx) => {
                return (
                  <Fragment key={indx}>
                    {child?.index && <Route index element={child?.element} />}
                    <Route path={child?.path} element={child?.element} />
                  </Fragment>
                );
              })}
            </Route>
            {route?.sub?.map((sub, index) => (
              <Route key={index} path={sub?.path} element={sub?.element} />
            ))}
          </Fragment>
        );
      })}
      <Route path="/not-found" element={<ErrorPage />} />
      {userRole?.includes("admin") && (
        <Route
          path="/staff/*"
          element={<Navigate to="/admin/manage-staff" replace />}
        />
      )}
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
};

export default StaffRoutes;
