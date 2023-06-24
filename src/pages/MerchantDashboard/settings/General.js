import "./index.css";
import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, InputAdornment, Stack, TextField } from "@mui/material";

import HttpIcon from "@mui/icons-material/Http";

import { updateMerchantSchema } from "../../../utils/formikFormValidators";
import { updateProfile } from "../../../services/actions/merchant.actions";
import { systemControllersActions } from "../../../services/reducers/system.reducer";
import { userAuthActions } from "../../../services/reducers/userAuth.reducer";

const General = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state?.userAuth?.role)?.toLowerCase();
  const website = useSelector((state) => state?.userAuth?.website)?.toLowerCase();
  const callbackUrl = useSelector((state) => state?.userAuth?.callbackUrl)?.toLowerCase();
  const displayName = useSelector((state) => state?.userAuth?.displayName)?.toLowerCase();
  const merchantCode = useSelector((state) => state?.userAuth?.merchantCode);
  const description = useSelector((state) => state?.userAuth?.description);
  const [isEdit, setIsEdit] = useState(false);

  const formik = useFormik({
    initialValues: {
      merchantCode: merchantCode,
      displayName: displayName,
      website: website || "",
      callbackUrl: callbackUrl || "",
      description: description || "",
    },
    validationSchema: updateMerchantSchema,
    onSubmit: (values) => {
      submitHandler(values);
    },
  });

  const submitHandler = async (prop) => {
    dispatch(systemControllersActions.startLoading());
    let payload = prop;
    try {
      const response = await updateProfile(payload);
      console.log(response)
      const res = dispatch(userAuthActions.update(response));
      if (res) {
        dispatch(systemControllersActions.endLoading());
        toast.success("Profile updated successfully");
        setIsEdit(false);
      }
    } catch (error) {
      dispatch(systemControllersActions.endLoading());
      toast.error(error.message);
    }
  };

  return (
    <Box className="general-settings-container">
      <Stack direction="row" justifyContent="space-between">
        <h1 className="title">General Settings</h1>
        {role === "merchantadmin" &&
          (!isEdit ? (
            <p
              className="text-sm text-purple cursor-pointer font-[500]"
              onClick={() => setIsEdit(!isEdit)}
            >
              Edit Profile
            </p>
          ) : (
            <p
              className="text-sm text-red cursor-pointer font-[500]"
              onClick={() => setIsEdit(!isEdit)}
            >
              Cancel
            </p>
          ))}
      </Stack>
      <form className="settings-form" onSubmit={formik.handleSubmit}>
        <div className="form-fields">
          <TextField
            name="displayName"
            label="Display Name"
            id="displayName"
            className="input-section"
            fullWidth
            required
            disabled={!isEdit}
            inputProps={{
              sx: { textTransform: "capitalize" },
            }}
            value={formik.values.displayName}
            onChange={formik.handleChange}
            error={formik.touched.displayName && Boolean(formik.errors.displayName)}
            helperText={formik.touched.displayName && formik.errors.displayName}
          />
          <TextField
            name="description"
            label="Description"
            id="description"
            className="textArea-section"
            fullWidth
            multiline
            rows={4}
            disabled={!isEdit}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            name="website"
            label="Website"
            id="website"
            className="input-section"
            fullWidth
            placeholder="www."
            disabled={!isEdit}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HttpIcon />
                </InputAdornment>
              ),
            }}
            value={formik.values.website}
            onChange={formik.handleChange}
            error={formik.touched.website && Boolean(formik.errors.website)}
            helperText={formik.touched.website && formik.errors.website}
          />
          <TextField
            name="callbackUrl"
            label="Callback URL"
            id="callbackUrl"
            className="input-section"
            fullWidth
            placeholder="www."
            disabled={!isEdit}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HttpIcon />
                </InputAdornment>
              ),
            }}
            value={formik.values.callbackUrl}
            onChange={formik.handleChange}
            error={formik.touched.callbackUrl && Boolean(formik.errors.callbackUrl)}
            helperText={formik.touched.callbackUrl && formik.errors.callbackUrl}
          />
        </div>
        {isEdit && (
          <Button
            type="submit"
            className="save-changes-btn"
            color="primary"
            variant="contained"
            disableElevation
          >
            Update Profile
          </Button>
        )}
      </form>
    </Box>
  );
};

export default General;
