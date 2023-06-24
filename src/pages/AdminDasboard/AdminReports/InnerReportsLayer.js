import { useEffect, useMemo } from "react";
import "../index.css";
import {
  matchRoutes,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import AdminTab from "../../../components/staff/AdminTab";

const InnerReportsLayout = () => {
  const navigate = useNavigate();
  const nameUrl = useLocation();
  const route = useMemo(() => [{ path: "/staff/reports/" }], []);

  const links = [
    {
      linkName: "Merchant Report",
      path: "merchant",
    },
    {
      linkName: "Transaction Report",
      path: "transaction",
    },
  ];

  useEffect(() => {
    if (matchRoutes(route, nameUrl)) {
      navigate("merchant", { replace: true });
    }
  }, [nameUrl, navigate, route]);

  return (
    <div className="admin-reports">
      <AdminTab links={links} />
      <Outlet />
    </div>
  );
};

export default InnerReportsLayout;
