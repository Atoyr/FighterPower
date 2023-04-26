import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Loading } from '@/components/Loading';
import { AuthProvider } from './authProvider';

type AppProviderProps = {
  children: React.ReactNode;
};

const theme = createTheme();

import { FallbackProps } from "react-error-boundary";

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  return (
    <div role="alert">
      <p>Error Message</p>
      <pre>{error!.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
  <Suspense fallback={ <Loading /> } >
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <RecoilRoot>
        <HelmetProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
              <Router>
                {children}
              </Router>
            </AuthProvider>
          </ThemeProvider>
        </HelmetProvider>
      </RecoilRoot>
    </ErrorBoundary>
  </Suspense>
  );
};
