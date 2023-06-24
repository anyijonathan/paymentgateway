import { useRef } from "react";
import { useEffect, useMemo } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  matchRoutes,
} from "react-router-dom";

import AdminDasboardHeader from "../../../components/staff/AdminDasboardHeader";
import AdminTab from "../../../components/staff/AdminTab";

const AdminMerchantMaker = () => {
  const navigate = useNavigate();
  const nameUrl = useLocation();
  const childRef = useRef(null);
  const route = useMemo(() => [{ path: "/staff/merchant/maker/" }], []);

  const links = [
    {
      linkName: "All Merchants",
      path: "view",
    },
    {
      linkName: "Pending Approvals",
      path: "pending",
    },
    {
      linkName: "Declined Requests",
      path: "declined",
    },
    {
      linkName: "Referred Merchants",
      path: "referred",
    },
  ];

  useEffect(() => {
    if (matchRoutes(route, nameUrl)) {
      navigate("view", { replace: true });
    }
  }, [nameUrl, navigate, route]);

  const reload = () => {
    childRef.current?.reload();
  };

  return (
    <div>
      <AdminDasboardHeader
        header="Manage Merchants"
        createMerchant={true}
        reload={reload}
      />
      <AdminTab links={links} />
      <Outlet context={childRef} />
    </div>
  );
};

export default AdminMerchantMaker;
