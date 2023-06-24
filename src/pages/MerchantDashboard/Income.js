import "./index.css";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState, useEffect } from "react";

import NoTableData from "../../components/tables/NoTableData";
import ExportButton from "../../components/buttons/ExportButton";
import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import IncomeTable from "../../components/tables/merchant/IncomeTable";
import CustomPagination from "../../components/tables/CustomPagination";
import TableLayout, { scrollToTableTop } from "../../layouts/tables/TableLayout";
import { systemControllersActions } from "../../services/reducers/system.reducer";
import { allIncome, downloadIncome } from "../../services/actions/transactions.actions";

const Income = () => {
  const merchantId = useSelector((state) => state?.userAuth?.merchantCode)?.toLowerCase();
  const [searchParams, setSearchParams] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [tableRows, setTableRows] = useState([]);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const fetchIncome = useCallback(
    async (params, page) => {
      dispatch(systemControllersActions.startLoading());
      try {
        const response = await allIncome(params, page, merchantId);
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
    fetchIncome();
  }, [fetchIncome]);

  const searchHandler = (prop) => {
    setSearchParams(prop);
    fetchIncome(prop)
  };

  const paginationHandler = (prop) => {
    scrollToTableTop();
    setPage(prop);
    fetchIncome(searchParams, prop);
  };

  const exportHandler = async (prop) => {
    let params = searchParams;
    params.query = merchantId;
    dispatch(systemControllersActions.startLoading());
    try {
      const response = await downloadIncome(prop, params);
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
      <Box className="income-container">
        <div className="title-section">
          <h1 className="page-title">Income</h1>
          <Box
            className="action-buttons"
            sx={{ width: "150px", height: "40px" }}
          >
            <ExportButton onExport={exportHandler} />
          </Box>
        </div>
        <TableLayout>
          {tableRows?.length < 1 && <NoTableData link="Refresh" onClick={fetchIncome} />}
          {tableRows?.length > 0 && <IncomeTable tableRows={tableRows} handleSearch={searchHandler} />}
          {tableRows?.length > 0 && totalPages > 1 && (
            <CustomPagination paginationHandler={paginationHandler} totalPages={totalPages} page={page} />
          )}
        </TableLayout>
      </Box>
    </DashboardLayout>
  );
};

export default Income;
