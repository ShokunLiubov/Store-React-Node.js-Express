import { useLocation } from "react-router-dom";
import CreateProduct from "./createProduct/CreateProduct";
import Customers from "./customers/Customers";
import Login from "./login/Login";
import MyCatalogs from "./myCatalogs/MyCatalogs";
import { Notfound } from "./notfound/Notfound";
import Orders from "./orders/Orders";
import Register from "./register/Register";
import { Shipping } from "./shipping/Shipping";
import { Stats } from "./stats/Stats";
import StoreHome from "./storeHome/StoreHome";

export const Pages = {
  MyCatalogs: () => <MyCatalogs />,
  CreateProduct: () => <CreateProduct />,
  Customers: () => <Customers />,
  Orders: () => <Orders />,
  Shipping: () => <Shipping />,
  Stats: () => <Stats />,
  Notfound: () => <Notfound />,
  Login: () => <Login />,
  Register: () => <Register />,
  StoreHome: () => <StoreHome />,
};
