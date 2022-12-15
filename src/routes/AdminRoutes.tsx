import React from "react";
import { Route, Routes } from "react-router-dom";
import { IRoutes } from "../shared/interfaces/routes.interface";
import { AdminLayout } from "./Layout/AdminLayout";

interface IAdminRouter {
  routeAdmin: Array<IRoutes>;
}

export const AdminRouter: React.FC<IAdminRouter> = ({ routeAdmin }) => {
  return (
    <AdminLayout>
      <Routes>
        {routeAdmin.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.Component />}
          />
        ))}
      </Routes>
    </AdminLayout>
  );
};
