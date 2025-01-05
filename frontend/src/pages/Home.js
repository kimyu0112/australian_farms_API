import React, { useEffect, useState } from 'react';
import FarmCard from '../components/FarmCard';
import { getFarms } from '../api/farms';
import '../styles/Home.css';

const Home = () => {
  const [farms, setFarms] = useState([]);
  const [featuredFarm, setFeaturedFarm] = useState(null);

  useEffect(() => {
    getFarms()
      .then((response) => {
        const allFarms = response.data;
        setFarms(allFarms);

        // Randomly select a featured farm
        if (allFarms.length > 0) {
          const randomIndex = Math.floor(Math.random() * allFarms.length);
          setFeaturedFarm(allFarms[randomIndex]);
        }
      })
      .catch((error) => console.error('Error fetching farms:', error));
  }, []);

  if (farms.length === 0) return <div className="loading">Loading...</div>;

  return (
    <div className="home">
      {featuredFarm && (
        <div className="featured-farm-banner">
          <img
            src={featuredFarm.images[0]}
            alt={featuredFarm.name}
            className="featured-farm-image"
          />
          <div className="featured-farm-info">
            <h2>{featuredFarm.name}</h2>
            <p>{featuredFarm.description}</p>
          </div>
        </div>
      )}

      <h2 className="explore-farms">Explore Farms</h2>
      <div className="farm-list">
        {farms.map((farm) => (
          <FarmCard key={farm._id} farm={farm} />
        ))}
      </div>
    </div>
  );
};

export default Home;
