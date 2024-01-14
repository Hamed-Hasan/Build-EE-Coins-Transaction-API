import { useState } from 'react';

export const useAlert = () => {
  const [alert, setAlert] = useState({ message: '', severity: '' });

  const setSuccess = message => {
    setAlert({ message, severity: 'success' });
  };

  const setError = message => {
    setAlert({ message, severity: 'error' });
  };

  const clearAlert = () => {
    setAlert({ message: '', severity: '' });
  };

  return { alert, setSuccess, setError, clearAlert };
};
