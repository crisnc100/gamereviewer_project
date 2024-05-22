import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const NavBar = () => {
  const navigate = useNavigate();
  //Added logout logic from dashboard here: 
  const handleLogout = () => {
    axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true })
    .then((res) => {
        navigate('/')
    })
    .catch((error) => {
        console.log(error)
    })
  };
//Navbar from bootstrap, can style it much it better
  return (
    <nav className={`navbar navbar-expand-lg navbar-dark ${styles.navbarCustom}`}>
      <div className="container-fluid">
        <h1 style={{fontSize: '2rem', color: 'blue', fontWeight: 'bold', marginRight: '45px'}}>
          GameReviewer
        </h1>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className={`nav-link ${styles.navLink}`} to="/dashboard" exact>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={`nav-link ${styles.navLink}`} to="all-games">
                All Games
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={`nav-link ${styles.navLink}`} to="profile">
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${styles.btnLink}`} onClick={handleLogout}>
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
