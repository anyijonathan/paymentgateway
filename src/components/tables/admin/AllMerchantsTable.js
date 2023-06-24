import "./style.css";
import { useState } from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { StyledTableCell, StyledTableRow } from "../../../layouts/tables/TableLayout";
import CreateMerchant from "../../modals/table modals/admin/CreateMerchant";
import DeleteMerchant from "../../modals/table modals/admin/DeleteMerchant";
import { formatAddress } from "../../../utils/helperFunctions";
import InputSearch from "../../search inputs/InputSearch";
import Actions from "../Actions";
import CustomTable from "../CustomTable";
import NoMerchant from "./NoMerchant";

const AllMerchantsTable = (props) => {
  const navigate = useNavigate();
  const userRole = useSelector((state) => state?.userAuth?.role)?.toLowerCase();
  const [accountNumber, setAccountNumber] = useState("");
  const [values, setValues] = useState({
    openDeleteModal: false,
    merchantId: "",
    merchantDetails: {},
    openCreateModal: false,
    tableData: props.tableData,
  });

  const tableHeaders = [
    "Account Number",
    "Account Name",
    "Merchant Code",
    "Email Address",
    "Phone Number",
    "Residential Address",
    "Actions",
  ];

  const handleClose = (prop) => {
    prop === "delete" && setValues({ ...values, openDeleteModal: false });
    prop === "create" && setValues({ ...values, openCreateModal: false });
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

  const viewAction = (id, row) => {
    navigate(`/staff/merchant/${userRole}/view/details/${id}`, { state: row });
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
    { name: "View", action: viewAction },
    { name: "Delete", action: deleteAction, style: "delete" },
  ];

  return (
    <div>
      <div className="table-title p-4 font-semibold flex justify-between w-full admin-table-header gap-10">
        <h2>
          All Merchants
          <br />
          <span className="sub-title">{totalMerchants(props?.totalMerchants)}</span>
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
      {props?.tableData?.length < 1 && <NoMerchant refresh={props.refresh} />}
      {props?.tableData?.length >= 1 && (
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
              <StyledTableCell>{data?.emailAddress?.toLowerCase()}</StyledTableCell>
              <StyledTableCell>{data?.phoneNumber}</StyledTableCell>
              <StyledTableCell sx={{ textTransform: "capitalize" }}>
                {formatAddress(data?.merchantAddress?.toLowerCase())}
              </StyledTableCell>
              <StyledTableCell>
                {userRole === "maker" ? (
                  <Actions menu={actions} id={data?.merchantCode} row={data} />
                ) : (
                  <p
                    className="text-purple cursor-pointer"
                    onClick={() => viewAction(data?.merchantCode, data)}
                  >
                    view
                  </p>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </CustomTable>
      )}
      <DeleteMerchant
        open={values.openDeleteModal}
        handleClose={() => handleClose("delete")}
        data={values?.merchantDetails}
        header="Are you sure you want to delete?"
        goBack={props?.refresh}
      />

      <CreateMerchant
        open={values.openCreateModal}
        onClose={() => handleClose("create")}
        reload={props?.refresh}
      />
    </div>
  );
};

export default AllMerchantsTable;
