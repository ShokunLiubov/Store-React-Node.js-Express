import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes } from "react-router-dom";
import PrivateRoute from "./MyRoutes/PrivateRotes";
import store from "./redux/redux-store";
import { AppRoutes } from "./routes/AppRoutes";
import "./global.scss";
import { SidebarProvider } from "./api/Context/sidebarContext";
import { checkAuth } from "./redux/authReducer/authReducer";
import RouterCombiner from "./routes/RouterCombiner";

const App: React.FC = () => {
  const auth: any =
    false; /* Its Only Use For Now,I Handle It With ReduxStore */
  return (
    <div>
      <Provider store={store}>
        <SidebarProvider>
          <BrowserRouter>
            <RouterCombiner
              routes={AppRoutes}
              PrivateRoute={PrivateRoute}
              auth={auth}
            />
          </BrowserRouter>
        </SidebarProvider>
      </Provider>
    </div>
  );
};

export default App;

// import React from "react";
// import { Provider } from "react-redux";
// import "./global.scss";
// import store from "./redux/redux-store";
// import { AppRoutes } from "./routes/AppRoutes";
// import { SidebarProvider } from "./api/Context/sidebarContext";
// import { RouterCombiner } from "./routes/RouterCombiner";

{
  /* <Provider store={store}>
      <SidebarProvider>
        <AppRoutes routes={RouterCombiner} />
      </SidebarProvider>
    </Provider> */
}
