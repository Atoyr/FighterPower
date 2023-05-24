import { useContext } from 'react';

import { AlertSnackbarContext } from '@/providers/AlertSnackbarProvider';

export const useErrorSnackbar = () => {
  const showAlertSnackbar = useContext(AlertSnackbarContext);
  const showErrorSnackbar = (message) => {
    showAlertSnackbar(message, 'error');
  };
  return showErrorSnackbar;
};

export const useWarningSnackbar = () => {
  const showAlertSnackbar = useContext(AlertSnackbarContext);
  const showWarningSnackbar = (message) => {
    showAlertSnackbar(message, 'warning');
  };
  return showWarningSnackbar;
};

export const useInfoSnackbar = () => {
  const showAlertSnackbar = useContext(AlertSnackbarContext);
  const showInfoSnackbar = (message) => {
    showAlertSnackbar(message, 'info');
  };
  return showInfoSnackbar;
};

export const useSuccessSnackbar = () => {
  const showAlertSnackbar = useContext(AlertSnackbarContext);
  const showSuccessSnackbar = (message) => {
    showAlertSnackbar(message, 'success');
  };
  return showSuccessSnackbar;
};
