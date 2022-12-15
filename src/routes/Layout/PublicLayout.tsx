import React from "react";
import { Outlet } from "react-router-dom";
import { HeaderStore } from "../../components/Store/HeaderStore/HeaderStore";
import { MenuStore } from "../../components/Store/MenuStore/MenuStore";

interface PublicLayoutProps {
  // children: any;
}

export const PublicLayout: React.FC<PublicLayoutProps> = () => {
  return (
    <div className='PublicLayout'>
      <HeaderStore />

      <div className='storeContainer'>
        <MenuStore />
        <Outlet />
      </div>
    </div>
  );
};
