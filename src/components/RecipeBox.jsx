import React from 'react';
import CircleImage from './CircleImage';

function RecipeBox({ title, image, onClick }) {
  return (
    <div
      className="recipe-box common-recipe-box"
      onClick={onClick}
      tabIndex={0}
      role="button"
      style={{ cursor: 'pointer' }}
    >
      <CircleImage src={image} alt={title} />
      <div className="recipe-title">{title}</div>
    </div>
  );
}

export default RecipeBox;