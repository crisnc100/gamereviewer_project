import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post("http://localhost:8000/api/logout", {}, { withCredentials: true })
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark ${styles.navbarCustom}`}>
      <div className="container">
        <h1
          style={{
            fontSize: "2rem",
            color: "orange",
            fontWeight: "bold",
            marginRight: "45px",
          }}
        >
          GameReviewer
        </h1>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                }
                to="/dashboard"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                }
                to="all-games"
              >
                All Games
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                }
                to="profile"
              >
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${styles.btnLink}`}
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
