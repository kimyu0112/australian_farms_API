import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/FarmCard.css';

const FarmCard = ({ farm }) => (
  <div className="farm-card">
    <img src={farm.images[0]} alt={farm.name} className="farm-thumbnail" />
    <h3>{farm.name}</h3>
    <p>{farm.description}</p>
    <Link to={`/farm/${farm._id}`} className="view-details">View Details</Link>
  </div>
);

export default FarmCard;
