import { useEffect, useState, useCallback } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { allStaff } from "../../services/actions/staffAdmin.actions";
import { systemControllersActions } from "../../services/reducers/system.reducer";

import TableLayout, { scrollToTableTop } from "../../layouts/tables/TableLayout";
import StaffModal from "../../components/modals/table modals/admin/StaffModal";
import CustomPagination from "../../components/tables/CustomPagination";
import SelectSearch from "../../components/search inputs/SelectSearch";
import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import InputSearch from "../../components/search inputs/InputSearch";
import StaffTable from "../../components/tables/admin/StaffTable";
import NoTableData from "../../components/tables/NoTableData";

const AdminManageStaff = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [tableRows, setTableRows] = useState([]);
  const [searchParams, setSearchParams] = useState({});

  const emptyUser = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    role: "",
  };
  const [initialValues, setInitialValues] = useState(emptyUser);

  const roleOptions = [
    {
      value: "All",
      text: "All",
    },
    {
      value: "SuperAdmin",
      text: "SuperAdmin",
    },
    {
      value: "Maker",
      text: "Maker",
    },
    {
      value: "Checker",
      text: "Checker",
    },
  ];

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setModalTitle("");
    setInitialValues(emptyUser);
    setOpen(false);
  };

  const editUserHandler = (prop) => {
    setInitialValues(prop);
    setModalTitle("Edit " + prop.firstName + " " + prop.lastName);
    openModal();
  };

  const createUserHandler = () => {
    setInitialValues(emptyUser);
    setModalTitle("Add New Staff");
    openModal();
  };

  const fetchAllStaffUsers = useCallback(
    async (params, page) => {
      dispatch(systemControllersActions.startLoading());
      try {
        const response = await allStaff(params, page);
        if (response) {
          setTableRows(response?.data || []);
          setPage(response?.currentPageNumber || 1);
          setTotalPages(response?.totalPages || 0);
        }
        dispatch(systemControllersActions.endLoading());
      } catch (error) {
        dispatch(systemControllersActions.endLoading());
        toast.error(error.message);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchAllStaffUsers();
  }, [fetchAllStaffUsers]);

  const searchParamsHandler = (prop) => (e) => {
    setSearchParams({
      ...searchParams,
      [prop]: e.target.value,
    });
  };

  const searchHandler = () => {
    if (searchParams?.name?.length < 1) {
      delete searchParams.name;
    }
    fetchAllStaffUsers(searchParams);
  };

  const paginationHandler = (prop) => {
    scrollToTableTop();
    setPage(prop);
    fetchAllStaffUsers(searchParams, prop);
  };

  return (
    <>
      <StaffModal
        open={open}
        closeModal={closeModal}
        reload={() => fetchAllStaffUsers(searchParams, page)}
        initialValues={initialValues}
        title={modalTitle}
      />
      <DashboardLayout type="staff">
        <Box className="manage-staff-container">
          <h1 className="page-title">Manage Users</h1>
          <div className="search-options">
            <div className="inputs">
              <SelectSearch
                id="roleRange"
                className="selectBox"
                width={150}
                label="Role"
                value={searchParams?.role}
                selectItems={roleOptions}
                onSelect={searchParamsHandler("role")}
              />
              <InputSearch
                className="inputSearch"
                width={400}
                placeholder="Search by name ..."
                onChange={searchParamsHandler("name")}
              />
            </div>
            <div className="buttons">
              <Box className="action-buttons" sx={{ width: "150px", height: "40px" }}>
                <Button
                  sx={{ width: "100%", height: "100%" }}
                  variant="outlined"
                  disableElevation
                  onClick={searchHandler}
                >
                  Search
                </Button>
              </Box>
              <Box className="action-buttons" sx={{ height: "40px" }}>
                <Button
                  sx={{ width: "100%", height: "100%" }}
                  className="invite-user-button"
                  variant="contained"
                  disableElevation
                  onClick={createUserHandler}
                  startIcon={<AddIcon />}
                >
                  Invite New User
                </Button>
              </Box>
            </div>
          </div>
          <TableLayout>
            {tableRows?.length > 0 && (
              <StaffTable
                tableRows={tableRows}
                onEdit={editUserHandler}
                reload={() => fetchAllStaffUsers(searchParams, page)}
              />
            )}
            {tableRows?.length < 1 && (
              <NoTableData text="To add to please" link="Create Staff User" onClick={createUserHandler} />
            )}
            {tableRows?.length > 0 && totalPages > 1 && (
              <CustomPagination paginationHandler={paginationHandler} totalPages={totalPages} page={page} />
            )}
          </TableLayout>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default AdminManageStaff;
