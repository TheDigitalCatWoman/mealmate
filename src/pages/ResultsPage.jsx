import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styling_global.css';
import './ResultsPage.css';
import imgSide from '../assets/images/2.png';
import BackButton from '../components/BackButton';
import CircleImage from '../components/CircleImage';

const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

function ResultPage() {
  const [recipes, setRecipes] = useState([]);
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

    async function fetchRecipes() {
      try {
        const query = params.get('q');
        if (!query) {
          setError('No ingredients provided.');
          return;
        }
        const response = await fetch(
          `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(query)}&number=3&ranking=2&ignorePantry=true&apiKey=${SPOONACULAR_API_KEY}`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          setRecipes(data.slice(0, 3));
        } else {
          setError('No recipes found for those ingredients.');
        }
      } catch (err) {
        setError('Failed to fetch recipes.');
      }
    }

    fetchRecipes();
  }, [location.search, navigate]);

  const handleRecipeClick = (id) => {
    navigate(`/detail?id=${id}`);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="results-page-wrapper">
      <img src={imgSide} alt="Decorative left" className="side-img left-img" />
      <img src={imgSide} alt="Decorative right" className="side-img right-img" />
      <div className="results-content">
        <h1 className="results-header-title">Recipe Results</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {/* Back button just above the recipe list */}
        <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "flex-start" }}>
          <BackButton onClick={handleBackClick} />
        </div>
        <div className="recipe-list">
          {recipes.map(recipe => (
            <div
              className="recipe-box"
              key={recipe.id}
              onClick={() => handleRecipeClick(recipe.id)}
              tabIndex={0}
              role="button"
              style={{ cursor: 'pointer' }}
            >
              <CircleImage src={recipe.image} alt={recipe.title} />
              <div className="recipe-title">{recipe.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
