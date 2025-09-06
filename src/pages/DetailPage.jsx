import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styling_global.css';
import './DetailPage.css';
import imgSide from '../assets/images/3.png';

const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

function DetailPage() {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isSurprise = params.get('surprise') === 'true';

    async function fetchRecipe() {
      try {
        if (isSurprise) {
          // Fetch a random recipe from Spoonacular
          const response = await fetch(
            `https://api.spoonacular.com/recipes/random?apiKey=${SPOONACULAR_API_KEY}`
          );
          const data = await response.json();
          if (data.recipes && data.recipes.length > 0) {
            setRecipe(data.recipes[0]);
          } else {
            setError('No recipe found.');
          }
        } else {
          setError('No recipe to show.');
        }
      } catch (err) {
        setError('Failed to fetch recipe.');
      }
    }

    fetchRecipe();
  }, [location.search]);

  const handleBackClick = () => {
    navigate('/results');
  };

  return (
    <div className="detail-container">
      <img src={imgSide} alt="Decorative left" className="side-img left-img" />
      <img src={imgSide} alt="Decorative right" className="side-img right-img" />
      <button className="back-button" onClick={handleBackClick}>
        &lt; Back
      </button>
      <h1 className="detail-title">Recipe Detail</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {recipe && (
        <div className="recipe-card">
          <h2>{recipe.title}</h2>
          <img
            src={recipe.image}
            alt={recipe.title}
            style={{ maxWidth: '300px' }}
            className="detail-image"
          />
          {recipe.summary && (
            <p
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
              className="detail-description"
            />
          )}
          {recipe.instructions && (
            <div>
              <h3>Instructions</h3>
              <p
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                className="detail-instructions"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DetailPage;
