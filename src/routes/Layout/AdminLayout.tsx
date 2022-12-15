import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Admin/Header/Header";
import { Sidebar } from "../../components/Admin/Sidebar/Sidebar";
import { IHeader } from "../../shared/interfaces/header.interface";
import { ISidebar } from "../../shared/interfaces/sidebar.interface";

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

interface AdminLayoutProps {}

export const AdminLayout: React.FC<AdminLayoutProps> = () => {
  return (
    <div className='AdminLayout'>
      <Header items={HEADER_ADMIN_MENU} logo={"Make Up Admin"} />
      <div className='adminContainer'>
        <Sidebar items={SIDEBAR_ADMIN_MENU} />
        <Outlet />
      </div>
    </div>
  );
};
