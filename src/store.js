import { combineReducers, configureStore } from "@reduxjs/toolkit";
import systemReducer from "./services/reducers/system.reducer";
import userAuthReducer from "./services/reducers/userAuth.reducer";

const rootReducer = combineReducers({
  userAuth: userAuthReducer,
  systemControllers: systemReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
