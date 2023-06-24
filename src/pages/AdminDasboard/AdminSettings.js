import { useEffect } from "react";
import "./index.css";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import InnerSettingsLayout from "../../layouts/dashboard/settings/InnerSettingsLayout";

const AdminSettings = () => {
  const navigate = useNavigate();
  const nameUrl = useLocation();
  const route = [{ path: "/staff/settings/" }];

  const links = [
    {
      linkName: "General",
      path: "general",
    },
    {
      linkName: "Notifications",
      path: "notifications",
    },
  ];

  useEffect(() => {
    if (matchRoutes(route, nameUrl)) {
      navigate("general", { replace: true });
    }
    // eslint-disable-next-line
  }, []);
  return (
    <DashboardLayout type="staff">
      <div className="settings-container">
        <h1 className="page-title">Settings</h1>
        <InnerSettingsLayout links={links} />
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
