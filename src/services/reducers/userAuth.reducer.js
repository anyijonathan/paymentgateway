import { createSlice } from "@reduxjs/toolkit";
import { decrypt } from "../../utils/security";

let authData = {
  isLoggedIn: false,
};
const encryptedData = localStorage.getItem("PGP");
if (encryptedData) {
  authData = JSON.parse(decrypt(encryptedData));
}

const userAuthReducer = createSlice({
  name: "userAuth",
  initialState: { ...authData },
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = action?.payload?.isLoggedIn;
      state.userType = action?.payload?.userType;
      state.role = action?.payload?.role;
      state.firstName = action?.payload?.firstName;
      state.lastName = action?.payload?.lastName;
      state.accountName = action?.payload?.accountName;
      state.emailAddress = action?.payload?.emailAddress;
      state.phoneNumber = action?.payload?.phoneNumber;
      state.isUserAdmin = action?.payload?.isUserAdmin;
      state.tokenResponse = action?.payload?.tokenResponse;
      state.staffId = action?.payload?.staffId;
      state.userId = action?.payload?.userId;
      state.merchantCode = action?.payload?.merchantCode;
      state.accountNumber = action?.payload?.accountNumber;
      state.userFirstLogin = action?.payload?.userFirstLogin;
      state.address = action?.payload?.address;
      state.description = action?.payload?.description;
      state.website = action?.payload?.website;
      state.displayName = action?.payload?.displayName;
      state.callbackUrl = action?.payload?.callbackUrl;
    },
    logOut(state) {
      state = {};
      state.isLoggedIn = false;
    },
    update(state, action) {
      state.description = action?.payload?.description;
      state.website = action?.payload?.website;
      state.displayName = action?.payload?.displayName;
      state.callbackUrl = action?.payload?.callbackUrl;
    },
  },
});
export default userAuthReducer.reducer;
export const userAuthActions = userAuthReducer.actions;
