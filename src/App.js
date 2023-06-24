import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material";

import theme from "./utils/Theme";
import AppRoutes from "./routes/Routes";
import PushNotification from "./components/pushNotification/PushNotification";

function App() {
  const isLoggedIn = useSelector((state) => state?.userAuth?.isLoggedIn);

  return (
    <div className="App">
      {isLoggedIn && <PushNotification />}
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </div>
  );
}

export default App;
