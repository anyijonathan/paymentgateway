import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import InnerReportsLayout from "./AdminReports/InnerReportsLayer";

const AdminReports = () => {
  return (
    <DashboardLayout type="staff">
      <InnerReportsLayout />
    </DashboardLayout>
  );
};

export default AdminReports;
