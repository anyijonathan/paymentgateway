import "./index.css";
import { Box } from "@mui/material";

import TableLayout from "../../tables/TableLayout";
import Switch from "../../../components/switch/Switch";

const TransactionDetailsLayout = (props) => {
  return (
    <TableLayout sx={{ padding: "15px 15px 40px" }} className={props?.className}>
      <Box className="transaction-details-container">
        <Box className="section-heading">
          <div className="flex justify-between align-middle">
            <h2 className="title">{props?.title}</h2>
            {props?.switch && props?.status === "approved" && (
              <Switch isToggled={props?.isToggled} onToggle={props?.onToggle} />
            )}
          </div>
          <hr></hr>
        </Box>
        <div className="section-body">{props?.children}</div>
      </Box>
    </TableLayout>
  );
};

export default TransactionDetailsLayout;
