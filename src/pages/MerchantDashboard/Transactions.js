import "./index.css";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { allTransactions, downloadTransactions } from "../../services/actions/transactions.actions";
import TransactionsTable from "../../components/tables/merchant/TransactionsTable";
import { systemControllersActions } from "../../services/reducers/system.reducer";
import TableLayout, { scrollToTableTop } from "../../layouts/tables/TableLayout";
import CustomPagination from "../../components/tables/CustomPagination";
import SelectSearch from "../../components/search inputs/SelectSearch";
import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import DateRange from "../../components/search inputs/DateRange";
import ExportButton from "../../components/buttons/ExportButton";
import NoTableData from "../../components/tables/NoTableData";

const Transactions = () => {
  const merchantId = useSelector((state) => state?.userAuth?.merchantCode)?.toLowerCase();
  const [searchParams, setSearchParams] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [tableRows, setTableRows] = useState([]);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const statusOptions = [
    {
      value: 0,
      text: "Initiated",
    },
    {
      value: 1,
      text: "Successful",
    },
    {
      value: 2,
      text: "Pending",
    },
    {
      value: 3,
      text: "Failed",
    },
  ];

  const channelOptions = [
    {
      value: 0,
      text: "Bank",
    },
    {
      value: 1,
      text: "Card",
    },
    {
      value: 2,
      text: "Pay Later",
    },
  ];

  const fetchTransactions = useCallback(
    async (params, page) => {
      dispatch(systemControllersActions.startLoading());
      try {
        const response = await allTransactions(params, page, merchantId);
        if (response) {
          setTableRows(response?.data || []);
          setPage(response?.currentPageNumber || 1);
          setTotalPages(response?.totalPages || 0);
        }
      } catch (error) {
        dispatch(systemControllersActions.endLoading());
        toast.error(error.message);
      } finally {
        dispatch(systemControllersActions.endLoading());
      }
    },
    [dispatch, merchantId]
  );

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const searchParamsHandler = (prop) => (e) => {
    setSearchParams({
      ...searchParams,
      [prop]: e.target.value,
    });
  };

  const searchDateParamHandler = (prop, date) => {
    setSearchParams({
      ...searchParams,
      [prop]: date,
    });
  };

  const handleSearch = () => {
    fetchTransactions(searchParams);
  };

  const paginationHandler = (prop) => {
    scrollToTableTop();
    setPage(prop);
    fetchTransactions(searchParams, prop);
  };

  const exportHandler = async (prop) => {
    let params = searchParams;
    params.merchantId = merchantId;
    dispatch(systemControllersActions.startLoading());
    try {
      const response = await downloadTransactions(prop, params);
      if (response) {
        dispatch(systemControllersActions.endLoading());
        toast.success("File downloaded");
      }
    } catch (error) {
      dispatch(systemControllersActions.endLoading());
      toast.error(error.message);
    } finally {
      dispatch(systemControllersActions.endLoading());
    }
  };

  return (
    <DashboardLayout type="merchant">
      <Box className="transactions-container">
        <h1 className="page-title">Transactions</h1>
        <div className="search-options">
          <div className="inputs">
            <DateRange className="dateRange merchant-transactions" width={200} setDate={searchDateParamHandler} />
            <SelectSearch
              id="transactionChannel"
              className="selectBox"
              label="Transaction Channel"
              width={200}
              value={searchParams.PaymentChannel}
              selectItems={channelOptions}
              onSelect={searchParamsHandler("PaymentChannel")}
            />
            <SelectSearch
              id="status"
              className="selectBox"
              label="Status"
              width={200}
              value={searchParams.status}
              selectItems={statusOptions}
              onSelect={searchParamsHandler("status")}
            />
          </div>
          <div className="buttons">
            <Box className="action-buttons" sx={{ width: "150px", height: "40px" }}>
              <Button
                sx={{ width: "140px", height: "100%" }}
                variant="outlined"
                disableElevation
                onClick={handleSearch}
              >
                Search
              </Button>
            </Box>
            <Box sx={{ width: "140px", height: "100%" }}>
              <ExportButton onExport={exportHandler} />
            </Box>
          </div>
        </div>
        <TableLayout>
          {tableRows?.length < 1 && <NoTableData />}
          {tableRows?.length > 0 && <TransactionsTable tableRows={tableRows} />}
          {tableRows?.length > 0 && totalPages > 1 && (
            <CustomPagination paginationHandler={paginationHandler} totalPages={totalPages} page={page} />
          )}
        </TableLayout>
      </Box>
    </DashboardLayout>
  );
};

export default Transactions;
