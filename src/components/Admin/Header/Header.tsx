import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import cn from "classnames";
import { useSidebar } from "../../../api/Context/sidebarContext";
import { IHeader } from "../../../shared/interfaces/header.interface";

interface IHeaderProps {
  items: Array<IHeader>;
  logo: string;
}

export const Header: React.FC<IHeaderProps> = ({ items, logo }) => {
  const sidebar = useSidebar();

  return (
    <nav>
      <div className={styles.navbar}>
        <div className={styles.leftNavbar}>
          <span
            className={cn("material-symbols-outlined", styles.sidebarBurger)}
            onClick={sidebar.toggleSidebar}
          >
            {!sidebar.sidebar ? "menu" : "close"}
          </span>

          <NavLink to='/' className={styles.logo}>
            {logo}
          </NavLink>
        </div>

        <ul className={styles.rightNavbar}>
          {items.map((item) => (
            <li key={item.icon}>
              <NavLink to={item.path}>
                <span className={cn("material-symbols-outlined", styles.icon)}>
                  {item.icon}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
