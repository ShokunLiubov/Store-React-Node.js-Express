import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/redux-store";
import { AppRoutes } from "./routes/AppRoutes";
import "./global.scss";
import { SidebarProvider } from "./context/sidebarContext";
import RouterCombiner from "./routes/RouterCombiner";
import { BasketModalProvider } from "./context/basketModalContext";

const App: React.FC = () => {
  return (
    <div>
      <Provider store={store}>
        <SidebarProvider>
          <BasketModalProvider>
            <BrowserRouter>
              <RouterCombiner routes={AppRoutes} />
            </BrowserRouter>
          </BasketModalProvider>
        </SidebarProvider>
      </Provider>
    </div>
  );
};

export default App;
