import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Stack, Button } from "@mui/material";
import { toast } from "react-toastify";

import { systemControllersActions } from "../../../services/reducers/system.reducer";
import { allMerchant, downloadMerchants } from "../../../services/actions/staffMakerChecker.actions";

import TableLayout, { scrollToTableTop } from "../../../layouts/tables/TableLayout";
import ExportButton from "../../../components/buttons/ExportButton";
import MerchantReportsTable from "../../../components/tables/admin/MerchantReportsTable";
import DateRange from "../../../components/search inputs/DateRange";
import CustomPagination from "../../../components/tables/CustomPagination";

const MerchantReports = () => {
  const [searchParams, setSearchParams] = useState({});
  const dispatch = useDispatch();
  const [tableRows, setTableRows] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalMerchants, setTotalMerchants] = useState(0);
  const [page, setPage] = useState(1);

  const fetchAllMerchants = useCallback(
    async (params, page) => {
      dispatch(systemControllersActions.startLoading());
      try {
        const response = await allMerchant(page, params);
        if (response) {
          setTableRows(response?.data || []);
          setPage(response?.currentPageNumber || 1);
          setTotalPages(response?.totalPages || 0);
          setTotalMerchants(response?.totalRecords || 0);
        }
      } catch (error) {
        dispatch(systemControllersActions.endLoading());
        toast.error(error.message);
      } finally {
        dispatch(systemControllersActions.endLoading());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchAllMerchants();
  }, [fetchAllMerchants]);

  const searchDateParamHandler = (prop, date) => {
    setSearchParams({
      ...searchParams,
      [prop]: date,
    });
  };

  const handleSearch = () => {
    fetchAllMerchants(searchParams);
  };

  const paginationHandler = (prop) => {
    scrollToTableTop();
    setPage(prop);
    fetchAllMerchants(searchParams, prop);
  };

  const exportHandler = async (prop) => {
    dispatch(systemControllersActions.startLoading());
    try {
      const response = await downloadMerchants(prop, searchParams);
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
    <div>
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-[40px] mt-[32px]">
        <h1 className="pageHeader">Merchant Reports</h1>
        <div className="flex flex-col md:flex-row gap-3 xl:gap-1">
          <DateRange className="dateRange admin-transactions" width={200} setDate={searchDateParamHandler} />
          <Stack direction="row" gap="10px" className="action-buttons xl:ml-2 flex gap-4" sx={{ height: "40px" }}>
            <Button sx={{ width: "140px", height: "100%" }} variant="outlined" disableElevation onClick={handleSearch}>
              Search
            </Button>
            <Box sx={{ width: "140px", height: "100%" }}>
              <ExportButton onExport={exportHandler} />
            </Box>
          </Stack>
        </div>
      </div>
      <TableLayout>
        <MerchantReportsTable
          refresh={() => fetchAllMerchants(searchParams, page)}
          tableData={tableRows}
          totalMerchants={totalMerchants}
        />
        {totalPages > 1 && (
          <CustomPagination paginationHandler={paginationHandler} totalPages={totalPages} page={page} />
        )}
      </TableLayout>
    </div>
  );
};

export default MerchantReports;
