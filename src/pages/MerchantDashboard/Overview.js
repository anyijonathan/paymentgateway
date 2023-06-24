import "./index.css";
import { Box } from "@mui/material";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TableLayout from "../../layouts/tables/TableLayout";
import NoTableData from "../../components/tables/NoTableData";
import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import TransactionCard from "../../components/merchant/TransactionCard";
import { systemControllersActions } from "../../services/reducers/system.reducer";
import TransactionsTable from "../../components/tables/merchant/TransactionsTable";
import { merchantTransactionsOverview } from "../../services/actions/transactions.actions";

const Overview = () => {
  const merchantId = useSelector((state) => state?.userAuth?.merchantCode)?.toLowerCase();
  const [successful, setSuccessful] = useState("0");
  const [tableRows, setTableRows] = useState([]);
  const [failed, setFailed] = useState("0");
  const dispatch = useDispatch();

  const fetchTransactions = useCallback(async () => {
    dispatch(systemControllersActions.startLoading());
    try {
      const response = await merchantTransactionsOverview(merchantId);
      if (response) {
        setTableRows(response?.transactions?.splice(0, 10) || []);
        setFailed(response?.failed || "0");
        setSuccessful(response?.successful || "0");
      }
    } catch (error) {
      dispatch(systemControllersActions.endLoading());
      toast.error(error.message);
    } finally {
      dispatch(systemControllersActions.endLoading());
    }
  }, [dispatch, merchantId]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <DashboardLayout type="merchant">
      <div className="overview-container">
        <h1 className="page-title">Overview</h1>
        <Box className="transactions-overview">
          <TransactionCard title="Successful Transactions" amount={successful} />
          <TransactionCard title="Failed Transactions" amount={failed} />
        </Box>
        <TableLayout>
          {tableRows?.length < 1 && <NoTableData />}
          {tableRows?.length > 0 && <TransactionsTable recent={true} tableRows={tableRows} />}
        </TableLayout>
      </div>
    </DashboardLayout>
  );
};

export default Overview;
