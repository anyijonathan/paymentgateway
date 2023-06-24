import { Button } from "@mui/material";

const CButton = (props) => {
  return (
    <Button
      sx={{
        minWidth: props.minWidth || "150px",
        height: props.height || "45px",
      }}
      variant={props.variant || "contained"}
      color={props.color || "primary"}
      disableElevation
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </Button>
  );
};

export default CButton;
