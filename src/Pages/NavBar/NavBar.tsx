import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <NavLink to="/" className={styles.logoLink} end>
          My TMDB Clone Home
        </NavLink>
      </div>

      <ul className={styles.navLinks}>
        <li>
          <NavLink
            to="favorites"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Fav Movies
          </NavLink>
        </li>
        <li>
          <NavLink
            to="details"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Details
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Login
          </NavLink>
        </li>
      </ul>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
        />
        <button className={styles.searchButton}>🔍</button>
      </div>
    </nav>
  );
};

export default NavBar;
