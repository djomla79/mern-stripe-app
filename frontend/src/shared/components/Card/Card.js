import React from 'react';

import './Card.css';

const Card = ({ className, style, children, ...rest }) => {
  return (
    <div className={`card ${className}`} style={style} {...rest}>
      {children}
    </div>
  );
};

export default Card;
