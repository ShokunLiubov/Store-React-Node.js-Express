import React from "react";
import { NavLink } from "react-router-dom";
import "./menuStore.scss";

interface IItemMenu {
  title: string;
  path: string;
}

const DateMenu: Array<IItemMenu> = [
  { title: "Perfumery", path: "" },
  { title: "Novelty", path: "" },
  { title: "Women's perfumery", path: "" },
  { title: "Men's perfumery", path: "" },
  { title: "Unisex perfume", path: "" },
  { title: "Elite perfumery", path: "" },
  { title: "Niche perfumery", path: "" },
  { title: "Arabic perfumery", path: "" },
];

export const MenuStore: React.FC = () => {
  return (
    <nav className='menuStore'>
      <ul className='mainMenu'>
        {DateMenu.map((li) => (
          <li className='menuLi' key={li.title}>
            <NavLink to={li.path}>{li.title}</NavLink>
          </li>
        ))}
      </ul>
      <img src='./../../shopImg/bcgimg.jpeg' />
    </nav>
  );
};
