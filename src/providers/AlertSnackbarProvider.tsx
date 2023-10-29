import { createContext, useState, useContext } from 'react';

import { Snackbar, Alert } from '@mui/material';

export const AlertSnackbarContext = createContext();

export const AlertSnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');

  const handleClose = () => {
    setOpen(false);
  };

  const showAlertSnackbar = (message, severity = 'info') => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  return (
    <AlertSnackbarContext.Provider value={showAlertSnackbar}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={severity} onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </AlertSnackbarContext.Provider>
  );
};
