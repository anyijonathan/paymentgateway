import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const SelectSearch = (props) => {
  return (
    <Box className={props.className} width={props.width}>
      <FormControl fullWidth size="small">
        <InputLabel id={`${props.id}-select-label`}>{props.label}</InputLabel>
        <Select
          id={`${props.id}-select`}
          value={props.value}
          label={props.label}
          onChange={props.onSelect}
        >
          {props.selectItems?.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectSearch;
