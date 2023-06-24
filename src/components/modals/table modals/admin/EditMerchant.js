import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";

import { systemControllersActions } from "../../../../services/reducers/system.reducer";
import { editMerchant } from "../../../../services/actions/staffMakerChecker.actions";
import { editMerchantSchema } from "../../../../utils/formikFormValidators";
import SuccessModalContent from "./SuccessModalContent";
import Spinner from "../../../../utils/Spinner";
import { IMAGES } from "../../../../assets";

const EditMerchant = (props) => {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);

  const merchant = props.merchant;
  const formik = useFormik({
    initialValues: {
      accountNumber: merchant?.accountNumber,
      phoneNumber: merchant?.phoneNumber,
      merchantAddress: merchant?.merchantAddress,
      city: merchant?.city,
      merchantState: merchant?.merchantState,
    },
    validationSchema: editMerchantSchema,
    onSubmit: (values) => {
      submitHandler(values);
    },
  });

  const submitHandler = async (prop) => {
    dispatch(systemControllersActions.startLoading());
    let payload = prop;
    try {
      const response = await editMerchant(payload);

      if (response) {
        dispatch(systemControllersActions.endLoading());
        setSuccess(true);
      }
    } catch (error) {
      dispatch(systemControllersActions.endLoading());
      toast.error(error.message);
    }
  };

  return (
    <>
      <Dialog className="modal-dialog user-modal" open={props.open} onClose={props.closeModal} maxWidth="xs" fullWidth>
        <Box className="modal-dialog-inner">
          <Spinner />
          {!success && (
            <>
              <div className="modal-header">
                <div className="logo">
                  <img src={IMAGES.logo} alt="FCMB Logo" />
                </div>
                <DialogTitle className="modal-title">{merchant?.accountName}</DialogTitle>
              </div>
              <form className="modal-body" onSubmit={formik.handleSubmit}>
                <DialogContent className="form-content">
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
                  />
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
                    error={formik.touched.merchantAddress && Boolean(formik.errors.merchantAddress)}
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
                      error={formik.touched.merchantState && Boolean(formik.errors.merchantState)}
                      helperText={formik.touched.merchantState && formik.errors.merchantState}
                    />
                  </Stack>
                </DialogContent>
                <DialogActions className="modal-actions">
                  <Button className="action-btn" onClick={props.closeModal} variant="outlined">
                    Cancel
                  </Button>
                  <Button className="action-btn" variant="contained" color="primary" type="submit" disableElevation>
                    Update Merchant
                  </Button>
                </DialogActions>
              </form>
            </>
          )}
          {success && (
            <SuccessModalContent
              header="Merchant updated successfully!"
              subHeader={`You made changes to ${merchant.merchantCode}`}
              actionText="close"
              closeModal={() => {
                props.closeModal();
                setSuccess(false);
                props.reload();
              }}
            />
          )}
        </Box>
      </Dialog>
    </>
  );
};

export default EditMerchant;
