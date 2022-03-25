import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from 'context/AuthProvider';
import { UserProvider } from 'context/UserProvider';
import { RequireAuth, NotRequireAuth, RequireAnonymous } from 'components/RequireAuth';
import { CssBaseline } from '@mui/material';

import AppWindow from 'components/AppWindow';
import StickyFooter from 'components/StickyFooter';
import Index from 'pages/Index';
import Terms from 'pages/Terms';
import Signin from 'pages/Signin';
import Signup from 'pages/Signup';
import AccountLink from 'pages/AccountLink';
import Home from 'pages/Home';
import GoalSheet from 'pages/GoalSheet';
import NotFound from 'pages/NotFound';

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<AppWindow />}>
            <Route index element={<Index />} />
            <Route path="index" element={<Index />} />
            <Route path="terms" element={<Terms />} />
            <Route path="home" element={
              <RequireAuth>
                <Home />
              </RequireAuth>
              } />
            <Route path="goalsheet">
              <Route path=":id" element={
                <RequireAuth>
                  <GoalSheet />
                </RequireAuth>
              } />
            </Route>
            <Route path="*" element={
                <NotFound />
            } />
          </Route>
          <Route path="/signin" element={
            <NotRequireAuth>
              <StickyFooter dtil={true}>
                <Signin />
              </StickyFooter>
            </NotRequireAuth>
            } />
          <Route path="/signup" element={
            <NotRequireAuth>
              <StickyFooter dtil={true}>
                <Signup />
              </StickyFooter>
            </NotRequireAuth>
            } />
          <Route path="/account_link" element={
            <RequireAnonymous>
              <StickyFooter dtil={true}>
                <AccountLink />
              </StickyFooter>
            </RequireAnonymous>
            } />
        </Routes>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;

