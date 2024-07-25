import React from 'react';
import { ValidationMessageProps } from '../types';

const ValidationMessage: React.FC<ValidationMessageProps> = ({ message }) => {
  return (
    <div className="validation-message">
      {message && <span>{message}</span>}
    </div>
  );
};

export default ValidationMessage;
