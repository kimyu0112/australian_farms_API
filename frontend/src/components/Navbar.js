import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <h1>
      <Link to="/" className="navbar-brand">Family-Friendly Farms</Link>
    </h1>
    <div className="nav-links">
      <Link to="/login" className="nav-link login-button">Log in</Link>
      <Link to="/signup" className="nav-link signup-button">Sign up</Link>
    </div>
  </nav>
);

export default Navbar;
