import React from 'react';
import CircleImage from './CircleImage';

function RecipeDetail({ recipe }) {
  if (!recipe) return null;

  return (
    <div className="detail-recipe-box common-recipe-box">
      <CircleImage src={recipe.image} alt={recipe.title} />
      <div className="detail-recipe-title recipe-title">{recipe.title}</div>
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
  );
}

export default RecipeDetail;