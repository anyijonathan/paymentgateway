import { useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Box } from "@mui/material";

import { systemControllersActions } from "../../../../../services/reducers/system.reducer";
import {
  allStatusMerchant,
  getMerchantByAccountNumber,
} from "../../../../../services/actions/staffMakerChecker.actions";

import CheckerDetailsTable from "../../../../../components/tables/admin/CheckerDetailsTable";
import TableLayout, { scrollToTableTop } from "../../../../../layouts/tables/TableLayout";
import CustomPagination from "../../../../../components/tables/CustomPagination";
import { isEmpty } from "../../../../../utils/helperFunctions";

const CheckerStatus = (props) => {
  let tableHeaders;
  if (props.action) {
    tableHeaders = ["Account Name", "Account Number", "Merchant Code", "Email Address", "Phone Number", "Actions"];
  } else {
    tableHeaders = ["Account Name", "Account Number", "Merchant Code", "Email Address", "Phone Number"];
  }
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
        dispatch(systemControllersActions.endLoading());
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

  const paginationHandler = (prop) => {
    scrollToTableTop();
    setPageData({ ...pageData, page: prop });
    fetchAllMerchants(props.status, prop);
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
        <CheckerDetailsTable
          refresh={() => fetchAllMerchants(pageData?.page)}
          title={props.title}
          tableData={pageData.tableRows}
          headers={tableHeaders}
          search={props.search}
          actionsType={props.actionType}
          action={props.action}
          view={props.status}
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

export default CheckerStatus;
