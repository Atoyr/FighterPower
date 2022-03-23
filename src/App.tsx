import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from 'context/AuthProvider';
import { UserProvider } from 'context/UserProvider';
import { RequireAuth, NotRequireAuth, RequireAnonymous } from 'components/RequireAuth';
import { CssBaseline } from '@mui/material';

import AppBar from 'components/AppBar';
import StickyFooter from 'components/StickyFooter';
import Index from 'pages/Index';
import Signin from 'pages/Signin';
import Signup from 'pages/Signup';
import AccountLink from 'pages/AccountLink';
import Home from 'pages/Home';
import GoalSheet from 'pages/GoalSheet';
import NotFound from 'pages/NotFound';

const App = () => {
  return (
  <StickyFooter>
    <AuthProvider>
      <UserProvider>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<AppBar />}>
            <Route index element={<Index />} />
            <Route path="index" element={<Index />} />
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
              <Signin />
            </NotRequireAuth>
            } />
          <Route path="/signup" element={
            <NotRequireAuth>
              <Signup />
            </NotRequireAuth>
            } />
          <Route path="/account_link" element={
            <RequireAnonymous>
              <AccountLink />
            </RequireAnonymous>
            } />
        </Routes>
      </UserProvider>
    </AuthProvider>
  </StickyFooter>
  );
}

export default App;

