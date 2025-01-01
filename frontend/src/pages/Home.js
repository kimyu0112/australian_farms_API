import React, { useEffect, useState } from 'react';
import { getFarms, deleteFarm } from '../api/farms';
import FarmCard from '../components/FarmCard';
import AuthCard from '../components/AuthCard';

const Home = ({ isAdmin, token, setUser, setToken, setIsAdmin }) => {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    getFarms().then((response) => setFarms(response.data));
  }, []);

  const handleDelete = async (id) => {
    if (!isAdmin) return;
    await deleteFarm(id, token);
    setFarms(farms.filter((farm) => farm._id !== id));
  };

  return (
    <div className="home-container">
      <div className="farm-list">
        <h1>Farms</h1>
        {farms.map((farm) => (
          <FarmCard
            key={farm._id}
            farm={farm}
            onDelete={handleDelete}
            isAdmin={isAdmin}
          />
        ))}
      </div>
      <div className="auth-section">
        <AuthCard setUser={setUser} setToken={setToken} setIsAdmin={setIsAdmin} />
      </div>
    </div>
  );
};

export default Home;
