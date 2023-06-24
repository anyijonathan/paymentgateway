import { useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, TextField } from "@mui/material";
import moment from "moment";

const DateRange = (props) => {
  const [dates, setDates] = useState({ startDate: null, endDate: null });
  const [openEnd, setOpenEnd] = useState(false);
  const dateChangeHandler = (prop) => (e) => {
    setDates({ ...dates, [prop]: e });
    let date = moment(e?._d).format("YYYY-MM-DD");
    if (date.includes("undefined")) {
      props.setDate(prop, null);
    } else {
      props.setDate(prop, date);
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box
        className={props.className}
        sx={{ display: "flex", alignItems: "center", gap: "5px" }}
      >
        <Box className="dateRangePicker" sx={{ width: `${props.width}px` }}>
          <DatePicker
            label="Start Date"
            className="dateInput"
            closeOnSelect
            onAccept={() => setOpenEnd(true)}
            value={dates.startDate}
            onChange={dateChangeHandler("startDate")}
            renderInput={(params) => <TextField {...params} size="small" />}
            InputProps={{ onKeyDown: (e) => e.preventDefault() }}
          />
        </Box>
        <p>-</p>
        <Box className="dateRangePicker" sx={{ width: `${props.width}px` }}>
          <DatePicker
            label="End Date"
            className="dateInput"
            open={openEnd}
            onClose={() => setOpenEnd(false)}
            onOpen={() => setOpenEnd(true)}
            closeOnSelect
            minDate={dates.startDate}
            value={dates.endDate}
            onChange={dateChangeHandler("endDate")}
            renderInput={(params) => <TextField {...params} size="small" />}
            InputProps={{ onKeyDown: (e) => e.preventDefault() }}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default DateRange;
