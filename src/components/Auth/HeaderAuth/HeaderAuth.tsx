import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./headerAuth.module.scss";
import cn from "classnames";

export const HeaderAuth: React.FC = () => {
  const location = useLocation();

  return (
    <div className={styles.menuAuth}>
      <span className={styles.title}>
        {location.pathname === "/auth/login" && "Login Page"}
        {location.pathname === "/auth/register" && "Register Page"}
      </span>
      <nav>
        <NavLink to='/make-up' className={cn(styles.backShop)}>
          <span className={cn("material-symbols-outlined", styles.icon)}>
            arrow_back_ios
          </span>
          Back to Shop
        </NavLink>
        <NavLink
          to='auth/register'
          className={(navData: any) => (navData.isActive ? styles.active : "")}
        >
          <span className={cn("material-symbols-outlined", styles.icon)}>
            app_registration
          </span>
          Register
        </NavLink>
        <NavLink
          to='auth/login'
          className={(navData: any) => (navData.isActive ? styles.active : "")}
        >
          <span className={cn("material-symbols-outlined", styles.icon)}>
            how_to_reg
          </span>
          Login
        </NavLink>
      </nav>
    </div>
  );
};
