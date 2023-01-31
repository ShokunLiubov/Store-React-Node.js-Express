import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import cn from "classnames";
import { useSidebar } from "../../../context/sidebarContext";

export const Header: React.FC = () => {
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
            Make up
          </NavLink>
        </div>

        <ul className={styles.rightNavbar}>
          <li>
            <NavLink to='/'>Admin</NavLink>
          </li>

          <li>
            <NavLink to='/auth/login'>Login</NavLink>
          </li>
          <li>
            <NavLink to='/' className={styles.setting}>
              Setting
              <span className='material-symbols-outlined'>settings</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
