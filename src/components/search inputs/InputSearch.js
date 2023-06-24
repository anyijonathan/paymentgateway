import React from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const InputSearch = (props) => {
  return (
    <Box className={props.className} width={props.width}>
      <TextField
        sx={{ height: "100%" }}
        fullWidth
        size="small"
        id="input-search"
        value={props.value}
        placeholder={props.placeholder}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
          sx: { height: "100%" },
        }}
        onChange={props.onChange}
      />
    </Box>
  );
};

export default InputSearch;
