import "./style.css";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  StyledTableCell,
  StyledTableRow,
} from "../../../layouts/tables/TableLayout";
import InputSearch from "../../search inputs/InputSearch";
import CustomTable from "../CustomTable";
import NoMerchant from "./NoMerchant";

const CheckerDetailsTable = (props) => {
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    props.searchHandler(accountNumber);
    setAccountNumber("");
  };

  const view = props?.view ? props?.view : "view";
  const viewAction = (id, row) => {
    navigate(`/staff/merchant/checker/${view}/details/${id}`, { state: row });
  };

  return (
    <Box>
      <div className="table-title p-4 font-semibold flex justify-between w-full admin-table-header gap-10 items-center">
        <h2 className="">{props.title}</h2>
        {props.search && (
          <div className="search-options ">
            <div className="inputs flex gap-4">
              <InputSearch
                className="inputSearch"
                width={356}
                placeholder="Search account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
              <Button
                sx={{ width: "139px", height: "40px" }}
                variant="outlined"
                disableElevation
                disabled={accountNumber.length < 10}
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>
        )}
      </div>
      {props.tableData?.length < 1 && <NoMerchant refresh={props.refresh} />}
      {props.tableData?.length >= 1 && (
        <>
          <CustomTable headers={props.headers}>
            {props.tableData?.map((data, index) => (
              <StyledTableRow props={props} hover key={index}>
                <StyledTableCell
                  sx={{ textTransform: "capitalize" }}
                  component="th"
                  scope="row"
                >
                  {data?.accountName?.toLowerCase()}
                </StyledTableCell>
                <StyledTableCell>{data?.accountNumber}</StyledTableCell>
                <StyledTableCell>{data?.merchantCode}</StyledTableCell>
                <StyledTableCell>
                  {data?.emailAddress?.toLowerCase()}
                </StyledTableCell>
                <StyledTableCell>{data?.phoneNumber}</StyledTableCell>
                {props.action && (
                  <StyledTableCell>
                    <p
                      className="text-purple cursor-pointer"
                      onClick={() => viewAction(data?.merchantCode, data)}
                    >
                      view
                    </p>
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          </CustomTable>
        </>
      )}
    </Box>
  );
};

export default CheckerDetailsTable;
