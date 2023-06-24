import { createSlice } from "@reduxjs/toolkit";

const systemReducer = createSlice({
  name: "systemControllers",
  initialState: { isLoading: false, notifications: [] },
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    endLoading(state) {
      state.isLoading = false;
    },
    setNotification(state, action) {
      state.notifications = action.payload;
    },
  },
});
export default systemReducer.reducer;
export const systemControllersActions = systemReducer.actions;
