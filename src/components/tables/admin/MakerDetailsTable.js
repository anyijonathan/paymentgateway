import "./style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Chip } from "@mui/material";

import { StyledTableCell, StyledTableRow } from "../../../layouts/tables/TableLayout";
import DeleteMerchant from "../../modals/table modals/admin/DeleteMerchant";
import CreateMerchant from "../../modals/table modals/admin/CreateMerchant";
import InputSearch from "../../search inputs/InputSearch";
import CustomTable from "../CustomTable";
import NoMerchant from "./NoMerchant";
import Actions from "../Actions";

const MakerDetailsTable = (props) => {
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState("");
  const [values, setValues] = useState({
    openDeleteModal: false,
    merchantId: "",
    merchantDetails: {},
    openCreateModal: false,
    tableData: props?.tableData,
  });

  const tableHeaders = [
    "Account Name",
    "Account Number",
    "Merchant Code",
    "Email Address",
    "Phone Number",
    "status",
    "Actions",
  ];

  const handleClose = (prop) => {
    prop === "delete" && setValues({ ...values, openDeleteModal: false });
    prop === "create" && setValues({ ...values, openCreateModal: false });
  };

  const handleOpen = (prop) => {
    prop === "delete" && setValues({ ...values, openDeleteModal: true });
    prop === "create" && setValues({ ...values, openCreateModal: true });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    props.searchHandler(accountNumber);
    setAccountNumber("");
  };

  const totalMerchants = (data) => {
    if (data < 1) {
      return "no merchant";
    } else if (data === 1) {
      return "1 merchant";
    } else {
      return `${data} merchants`;
    }
  };

  const view = props?.view ? props?.view : "view";

  const editAction = (id, row) => {
    navigate(`/staff/merchant/maker/${view}/details/${id}`, { state: row });
  };

  const deleteAction = (id, row) => {
    setValues({
      ...values,
      openDeleteModal: true,
      merchantId: id,
      merchantDetails: row,
    });
  };

  const actions = [
    { name: "Details", action: editAction },
    { name: "Delete", action: deleteAction, style: "delete" },
  ];

  return (
    <Box>
      <div className="table-title p-4 font-semibold flex justify-between w-full admin-table-header gap-10 items-center">
        <h2 className="">
          {props.title}
          {!props.noSub && (
            <Chip
              label={totalMerchants(props?.totalMerchants)}
              color="info"
              className="ml-2 chip-bg"
            />
          )}
        </h2>
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
      </div>
      {props.tableData?.length < 1 && <NoMerchant createMerchant={() => handleOpen("create")} />}
      {props.tableData?.length >= 1 && (
        <>
          <CustomTable headers={tableHeaders}>
            {props?.tableData?.map((data, index) => (
              <StyledTableRow props={props} hover key={index}>
                <StyledTableCell sx={{ textTransform: "capitalize" }} component="th" scope="row">
                  {data?.accountName?.toLowerCase()}
                </StyledTableCell>
                <StyledTableCell>{data?.accountNumber}</StyledTableCell>
                <StyledTableCell>FCMB{data?.merchantCode}</StyledTableCell>
                <StyledTableCell>{data?.emailAddress?.toLowerCase()}</StyledTableCell>
                <StyledTableCell>{data?.phoneNumber}</StyledTableCell>
                <StyledTableCell id={data?.approvalStatus?.toLowerCase()}>
                  {data?.approvalStatus?.toLowerCase()}
                </StyledTableCell>
                <StyledTableCell>
                  <Actions menu={actions} id={data?.merchantCode} row={data} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </CustomTable>
        </>
      )}
      <DeleteMerchant
        open={values.openDeleteModal}
        handleClose={() => handleClose("delete")}
        data={values?.merchantDetails}
        header="Are you sure you want to delete?"
        goBack={props.refresh}
      />
      <CreateMerchant
        open={values.openCreateModal}
        onClose={() => handleClose("create")}
        reload={props.refresh}
      />
    </Box>
  );
};

export default MakerDetailsTable;
