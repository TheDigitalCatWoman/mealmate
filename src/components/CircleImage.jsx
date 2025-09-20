import React from 'react';

function CircleImage({ src, alt, className = "circle-img" }) {
  return (
    <div className="recipe-img-circle">
      <img src={src} alt={alt} className={className} />
    </div>
  );
}

export default CircleImage;