import "./index.css";
import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";

const General = () => {
  const firstName = useSelector(
    (state) => state?.userAuth?.firstName
  )?.toLowerCase();
  const lastName = useSelector(
    (state) => state?.userAuth?.lastName
  )?.toLowerCase();
  const emailAddress = useSelector(
    (state) => state?.userAuth?.emailAddress
  )?.toLowerCase();

  const displayName = firstName + " " + lastName;

  return (
    <Box className="general-settings-container">
      <h1 className="title">General Settings</h1>
      <form className="settings-form">
        <div className="form-fields">
          <Avatar
            className="avatar"
            alt="Kareem Bishop"
            src="/broken-image.jpg"
          >
            KB
          </Avatar>
          <TextField
            name="displayName"
            label="Display Name"
            id="name"
            className="input-section"
            value={displayName}
            fullWidth
            disabled
            inputProps={{
              sx: { textTransform: "capitalize" },
            }}
          />
          <TextField
            name="email"
            label="Email"
            id="email"
            className="input-section"
            value={emailAddress}
            fullWidth
            disabled
          />
          <FormControl
            required
            className="status-select"
            sx={{ width: "50%" }}
            disabled
          >
            <InputLabel>Status</InputLabel>
            <Select id="status" value={"available"} label="Status">
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="unavailable">Unavailable</MenuItem>
            </Select>
          </FormControl>
        </div>
      </form>
    </Box>
  );
};

export default General;
