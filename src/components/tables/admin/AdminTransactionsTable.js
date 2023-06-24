import "./style.css";
import { Box } from "@mui/material";

import CustomTable from "../CustomTable";
import { StyledTableCell, StyledTableRow } from "../../../layouts/tables/TableLayout";
import { numberWithCommas } from "../../../utils/helperFunctions";

const AdminTransactionsTable = (props) => {
  const tableHeaders = [
    "Ref ID",
    "Merchant Code",
    "Amount",
    "Customer Email",
    "Payment Channel",
    "Transaction Date",
    "Status",
  ];

  return (
    <Box>
      <div className="table-title p-4 text-base font-bold">Transaction By {props?.title}</div>
      <CustomTable headers={tableHeaders}>
        {props.tableData?.map((data, index) => (
          <StyledTableRow props={props} hover key={index}>
            <StyledTableCell component="th" scope="row">
              {data?.referenceId}
            </StyledTableCell>
            <StyledTableCell>{data?.merchantCode}</StyledTableCell>
            <StyledTableCell>{numberWithCommas(data?.amount)}</StyledTableCell>
            <StyledTableCell>{data?.customerEmail?.toLowerCase()}</StyledTableCell>
            <StyledTableCell>{data?.paymentChannel}</StyledTableCell>
            <StyledTableCell>{data?.transactionDate}</StyledTableCell>
            <StyledTableCell id={data?.status?.toLowerCase()}>{data?.status}</StyledTableCell>
          </StyledTableRow>
        ))}
      </CustomTable>
    </Box>
  );
};

export default AdminTransactionsTable;
