import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Header } from "../../components/admin/header/Header";
import { Sidebar } from "../../components/admin/sidebar/Sidebar";
import { IHeader } from "../../shared/interfaces/header.interface";
import { ISidebar } from "../../shared/interfaces/sidebar.interface";
import { compose } from "redux";
import { connect } from "react-redux";
import { IUser } from "../../shared/interfaces/user.interface";
import { Notfound } from "../../pages/notfound/Notfound";
import { AppStateType } from "../../redux/redux-store";

const HEADER_ADMIN_MENU: Array<IHeader> = [
  { path: "/setting", icon: "settings" },
  { path: "/auth/login", icon: "logout" },
];

const SIDEBAR_ADMIN_MENU: Array<ISidebar> = [
  { path: "my-catalogs", icon: "menu_book", title: "My Catalogs", id: 1 },
  { path: "new-product", icon: "library_add", title: "New Product", id: 2 },
  { path: "orders", icon: "list_alt", title: "Orders", id: 3 },
  { path: "customers", icon: "group", title: "Customers", id: 4 },
  { path: "shipping", icon: "local_shipping", title: "Shipping", id: 5 },
  { path: "stats", icon: "signal_cellular_alt", title: "Stats", id: 6 },
];

interface AdminLayoutProps {
  user: IUser;
  isLoading: boolean;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  user,
  isLoading,
}) => {
  // const [Role, setRole] = useState(false);
  const role = user.roles;
  let navigate = useNavigate();

  let ADMIN = false;
  if (role != undefined) {
    ADMIN = role[0] === "ADMIN";
  }

  return (
    <>
      {ADMIN && (
        <div className='AdminLayout'>
          <Header items={HEADER_ADMIN_MENU} logo={"Make Up Admin"} />
          <div className='adminContainer'>
            <Sidebar items={SIDEBAR_ADMIN_MENU} />
            <Outlet />
          </div>
        </div>
      )}
      {!ADMIN && <Notfound styleAdmin={"styleAdmin"} />}
    </>
  );
};

const mapStateToProps = (state: AppStateType) => {
  return {
    user: state.auth.user,
    isLoading: state.auth.isLoading,
  };
};

export default compose(connect(mapStateToProps, {}))(AdminLayout);
