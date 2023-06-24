import { Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const Spinner = (props) => {
  const isLoading = useSelector((state) => state.systemControllers.isLoading);
  const style = {
    background: "rgba(255, 255, 255, 0.7)",
  };
  if (isLoading) {
    return (
      <Box className="absolute h-full w-full top-0 left-0 z-10 grid justify-center items-center" sx={{ ...style }}>
        <CircularProgress color={props.color || "secondary"} size={props.size} />
      </Box>
    );
  } else {
    return <></>;
  }
};

export default Spinner;
