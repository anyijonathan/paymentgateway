import { useState } from "react";
import "../index.css";
import { Box, Button } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../layouts/tables/TableLayout";

import { numberWithCommas } from "../../../utils/helperFunctions";
import SelectSearch from "../../search inputs/SelectSearch";
import InputSearch from "../../search inputs/InputSearch";
import DateRange from "../../search inputs/DateRange";
import CustomTable from "../CustomTable";

const IncomeTable = (props) => {
  const [searchParams, setSearchParams] = useState({  });
  const tableHeads = [
    "Ref ID",
    "Customer",
    "Transaction Date",
    "Received Amount",
    "Settled Amount",
  ];

  const periodOptions = [
    {
      value: "OneWeek",
      text: "1 Week",
    },
    {
      value: "OneMonth",
      text: "1 Month",
    },
    {
      value: "SixMonths",
      text: "6 Months",
    },
    {
      value: "custom",
      text: "Custom Range",
    },
  ];

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

  const searchHandler = () => {
    if (searchParams?.searchBy?.length === 0) {
      delete searchParams.searchBy;
    }
    if (searchParams.period !== "custom") {
      delete searchParams?.startDate;
      delete searchParams?.endDate;
    }
    props.handleSearch(searchParams);
  };

  return (
    <Box className="income-table">
      <div className="table-top">
        <h1 className="table-title">Income</h1>
        <div className="search-options">
          <div className="inputs">
            {searchParams?.period === "custom" && (
              <DateRange
                className="dateRange"
                width={180}
                setDate={searchDateParamHandler}
              />
            )}
            <InputSearch
              className="inputSearch"
              width={320}
              placeholder="Search by ..."
              onChange={searchParamsHandler("searchBy")}
            />
            <SelectSearch
              id="periodRange"
              className="selectBox"
              width={150}
              label="Period"
              value={searchParams.period}
              selectItems={periodOptions}
              onSelect={searchParamsHandler("period")}
            />
            <Box
              className="action-buttons"
              sx={{ width: "150px", height: "40px" }}
            >
              <Button
                sx={{ width: "100%", height: "100%" }}
                variant="outlined"
                disableElevation
                onClick={searchHandler}
              >
                Search
              </Button>
            </Box>
          </div>
        </div>
      </div>
      <CustomTable headers={tableHeads}>
        {props.tableRows.map((row, index) => (
          <StyledTableRow props={props} hover key={index}>
            <StyledTableCell component="th" scope="row">
              {row?.referenceId}
            </StyledTableCell>
            <StyledTableCell>{row?.customerName}</StyledTableCell>
            <StyledTableCell>{row?.transactionDate}</StyledTableCell>
            <StyledTableCell>
              {numberWithCommas(row?.amount)}
            </StyledTableCell>
            <StyledTableCell>
              {numberWithCommas(row?.settledAmount)}
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </CustomTable> 
    </Box>
  );
};

export default IncomeTable;
