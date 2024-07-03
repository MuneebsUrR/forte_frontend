// src/components/Button.js
import React from 'react';

export const Button = ({ children, className, disabled, onClick }) => {
  return (
    <button
      className={`px-4 py-2 rounded ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
