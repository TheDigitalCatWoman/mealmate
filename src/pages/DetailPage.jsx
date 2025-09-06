import React from 'react';
import './styling_global.css';
import './DetailPage.css';
import { useNavigate } from 'react-router-dom';

function DetailPage() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/results');
  };

  return (
    <div className="detail-container">
      <img
        src="/assets/mealmate-logo.png" // temporary placeholder image
        alt="Recipe"
        className="detail-image"
      />
      <h1 className="detail-title">Recipe Title</h1>
      <p className="detail-description">
        This is a short description of the selected recipe. Later we’ll get this from Spoonacular API.
      </p>
      <button className="back-button" onClick={handleBackClick}>
        &lt; Back
      </button>
    </div>
  );
}

export default DetailPage;
