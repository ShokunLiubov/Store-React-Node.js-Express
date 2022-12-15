import React from "react";
import styles from "./Sidebar.module.scss";
import cn from "classnames";
import { NavLink } from "react-router-dom";
import { useSidebar } from "../../../api/Context/sidebarContext";
import { ISidebar } from "../../../shared/interfaces/sidebar.interface";

interface ISidebarProps {
  items: Array<ISidebar>;
}

export const Sidebar: React.FC<ISidebarProps> = ({ items }) => {
  const sidebar = useSidebar();

  const sidebarItem = items.map((item) => (
    <li key={item.id}>
      <NavLink
        to={item.path}
        className={(navData) =>
          navData.isActive ? styles.active : styles.item
        }
      >
        <span className={cn("material-symbols-outlined", styles.itemIcon)}>
          {item.icon}
        </span>
        <div
          className={cn(
            styles.titleItem,
            !sidebar.sidebar && styles.titleItemClose,
          )}
        >
          {item.title}
        </div>
      </NavLink>
    </li>
  ));

  return (
    <nav>
      <div
        className={cn(styles.sidebar, !sidebar.sidebar && styles.sidebarClose)}
      >
        <ul>{sidebarItem}</ul>
      </div>
    </nav>
  );
};
