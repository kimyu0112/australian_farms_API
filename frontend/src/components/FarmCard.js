import React from 'react';

const FarmCard = ({ farm, onDelete, isAdmin }) => (
  <div className="farm-card">
    <h2>{farm.name}</h2>
    <p>{farm.description}</p>
    <p><strong>Location:</strong> {farm.location}</p>
    <div className="card-actions">
      {isAdmin && (
        <button className="delete-button" onClick={() => onDelete(farm._id)}>
          Delete Farm
        </button>
      )}
      <button className="view-details">View Details</button>
    </div>
  </div>
);

export default FarmCard;
