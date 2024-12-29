import React from 'react';

const FarmCard = ({ farm, onDelete, isAdmin }) => (
  <div className="farm-card">
    <h2>{farm.name}</h2>
    <p>{farm.description}</p>
    <p>Location: {farm.location}</p>
    {isAdmin && (
      <button onClick={() => onDelete(farm._id)}>Delete Farm</button>
    )}
  </div>
);

export default FarmCard;
