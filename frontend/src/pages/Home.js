import React, { useEffect, useState } from 'react';
import { getFarms, deleteFarm } from '../api/farms';
import FarmCard from '../components/FarmCard';

const Home = ({ isAdmin, token }) => {
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
    <div>
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
  );
};

export default Home;