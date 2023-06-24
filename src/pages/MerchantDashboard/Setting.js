import "./index.css";
import { useEffect, useMemo } from "react";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import InnerSettingsLayout from "../../layouts/dashboard/settings/InnerSettingsLayout";

const Settings = () => {
  const navigate = useNavigate();
  const nameUrl = useLocation();
  const route = useMemo(() => [{ path: "/merchant/settings/" }], []);
  const links = [
    {
      linkName: "General",
      path: "general",
    },
    {
      linkName: "Change Password",
      path: "change-password",
    },
    {
      linkName: "Contact Info",
      path: "contact",
      adminOnly: true,
    },
    {
      linkName: "Bank",
      path: "bank",
      adminOnly: true,
    },
    {
      linkName: "Users",
      path: "users",
      adminOnly: true,
    },
    {
      linkName: "Notifications",
      path: "notifications",
    },
    {
      linkName: "API Keys",
      path: "keys",
      adminOnly: true,
    },
  ];

  useEffect(() => {
    if (matchRoutes(route, nameUrl)) {
      navigate("general", { replace: true });
    }
  }, [nameUrl, navigate, route]);
  return (
    <DashboardLayout type="merchant">
      <div className="settings-container">
        <h1 className="page-title">Settings</h1>
        <InnerSettingsLayout links={links} />
      </div>
    </DashboardLayout>
  );
};

export default Settings;
