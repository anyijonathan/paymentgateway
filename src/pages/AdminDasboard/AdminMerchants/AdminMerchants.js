import "./index.css";
import { useSelector } from "react-redux";

import DashboardLayout from "../../../layouts/dashboard/DashboardLayout";
import AdminMerchantChecker from "./AdminMerchantChecker";
import AdminMerchantMaker from "./AdminMerchantMaker";

const AdminMerchants = (props) => {
  const userRole = useSelector((state) => state?.userAuth?.role)?.toLowerCase();
  return (
    <DashboardLayout type="staff">
      {userRole && userRole === "checker" ? (
        <AdminMerchantChecker />
      ) : (
        <AdminMerchantMaker />
      )}
    </DashboardLayout>
  );
};

export default AdminMerchants;
