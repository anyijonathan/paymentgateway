import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState, useCallback, useImperativeHandle } from "react";

import { allMerchant, getMerchantByAccountNumber } from "../../../services/actions/staffMakerChecker.actions";
import { systemControllersActions } from "../../../services/reducers/system.reducer";

import TableLayout, { scrollToTableTop } from "../../../layouts/tables/TableLayout";
import AllMerchantsTable from "../../../components/tables/admin/AllMerchantsTable";
import CustomPagination from "../../../components/tables/CustomPagination";
import { isEmpty } from "../../../utils/helperFunctions";

const AllMerchants = () => {
  const ref = useOutletContext();
  const dispatch = useDispatch();

  const empty = {
    totalPages: 0,
    page: 1,
    totalMerchants: 0,
    tableRows: [],
  };
  const [pageData, setPageData] = useState(empty);

  const fetchAllMerchants = useCallback(
    async (page) => {
      dispatch(systemControllersActions.startLoading());
      try {
        const response = await allMerchant(page);
        if (response) {
          setPageData({
            totalPages: response?.totalPages || 0,
            page: response?.currentPageNumber || 1,
            totalMerchants: response?.totalRecords || 0,
            tableRows: response?.data || [],
          });
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

  useImperativeHandle(ref, () => ({
    reload() {
      fetchAllMerchants(pageData?.page);
    },
  }));

  const paginationHandler = (prop) => {
    scrollToTableTop();
    setPageData({ ...pageData, page: prop });
    fetchAllMerchants(prop);
  };

  const searchParamsHandler = async (prop) => {
    dispatch(systemControllersActions.startLoading());
    try {
      const response = await getMerchantByAccountNumber(prop);
      if (response && isEmpty(response) > 0) {
        setPageData({
          totalPages: 1,
          page: 1,
          totalMerchants: 1,
          tableRows: isEmpty(response?.data) > 0 ? [response?.data] : response?.data,
        });
      } else {
        setPageData(empty);
      }
    } catch (error) {
      setPageData({ ...empty });
    } finally {
      dispatch(systemControllersActions.endLoading());
    }
  };

  return (
    <Box>
      <TableLayout>
        <AllMerchantsTable
          refresh={() => fetchAllMerchants(pageData?.page)}
          tableData={pageData.tableRows}
          totalMerchants={pageData.totalMerchants}
          searchHandler={searchParamsHandler}
        />
        {pageData.totalPages > 1 && (
          <CustomPagination
            paginationHandler={paginationHandler}
            totalPages={pageData.totalPages}
            page={pageData.page}
          />
        )}
      </TableLayout>
    </Box>
  );
};

export default AllMerchants;
