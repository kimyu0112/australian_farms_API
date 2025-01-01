import React, { useState } from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    setToken(null);
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      <Home
        isAdmin={isAdmin}
        token={token}
        setUser={(username) => {
          setUser(username);
          setIsLoggedIn(true);
        }}
        setToken={setToken}
        setIsAdmin={setIsAdmin}
      />
    </div>
  );
}

export default App;
