import React from 'react';

const Navbar = ({ onLogout, isLoggedIn, isAdmin }) => (
  <nav className="navbar">
    <h1>Family-Friendly Farms</h1>
    <div className="nav-links">
      <a href="/">Home</a>
      {isAdmin && <a href="/admin">Admin</a>}
    </div>
    {isLoggedIn ? (
      <button className="logout-button" onClick={onLogout}>Logout</button>
    ) : (
      <p>Welcome! Please log in or sign up.</p>
    )}
  </nav>
);

export default Navbar;
