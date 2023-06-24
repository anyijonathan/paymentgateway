import { useEffect, useMemo } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  matchRoutes,
} from "react-router-dom";

import AdminDasboardHeader from "../../../components/staff/AdminDasboardHeader";
import MerchantCheckerTab from "../../../components/staff/MerchantCheckerTab";

const AdminMerchantChecker = () => {
  const navigate = useNavigate();
  const nameUrl = useLocation();
  const route = useMemo(() => [{ path: "/staff/merchant/checker/" }], []);

  useEffect(() => {
    if (matchRoutes(route, nameUrl)) {
      navigate("view", { replace: true });
    }
  }, [nameUrl, navigate, route]);

  return (
    <div>
      <AdminDasboardHeader header="Manage Merchants" createMerchant={false} />
      <MerchantCheckerTab />
      <Outlet />
    </div>
  );
};

export default AdminMerchantChecker;
