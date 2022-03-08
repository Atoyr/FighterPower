import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from 'context/AuthProvider'
import { UserProvider } from 'context/UserProvider'
import { RequireAuth, NotRequireAuth } from 'components/RequireAuth'
import { CssBaseline } from '@mui/material';

import Index from 'pages/Index'
import Signin from 'pages/Signin'
import Signup from 'pages/Signup'
import Home from 'pages/Home'
import GoalSheet from 'pages/GoalSheet'
import NotFound from 'pages/NotFound'

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <CssBaseline />
        <Routes>
          <Route path="/">
            <Route index element={<Index />} />
            <Route path="signin" element={
              <NotRequireAuth>
                <Signin />
              </NotRequireAuth>
              } />
            <Route path="signup" element={
              <NotRequireAuth>
                <Signup />
              </NotRequireAuth>
              } />
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
        </Routes>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;