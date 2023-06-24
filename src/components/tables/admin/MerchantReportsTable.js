import "./style.css";
import { Box } from "@mui/material";

import NoMerchant from "./NoMerchant";
import CustomTable from "../CustomTable";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../layouts/tables/TableLayout";
import CustomPagination from "../CustomPagination";
import { formatAddress } from "../../../utils/helperFunctions";

const MerchantReportsTable = (props) => {
  const tableHeaders = [
    "Account Number",
    "Account Name",
    "Merchant Code",
    "Email Address",
    "Phone Number",
    "Residential Address",
  ];

  const totalMerchants = (data) => {
    if (data?.length === 0) {
      return "no merchant";
    } else if (data?.length === 1) {
      return "1 merchant";
    } else {
      return `${data?.length} merchants`;
    }
  };

  return (
    <Box>
      <div className="table-title p-4 font-semibold flex justify-between w-full admin-table-header gap-10">
        <h2>
          All Merchants
          <br />
          <span className="sub-title">{totalMerchants(props.tableData)}</span>
        </h2>
      </div>
      {props.tableData?.length < 1 && <NoMerchant refresh={props.refresh} />}
      {props.tableData?.length >= 1 && (
        <>
          <CustomTable headers={tableHeaders}>
            {props.tableData?.map((data, index) => (
              <StyledTableRow props={props} hover key={index}>
                <StyledTableCell component="th" scope="row">
                  {data?.accountNumber}
                </StyledTableCell>
                <StyledTableCell sx={{ textTransform: "capitalize" }}>
                  {data?.accountName?.toLowerCase()}
                </StyledTableCell>
                <StyledTableCell>FCMB{data?.merchantCode}</StyledTableCell>
                <StyledTableCell>
                  {data?.emailAddress?.toLowerCase()}
                </StyledTableCell>
                <StyledTableCell>{data?.phoneNumber}</StyledTableCell>
                <StyledTableCell sx={{ textTransform: "capitalize" }}>
                  {formatAddress(data?.merchantAddress?.toLowerCase())}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </CustomTable>
          {props.tableData?.length > 10 && (
            <div>
              <CustomPagination />
            </div>
          )}
        </>
      )}
    </Box>
  );
};

export default MerchantReportsTable;
