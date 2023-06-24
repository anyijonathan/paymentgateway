import "./index.css";
import { useState } from "react";
import { Box, Button } from "@mui/material";

import CreateMerchant from "../modals/table modals/admin/CreateMerchant";

const AdminDasboardHeader = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const createMerchant = () => {
    handleOpen();
  };
  return (
    <div className="flex justify-between">
      <h1 className="pageHeader">{props.header}</h1>
      {props.createMerchant && (
        <Box className="action-buttons ml-4" sx={{ width: "201px", minHeight: "40px" }}>
          <Button
            sx={{ width: "100%", height: "100%" }}
            variant="contained"
            disableElevation
            onClick={createMerchant}
          >
            <span className="text-2xl pr-2">+</span>Create New Merchant
          </Button>
          <CreateMerchant open={open} onClose={handleClose} reload={props.reload} />
        </Box>
      )}
    </div>
  );
};

export default AdminDasboardHeader;
