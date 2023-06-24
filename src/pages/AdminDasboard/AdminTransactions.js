import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import Transactions from "./transactions/Transactions";

const AdminTransactions = () => {
  return (
    <DashboardLayout type="staff">
      <Transactions header="Transactions" />
    </DashboardLayout>
  );
};

export default AdminTransactions;
