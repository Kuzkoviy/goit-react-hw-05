import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const navLinkStyle = ({ isActive }) => {
  return clsx(css.link, isActive && css.activeLink);
};
export default function Navigation() {
  return (
    <header className={css.headerContainer}>
      <nav className={css.navigation}>
        <NavLink to="/" className={navLinkStyle}>
          Home
        </NavLink>
        <NavLink to="/movies" className={navLinkStyle}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
}