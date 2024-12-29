import React from 'react';

const Navbar = ({ onLogout, isLoggedIn, isAdmin }) => (
  <nav>
    <h1>Family-Friendly Farms</h1>
    {isLoggedIn ? (
      <>
        <button onClick={onLogout}>Logout</button>
        {isAdmin && <span>Admin</span>}
      </>
    ) : (
      <p>Please log in</p>
    )}
  </nav>
);

export default Navbar;