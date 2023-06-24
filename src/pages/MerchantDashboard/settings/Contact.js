import "./index.css";
import { useSelector } from "react-redux";
import { Box, InputAdornment, TextField } from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";

const Contact = () => {
  const email = useSelector(
    (state) => state?.userAuth?.emailAddress
  )?.toLowerCase();
  const number =
    useSelector((state) => state?.userAuth?.phoneNumber)?.toLowerCase() || "";
  const address = useSelector((state) => state?.userAuth?.address) || [];

  return (
    <Box className="contact-settings-container">
      <h1 className="title">Contact Information</h1>
      <form className="settings-form">
        <div className="form-fields">
          <TextField
            name="email"
            label="Email"
            id="email"
            className="input-section"
            value={email}
            fullWidth
            type="email"
            disabled
          />
          <TextField
            name="number"
            label="Mobile Number"
            id="number"
            className="input-section"
            value={number}
            fullWidth
            disabled
          />
          <div className="address-box">
            <TextField
              name="street"
              label="Business Address"
              id="street"
              className="input-section"
              value={address[0]?.toLowerCase()}
              inputProps={{
                sx: { textTransform: "capitalize" },
              }}
              fullWidth
              disabled
              placeholder="Str"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationCityIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Box className="two-in-one">
              <TextField
                name="city"
                id="city"
                className="input-section"
                value={address[1]?.toLowerCase()}
                inputProps={{
                  sx: { textTransform: "capitalize" },
                }}
                fullWidth
                disabled
                placeholder="City"
              />
              <TextField
                name="state"
                id="state"
                className="input-section"
                value={address[2]?.toLowerCase()}
                inputProps={{
                  sx: { textTransform: "capitalize" },
                }}
                fullWidth
                disabled
                placeholder="State"
              />
            </Box>
          </div>
        </div>
      </form>
    </Box>
  );
};

export default Contact;
