import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Box, Button, Stack } from "@mui/material";
import { useCallback, useState, useEffect } from "react";

import { systemControllersActions } from "../../../services/reducers/system.reducer";
import { allTransactions, downloadTransactions } from "../../../services/actions/transactions.actions";

import NoTableData from "../../../components/tables/NoTableData";
import ExportButton from "../../../components/buttons/ExportButton";
import DateRange from "../../../components/search inputs/DateRange";
import InputSearch from "../../../components/search inputs/InputSearch";
import SelectSearch from "../../../components/search inputs/SelectSearch";
import CustomPagination from "../../../components/tables/CustomPagination";
import TableLayout, { scrollToTableTop } from "../../../layouts/tables/TableLayout";
import AdminTransactionsTable from "../../../components/tables/admin/AdminTransactionsTable";

const Transactions = (props) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [tableRows, setTableRows] = useState([]);
  const [searchType, setSearchType] = useState("allMerchants");
  const [tableTitle, setTableTitle] = useState("All Merchants");

  const searchTypeOptions = [
    {
      value: "allMerchants",
      text: "By All Merchants",
    },
    {
      value: "status",
      text: "By Transaction Status",
    },
    {
      value: "merchantID",
      text: "By Merchant ID",
    },
    {
      value: "paymentChannel",
      text: "By Payment Channel",
    },
  ];

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
        const response = await allTransactions(params, page);
        if (response) {
          setTableRows(response?.data || []);
          setPage(response?.currentPageNumber || 1);
          setTotalPages(response?.totalPages || 0);
        }
      } catch (error) {
        dispatch(systemControllersActions.endLoading());
        toast.error(error?.message);
      } finally {
        dispatch(systemControllersActions.endLoading());
      }
    },
    [dispatch]
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
    if (searchType === "merchantID") {
      delete searchParams?.PaymentChannel;
      delete searchParams?.status;
      setTableTitle("Merchant ID");
    }
    if (searchType === "paymentChannel") {
      delete searchParams?.MerchantId;
      delete searchParams?.status;
      setTableTitle("Payment Channel");
    }
    if (searchType === "status") {
      delete searchParams?.MerchantId;
      delete searchParams?.PaymentChannel;
      setTableTitle("Transaction Status");
    }
    if (searchType === "allMerchants") {
      delete searchParams?.MerchantId;
      delete searchParams?.PaymentChannel;
      delete searchParams?.status;
      setTableTitle("All Merchants");
    }
    fetchTransactions(searchParams);
  };

  const paginationHandler = (prop) => {
    scrollToTableTop();
    setPage(prop);
    fetchTransactions(searchParams, prop);
  };

  const exportHandler = async (prop) => {
    dispatch(systemControllersActions.startLoading());
    try {
      const response = await downloadTransactions(prop, searchParams);
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
    <>
      <h1 className="pageHeader">{props?.header}</h1>
      <div className="flex flex-col md:flex-row gap-3 justify-between mb-[40px] mt-[32px]">
        <SelectSearch
          id="transactionType"
          className="selectBox"
          label="Transaction Type"
          width={200}
          value={searchType}
          selectItems={searchTypeOptions}
          onSelect={(e) => setSearchType(e.target.value)}
        />
        <div className="flex flex-col xl:flex-row gap-3 xl:gap-2">
          {searchType === "merchantID" && (
            <InputSearch
              id="merchantId"
              className="inputSearch"
              width={props?.export ? 300 : 350}
              onChange={searchParamsHandler("MerchantId")}
              label={"Merchant Id"}
              autoComplete={"off"}
            />
          )}
          {searchType === "paymentChannel" && (
            <SelectSearch
              id="paymentChannel"
              className="selectBox"
              label="Payment Channel"
              width={200}
              value={searchParams?.PaymentChannel}
              selectItems={channelOptions}
              onSelect={searchParamsHandler("PaymentChannel")}
            />
          )}
          {searchType === "status" && (
            <SelectSearch
              id="status"
              className="selectBox"
              label="Status"
              width={200}
              value={searchParams?.status}
              selectItems={statusOptions}
              onSelect={searchParamsHandler("status")}
            />
          )}
          <DateRange className="dateRange admin-transactions" width={180} setDate={searchDateParamHandler} />
          <Stack direction="row" gap="8px" className="action-buttons xl:ml-1 flex gap-4" sx={{ height: "40px" }}>
            <Button sx={{ width: "140px", height: "100%" }} variant="outlined" disableElevation onClick={handleSearch}>
              Search
            </Button>
            {props.export && (
              <Box sx={{ width: "140px", height: "100%" }}>
                <ExportButton onExport={exportHandler} />
              </Box>
            )}
          </Stack>
        </div>
      </div>
      <TableLayout>
        {tableRows?.length > 0 && <AdminTransactionsTable tableData={tableRows} title={tableTitle} />}
        {tableRows?.length < 1 && <NoTableData />}
        {tableRows?.length > 0 && totalPages > 1 && (
          <CustomPagination paginationHandler={paginationHandler} totalPages={totalPages} page={page} />
        )}
      </TableLayout>
    </>
  );
};

export default Transactions;
