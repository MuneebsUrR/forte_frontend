// src/components/Checkbox.js
import React from 'react';

export const Checkbox = ({ id, checked, onCheckedChange }) => {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className="form-checkbox"
    />
  );
};
