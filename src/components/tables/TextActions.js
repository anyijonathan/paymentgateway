import { Button, Stack } from "@mui/material";

const TextActions = (props) => {
  return (
    <Stack gap="20px" alignItems="center" direction="row">
      <Button
        variant="text"
        disableRipple
        color="primary"
        sx={{ padding: "0px", minWidth: "0px" }}
        onClick={() => props.onEdit(props.row)}
      >
        Edit
      </Button>
      <Button
        variant="text"
        disableRipple
        color="error"
        sx={{ padding: "0px", minWidth: "0px" }}
        onClick={() => props.onDelete(props.row)}
      >
        Delete
      </Button>
    </Stack>
  );
};

export default TextActions;
