import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { ErrorFallback } from '@/components/ErrorFallback';
import { Loading } from '@/components/Loading';
import { MODE } from '@/config';
import { queryClient } from '@/lib/react-query';

import { AuthProvider } from './AuthProvider';
import { AlertSnackbarProvider } from './AlertSnackbarProvider';

type AppProviderProps = {
  children: React.ReactNode;
};

const theme = createTheme({
  palette: {
    background: {
      default: '#fdfdfd',
    },
  },
});
//  palette: {
//    primary: {
//      main: '#0052cc',
//    },
//    secondary: {
//      main: '#edf2ff',
//    },
//  },
//});

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
  <RecoilRoot>
    <Suspense fallback={ <Loading /> } >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <AlertSnackbarProvider>
            <QueryClientProvider client={queryClient}>
              { MODE === "dev" && <ReactQueryDevtools />}
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <AuthProvider>
                  <Router>
                    {children}
                  </Router>
                </AuthProvider>
              </ThemeProvider>
            </QueryClientProvider>
          </AlertSnackbarProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  </RecoilRoot>
  );
};
