import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useAuthContext } from 'context/AuthProvider'
import { useUserContext } from 'context/UserProvider'
import SiteLogo from 'components/SiteLogo';

export default function Index() {
  let authContext = useAuthContext();
  let userContext = useUserContext();
  console.log(userContext);
  const displayName = userContext ? userContext.displayName : "";
  return (
  <div>
    <Box sx={{m: 1, p: 1}}>
      <Button variant="outlined" fullWidth >
        目標シートを追加
      </Button>
    </Box>
    <Box sx={{m: 1, p: 1}}>
      <Button variant="outlined" fullWidth href="/goalsheet/10">
       <Box
       alignItems="center"
       justifyContent="center"
            sx={{
              height: 120,
              backgroundColor: 'primary',
              '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
        目標シート1
        </Box>
      </Button>
    </Box>
    Home Page. <br />
    name is {displayName }
    <SiteLogo />

    <Button onClick={() => {authContext.signout(() => {})}}>signout</Button>
  </div>
  );
}
