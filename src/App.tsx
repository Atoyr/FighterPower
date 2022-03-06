import { Routes, Route } from 'react-router-dom';
import { AuthProvider, RequireAuth} from 'auth/AuthProvider'
import { CssBaseline } from '@mui/material';

import Index from 'pages/Index'
import Signin from 'pages/Signin'
import Signup from 'pages/Signup'
import Home from 'pages/Home'

const App = () => {
  return (
    <AuthProvider>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={
          <RequireAuth>
            <Home />
          </RequireAuth>
          } />
      </Routes>
    </AuthProvider>
  );
}

export default App;