import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes } from "react-router-dom";
import store from "./redux/redux-store";
import { AppRoutes } from "./routes/AppRoutes";
import "./global.scss";
import { SidebarProvider } from "./context/sidebarContext";
import { checkAuth } from "./redux/authReducer/authReducer";
import RouterCombiner from "./routes/RouterCombiner";
import { BasketModalProvider } from "./context/basketModalContext";

const App: React.FC = () => {
  const auth: any =
    false; /* Its Only Use For Now,I Handle It With ReduxStore */
  return (
    <div>
      <Provider store={store}>
        <SidebarProvider>
          <BasketModalProvider>
            <BrowserRouter>
              <RouterCombiner routes={AppRoutes} auth={auth} />
            </BrowserRouter>
          </BasketModalProvider>
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
