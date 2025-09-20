import React from 'react';

function SideImages({ leftSrc, rightSrc, leftAlt = "Decorative left", rightAlt = "Decorative right" }) {
  return (
    <>
      <img src={leftSrc} alt={leftAlt} className="side-img left-img" />
      <img src={rightSrc} alt={rightAlt} className="side-img right-img" />
    </>
  );
}

export default SideImages;