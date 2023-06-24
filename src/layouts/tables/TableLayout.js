import { useRef } from "react";
import styled from "@emotion/styled";
import {
  Paper,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableRow,
} from "@mui/material";

import Spinner from "../../utils/Spinner";

export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontFamily: "General Sans",
    color: "#170123",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "General Sans",
    color: "#45344F",
  },
}));

export const StyledTableRow = styled(TableRow)(({ props }) => ({
  "&:last-child td, &:last-child th": {
    border: ` ${props.showPagination ? "" : 0} `,
  },
}));

let tableTopRef;

export const scrollToTableTop = () => {
  tableTopRef.current.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "start",
  });
};

const TableLayout = (props) => {
  tableTopRef = useRef(null);

  const style = {
    boxShadow: "none",
    boxSizing: "border-box",
    border: "1px solid #E8E6E9",
    borderRadius: "8px",
    overflow: "unset",
    position: "relative",
    minHeight: "400px",
    scrollMarginTop: tableTopRef.current?.offsetTop,
  };

  return (
    <TableContainer
      ref={tableTopRef}
      component={Paper}
      sx={{ ...style, ...props.sx }}
      className={`table-container ${props.className}`}
    >
      {!props.hideLoader && <Spinner />}
      {props.children}
    </TableContainer>
  );
};

export default TableLayout;
