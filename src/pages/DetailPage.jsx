import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styling_global.css';
import './DetailPage.css';
import imgSide from '../assets/images/3.png';
import BackButton from '../components/BackButton';

const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

function DetailPage() {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const params = new URLSearchParams(location.search);
    const recipeId = params.get('id');
    const isSurprise = params.get('surprise') === 'true';

    async function fetchRecipe() {
      try {
        if (isSurprise) {
          const response = await fetch(
            `https://api.spoonacular.com/recipes/random?apiKey=${SPOONACULAR_API_KEY}`
          );
          const data = await response.json();
          if (data.recipes && data.recipes.length > 0) {
            setRecipe(data.recipes[0]);
          } else {
            setError('No recipe found.');
          }
        } else if (recipeId) {
          const response = await fetch(
            `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}`
          );
          const data = await response.json();
          if (data && data.id) {
            setRecipe(data);
          } else {
            setError('Recipe not found.');
          }
        } else {
          setError('No recipe to show.');
        }
      } catch (err) {
        setError('Failed to fetch recipe.');
      }
    }

    fetchRecipe();
  }, [location.search, navigate]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="detail-page-wrapper">
      <img src={imgSide} alt="Decorative left" className="side-img left-img" />
      <img src={imgSide} alt="Decorative right" className="side-img right-img" />
      <div className="detail-content">
        <h1 className="detail-title">Recipe Detail</h1>
        {error && !recipe && <p style={{ color: 'red' }}>{error}</p>}
        {/* Move BackButton here, just above the recipe overview */}
        <div className="detail-back-btn-row">
          <BackButton onClick={handleBackClick} />
        </div>
        {recipe && (
          <div className="detail-recipe-box">
            <div className="detail-img-circle">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="circle-img"
              />
            </div>
            <div className="detail-recipe-title">{recipe.title}</div>
            <div className="detail-recipe-texts">
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
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailPage;
