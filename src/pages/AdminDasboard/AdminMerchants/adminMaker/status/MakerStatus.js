import { useEffect, useState, useCallback, useImperativeHandle } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Box } from "@mui/material";

import { systemControllersActions } from "../../../../../services/reducers/system.reducer";
import {
  allStatusMerchant,
  getMerchantByAccountNumber,
} from "../../../../../services/actions/staffMakerChecker.actions";

import TableLayout, { scrollToTableTop } from "../../../../../layouts/tables/TableLayout";
import MakerDetailsTable from "../../../../../components/tables/admin/MakerDetailsTable";
import CustomPagination from "../../../../../components/tables/CustomPagination";
import { isEmpty } from "../../../../../utils/helperFunctions";

const MakerStatus = (props) => {
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
        const response = await allStatusMerchant(props.status, page);
        if (response) {
          setPageData({
            totalPages: response?.totalPages || 0,
            page: response?.currentPageNumber || 1,
            totalMerchants: response?.totalRecords || 0,
            tableRows: response?.data || [],
          });
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        dispatch(systemControllersActions.endLoading());
      }
    },
    [dispatch, props.status]
  );

  useEffect(() => {
    fetchAllMerchants();
  }, [fetchAllMerchants]);

  useImperativeHandle(props.anchor, () => ({
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
        <MakerDetailsTable
          refresh={() => fetchAllMerchants(pageData?.page)}
          title={props.title}
          tableData={pageData.tableRows}
          view={props.status}
          totalMerchants={pageData.totalMerchants}
          searchHandler={searchParamsHandler}
          noSub={props.noSub}
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

export default MakerStatus;
