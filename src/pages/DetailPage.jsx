import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styling_global.css';
import './DetailPage.css';
import BackButton from '../components/BackButton';
import CircleImage from '../components/CircleImage';
import SideImages from '../components/SideImages';
import RecipeDetail from '../components/RecipeDetail';
import leftImg from '../assets/images/3.png';
import rightImg from '../assets/images/3.png';

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
      <SideImages leftSrc={leftImg} rightSrc={rightImg} />
      <div className="detail-content">
        <h1 className="detail-title">Recipe Detail</h1>
        {error && !recipe && <p style={{ color: 'red' }}>{error}</p>}
        {/* Move BackButton here, just above the recipe overview */}
        <div className="detail-back-btn-row">
          <BackButton onClick={handleBackClick} />
        </div>
        {recipe && <RecipeDetail recipe={recipe} />}
      </div>
    </div>
  );
}

export default DetailPage;
