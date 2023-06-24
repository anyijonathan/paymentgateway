import { Box } from "@mui/material";

import Transactions from "../transactions/Transactions";

const TransactionReports = () => {
  return (
    <Box>
      <Transactions header="Transaction Reports" export={true} />
    </Box>
  );
};

export default TransactionReports;
