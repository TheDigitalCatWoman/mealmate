import React from 'react';

function BackButton({ onClick, children = "< Back", className = "back-button", type = "button" }) {
  return (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

export default BackButton;