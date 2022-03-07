import React from 'react';
import AppBar from 'components/AppBar';
import Button from '@mui/material/Button';
import { useAuth } from 'auth/AuthProvider'

export default function Index() {
  let auth = useAuth();
  return (
  <div>
    <AppBar />
    Home Page.
    <Button onClick={() => {auth.signout(() => {})}}>signput</Button>
  </div>
  );
}
