import "../index.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Box, LinearProgress, Button } from "@mui/material";

import CustomTable from "../CustomTable";
import { numberWithCommas } from "../../../utils/helperFunctions";
import { StyledTableCell, StyledTableRow } from "../../../layouts/tables/TableLayout";

const TransactionsTable = (props) => {
  const isLoading = useSelector((state) => state.systemControllers.isLoading);
  const navigate = useNavigate();
  const tableHeads = [
    "Ref ID",
    "Amount",
    "Customer Email",
    "Channel",
    "Transaction Date",
    "Status",
    "",
  ];

  const viewHandler = (prop) => (e) => {
    navigate("/merchant/transactions/" + prop?.referenceId?.toLowerCase(), { state: prop });
  };

  return (
    <Box className="transaction-table">
      {props.showPagination && isLoading && <LinearProgress />}
      <div className="table-top">
        {!props.recent && <h1 className="table-title all">All Transactions</h1>}
        {props.recent && (
          <>
            <h1 className="table-title recent">Recent Transactions</h1>
            <Button
              color="primary"
              variant="contained"
              disableElevation
              sx={{ width: "100px", height: "40px" }}
              onClick={() => navigate("/merchant/transactions")}
            >
              View All
            </Button>
          </>
        )}
      </div>
      <CustomTable headers={tableHeads}>
        {props.tableRows?.map((row, index) => (
          <StyledTableRow props={props} hover key={index}>
            <StyledTableCell component="th" scope="row">
              {row?.referenceId}
            </StyledTableCell>
            <StyledTableCell>{numberWithCommas(row?.amount)}</StyledTableCell>
            <StyledTableCell>{row?.customerEmail?.toLowerCase()}</StyledTableCell>
            <StyledTableCell>{row?.paymentChannel}</StyledTableCell>
            <StyledTableCell>{row?.transactionDate}</StyledTableCell>
            <StyledTableCell id={row?.status?.toLowerCase()}>{row?.status}</StyledTableCell>
            <StyledTableCell align="right">
              <span id="view" onClick={viewHandler(row)}>
                view
              </span>
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </CustomTable>
    </Box>
  );
};

export default TransactionsTable;
