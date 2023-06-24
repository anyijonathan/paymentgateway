import "./index.css"
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { fetchToken } from "../../../services/actions/merchant.actions";

const ApiKeys = () => {
  const merchantCode = useSelector((state) => state?.userAuth?.merchantCode)
  const [keys, setKeys] = useState({
    publicKey: "",
    secretKey: "",
  })
  const [showKey, setShowKey] = useState(false);

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  const fetchTokenHandler = useCallback(
    async() => {
      try {
        const response = await fetchToken(merchantCode)
        if (response) {
          setKeys(response)
        }
      } catch (error) {
        toast.error(error.message)
      }
    },
    [merchantCode],
  )
  useEffect(() => {
fetchTokenHandler()
  }, [fetchTokenHandler])
  

  return (
    <Box className="api-settings-container">
      <h1 className="title">API Keys Settings</h1>
      <form className="settings-form">
        <div className="form-fields">
        <TextField
            name="merchantCode"
            label="Merchant Code"
            id="merchantCode"
            className="input-section"
            value={merchantCode}
            fullWidth
            disabled
          />
          <TextField
            name="publicKey"
            label="Public Key"
            id="publicKey"
            className="input-section"
            value={keys.publicKey}
            fullWidth
            disabled
          />
          <TextField
            name="secretKey"
            label="Secret Key"
            id="secretKey"
            className="input-section"
            fullWidth
            required
            disabled
            type={showKey ? "text" : "password"}
            value={keys.secretKey}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowKey(!showKey)}
                    onMouseDown={handleMouseDown}
                    edge="end"
                  >
                    {showKey ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </form>
    </Box>
  );
};

export default ApiKeys;
