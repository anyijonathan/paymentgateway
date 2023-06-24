import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";

import { IMAGES } from "../../../../assets";
import {
  createMerchant,
  verifyMerchantAccountNumber,
} from "../../../../services/actions/staffMakerChecker.actions";
import { systemControllersActions } from "../../../../services/reducers/system.reducer";
import { createMerchantSchema } from "../../../../utils/formikFormValidators";
import { numberOnly } from "../../../../utils/constants";
import SuccessModalContent from "./SuccessModalContent";
import Spinner from "../../../../utils/Spinner";

const CreateMerchant = (props) => {
  const dispatch = useDispatch();
  const [accountIsValid, setAccountIsValid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [disable, setDisable] = useState({
    emailAddress: true,
    phoneNumber: true,
  });
  const [values, setValues] = useState({
    accountNumber: "",
    accountName: "",
    emailAddress: "",
    phoneNumber: "",
    merchantAddress: "",
  });

  const handleAccountInquiry = async (e) => {
    e.preventDefault();
    dispatch(systemControllersActions.startLoading());
    try {
      const data = await verifyMerchantAccountNumber(accountNumber);
      if (data) {
        setValues({ ...values, ...data });
        setAccountIsValid(true);
      }
    } catch (error) {
      dispatch(systemControllersActions.endLoading());
      toast.error(error.message);
    } finally {
      dispatch(systemControllersActions.endLoading());
    }
  };

  const handleCancel = () => {
    setValues({});
    setAccountNumber("");
    setAccountIsValid(false);
    setSuccess(false);
    props.onClose();
  };

  const formik = useFormik({
    initialValues: { ...values, city: "", merchantState: "" },
    enableReinitialize: true,
    validationSchema: createMerchantSchema,
    onSubmit: (values) => {
      submitHandler(values);
    },
  });

  const toggleHandler = (prop) => (e) => {
    setDisable({ ...disable, [prop]: !disable[prop] });
  };

  const closeSuccess = () => {
    handleCancel();
    props.reload();
  };

  const submitHandler = async (prop) => {
    dispatch(systemControllersActions.startLoading());
    let payload = prop;
    try {
      const response = await createMerchant(payload);

      if (response) {
        setSuccess(true);
      }
    } catch (error) {
      dispatch(systemControllersActions.endLoading());
      toast.error(error.message);
    } finally {
      dispatch(systemControllersActions.endLoading());
    }
  };

  return (
    <>
      <Dialog
        className="modal-dialog user-modal"
        open={props.open}
        onClose={handleCancel}
        maxWidth={!accountIsValid || success ? "xs" : "sm"}
        fullWidth
      >
        <Box className="modal-dialog-inner">
          <Spinner />

          {!success && (
            <>
              <div className="modal-header">
                <div className="logo">
                  <img src={IMAGES.logo} alt="FCMB Logo" />
                </div>
                <DialogTitle className="modal-title">Create New Merchant</DialogTitle>
              </div>
              {!accountIsValid && (
                <form className="modal-body" onSubmit={handleAccountInquiry}>
                  <div>
                    <div className="form-content w-full">
                      <TextField
                        name="accountNumber"
                        label="Account Number"
                        id="accountNumber"
                        className="input-section"
                        fullWidth
                        required
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                      />
                    </div>
                    <div className="action-buttons flex gap-4 w-full mt-5">
                      <Button
                        variant="outlined"
                        sx={{
                          height: "56px",
                          fontSize: "16px",
                          boxShadow: "none",
                          width: "50%",
                        }}
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        disableElevation
                        disabled={!(accountNumber.length === 10 && accountNumber.match(numberOnly))}
                        sx={{
                          height: "56px",
                          fontSize: "16px",
                          boxShadow: "none",
                          width: "50%",
                        }}
                        onClick={handleAccountInquiry}
                      >
                        Create Merchant
                      </Button>
                    </div>
                  </div>
                </form>
              )}
              {accountIsValid && (
                <form className="modal-body" onSubmit={formik.handleSubmit}>
                  <DialogContent className="form-content">
                    <TextField
                      name="accountName"
                      label="Account Name"
                      id="accountName"
                      className="input-section"
                      fullWidth
                      required
                      type="text"
                      value={formik.values.accountName}
                      disabled
                    />
                    <Stack direction="column">
                      <TextField
                        name="emailAddress"
                        label="Email"
                        id="emailAddress"
                        className="input-section"
                        type="email"
                        fullWidth
                        required
                        value={formik.values.emailAddress}
                        onChange={formik.handleChange}
                        error={formik.touched.emailAddress && Boolean(formik.errors.emailAddress)}
                        helperText={formik.touched.emailAddress && formik.errors.emailAddress}
                        disabled={disable.emailAddress}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="secondary"
                            disableRipple
                            sx={{
                              "& .MuiSvgIcon-root": { fontSize: 15 },
                            }}
                            onChange={toggleHandler("emailAddress")}
                          />
                        }
                        label={
                          <span className="text-grey" style={{ fontSize: "14px" }}>
                            Edit email address
                          </span>
                        }
                      />
                    </Stack>
                    <div
                      className="form-split-container"
                      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
                    >
                      <Stack direction="column">
                        <TextField
                          name="phoneNumber"
                          label="Phone Number"
                          id="phoneNumber"
                          className="input-section"
                          fullWidth
                          required
                          type="tel"
                          value={formik.values.phoneNumber}
                          onChange={formik.handleChange}
                          error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                          disabled={disable.phoneNumber}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="secondary"
                              disableRipple
                              sx={{
                                "& .MuiSvgIcon-root": { fontSize: 15 },
                              }}
                              onChange={toggleHandler("phoneNumber")}
                            />
                          }
                          label={
                            <span className="text-grey" style={{ fontSize: "14px" }}>
                              Edit phone number
                            </span>
                          }
                        />
                      </Stack>
                      <TextField
                        name="accountNumber"
                        label="Account Number"
                        id="accountNumber"
                        className="input-section"
                        fullWidth
                        required
                        value={formik.values.accountNumber}
                        disabled
                      />
                    </div>
                    <Stack direction="column" gap="10px">
                      <TextField
                        name="merchantAddress"
                        label="Address"
                        id="merchantAddress"
                        className="input-section"
                        fullWidth
                        required
                        type="text"
                        value={formik.values.merchantAddress}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.merchantAddress && Boolean(formik.errors.merchantAddress)
                        }
                        helperText={formik.touched.merchantAddress && formik.errors.merchantAddress}
                      />
                      <Stack direction="row" gap="20px">
                        <TextField
                          name="city"
                          label="City"
                          id="city"
                          className="input-section"
                          fullWidth
                          required
                          type="text"
                          value={formik.values.city}
                          onChange={formik.handleChange}
                          error={formik.touched.city && Boolean(formik.errors.city)}
                          helperText={formik.touched.city && formik.errors.city}
                        />
                        <TextField
                          name="merchantState"
                          label="State"
                          id="merchantState"
                          className="input-section"
                          fullWidth
                          required
                          type="text"
                          value={formik.values.merchantState}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.merchantState && Boolean(formik.errors.merchantState)
                          }
                          helperText={formik.touched.merchantState && formik.errors.merchantState}
                        />
                      </Stack>
                    </Stack>
                  </DialogContent>
                  <DialogActions className="modal-actions">
                    <Button className="action-btn" onClick={handleCancel} variant="outlined">
                      Cancel
                    </Button>
                    <Button
                      className="action-btn"
                      variant="contained"
                      color="primary"
                      type="submit"
                      disableElevation
                    >
                      Create Merchant
                    </Button>
                  </DialogActions>
                </form>
              )}
            </>
          )}
          {accountIsValid && success && (
            <SuccessModalContent
              header="New merchant sent for approval!"
              subHeader={`New merchant code ${values?.customerId} assigned`}
              actionText="close"
              closeModal={closeSuccess}
            />
          )}
        </Box>
      </Dialog>
    </>
  );
};

export default CreateMerchant;
