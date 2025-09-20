import React from 'react';

function AppButton({ children, type = "button", onClick, className = "app-btn", ...props }) {
  return (
    <button type={type} onClick={onClick} className={className} {...props}>
      {children}
    </button>
  );
}

export default AppButton;