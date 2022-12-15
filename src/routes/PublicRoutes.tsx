import React from "react";
import { Route, Routes } from "react-router-dom";
import { IRoutes } from "../shared/interfaces/routes.interface";
// import { AdminLayout } from "./Layout/AdminLayout";
import { PublicLayout } from "./Layout/PublicLayout";

interface IPublicRouter {
  routePublic: Array<IRoutes>;
}

export const PublicRouter: React.FC<IPublicRouter> = ({ routePublic }) => {
  return (
    <PublicLayout>
      <Routes>
        {routePublic.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.Component />}
          />
        ))}
      </Routes>
    </PublicLayout>
  );
};
