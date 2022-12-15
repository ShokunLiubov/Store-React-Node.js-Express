import React, { useContext, useState } from "react";

interface ISidebarProvider {
  children: any;
}
interface ISidebar {
  sidebar?: boolean;
  toggleSidebar?(e: React.MouseEvent<HTMLSpanElement>): void;
}

const sidebarContext = React.createContext<ISidebar>({});

export const useSidebar = () => {
  return useContext(sidebarContext);
};

export const SidebarProvider: React.FC<ISidebarProvider> = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = (e: React.MouseEvent<HTMLSpanElement>) => {
    setSidebar((prev) => !prev);
  };
  return (
    <sidebarContext.Provider value={{ sidebar, toggleSidebar }}>
      {children}
    </sidebarContext.Provider>
  );
};
