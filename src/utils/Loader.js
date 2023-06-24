import { Backdrop, Box, LinearProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Loader = () => {
  const isLoading = useSelector((state) => state.systemControllers.isLoading);
  const style = {
    position: "absolute",
    zIndex: "2",
    top: "0px",
    width: "100%",
  };
  if (isLoading) {
    return (
      <Box className="loader" sx={{ ...style }}>
        <Backdrop open={true} />
        <LinearProgress />
      </Box>
    );
  } else {
    return <></>;
  }
};

export default Loader;
