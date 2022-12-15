import { useLocation } from "react-router-dom";
import CreateProduct from "./CreateProduct/CreateProduct";
import Customers from "./Customers/Customers";
import Login from "./Login/Login";
import MyCatalogs from "./My Catalogs/MyCatalogs";
import { Notfound } from "./Notfound/Notfound";
import Orders from "./Orders/Orders";
import Register from "./Register/Register";
import { Shipping } from "./Shipping/Shipping";
import { Stats } from "./Stats/Stats";
import StoreHome from "./StoreHome/StoreHome";

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
