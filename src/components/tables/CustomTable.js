import { Box, Table, TableBody, TableHead, TableRow } from "@mui/material";
import React from "react";
import { StyledTableCell } from "../../layouts/tables/TableLayout";

const CustomTable = (props) => {
  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead sx={{ background: "#F2EEF7" }}>
          <TableRow>
            {props.headers?.map((item, index) => (
              <StyledTableCell key={index}>{item}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{props.children}</TableBody>
      </Table>
    </Box>
  );
};

export default CustomTable;
