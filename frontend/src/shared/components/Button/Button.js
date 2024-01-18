import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

const Button = ({
  href,
  size,
  inverse,
  danger,
  children,
  to,
  type,
  onClick,
  disabled,
  className,
  linkState,
}) => {
  if (href) {
    return (
      <a
        className={`button button--${size || 'default'} ${
          inverse && 'button--inverse'
        } ${danger && 'button--danger'}`}
        href={href}
      >
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <Link
        to={to}
        state={linkState}
        className={`button button--${size || 'default'} ${
          inverse && 'button--inverse'
        } ${danger && 'button--danger'}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`button button--${size || 'default'} ${
        inverse && 'button--inverse'
      } ${danger && 'button--danger'} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
