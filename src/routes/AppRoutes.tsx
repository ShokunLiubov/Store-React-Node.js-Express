import React from "react";
import { Pages } from "../pages/PagesCombiner";
import { IRoutes } from "../shared/interfaces/routes.interface";
import { Layouts } from "./layout/Layouts";

export const AppRoutes: Array<IRoutes> = [
  {
    path: "my-catalogs",
    Component: Pages.MyCatalogs,
    Layout: Layouts.AdminLayout,
  },

  {
    path: "edit-product",
    Component: Pages.CreateProduct,
    Layout: Layouts.AdminLayout,
  },
  {
    path: "new-product",
    Component: Pages.CreateProduct,
    Layout: Layouts.AdminLayout,
  },
  {
    path: "/customers",
    Component: Pages.Customers,
    Layout: Layouts.AdminLayout,
  },
  {
    path: "/orders",
    Component: Pages.Orders,
    Layout: Layouts.AdminLayout,
  },
  {
    path: "/shipping",
    Component: Pages.Shipping,
    Layout: Layouts.AdminLayout,
  },
  {
    path: "/stats",
    Component: Pages.Stats,
    Layout: Layouts.AdminLayout,
  },

  {
    path: "auth/login",
    Component: Pages.Login,
    Layout: Layouts.AuthLayout,
  },
  {
    path: "auth/register",
    Component: Pages.Register,
    Layout: Layouts.AuthLayout,
  },
  {
    path: "/make-up",
    Component: Pages.StoreHome,
    Layout: Layouts.PublicLayout,
  },
  {
    path: "*",
    Component: Pages.Notfound,
    Layout: Layouts.AuthLayout,
  },
];
