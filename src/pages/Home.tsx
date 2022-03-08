import React from 'react';
import AppBar from 'components/AppBar';
import Button from '@mui/material/Button';
import { useAuthContext } from 'context/AuthProvider'

export default function Index() {
  let auth = useAuthContext();
  return (
  <div>
    <AppBar />
    Home Page.
    <Button onClick={() => {auth.signout(() => {})}}>signout</Button>
  </div>
  );
}
