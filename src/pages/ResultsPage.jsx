import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './styling_global.css';
import './ResultsPage.css';

const SPOONACULAR_API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual key

function ResultPage() {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isSurprise = params.get('surprise') === 'true';

    async function fetchRecipe() {
      try {
        if (isSurprise) {
          // Fetch a random recipe
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
          // Fetch recipes based on ingredients
          const query = params.get('q');
          if (!query) {
            setError('No ingredients provided.');
            return;
          }
          const response = await fetch(
            `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(query)}&number=1&apiKey=${SPOONACULAR_API_KEY}`
          );
          const data = await response.json();
          if (data && data.length > 0) {
            // Fetch full recipe details for the first result
            const recipeId = data[0].id;
            const detailResponse = await fetch(
              `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}`
            );
            const detailData = await detailResponse.json();
            setRecipe(detailData);
          } else {
            setError('No recipes found for those ingredients.');
          }
        }
      } catch (err) {
        setError('Failed to fetch recipe.');
      }
    }

    fetchRecipe();
  }, [location.search]);

  return (
    <div>
      <h1>Recipe Result</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {recipe && (
        <div className="recipe-card">
          <h2>{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} style={{ maxWidth: '300px' }} />
          {recipe.summary && (
            <p dangerouslySetInnerHTML={{ __html: recipe.summary }} />
          )}
          {recipe.instructions && (
            <div>
              <h3>Instructions</h3>
              <p dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ResultPage;
