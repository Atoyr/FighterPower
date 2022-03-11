import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useAuthContext } from 'context/AuthProvider'
import { useUserContext } from 'context/UserProvider'
import SiteLogo from 'components/SiteLogo';
import { setGoalSheet, newGoalSheet } from 'data/goalSheet';
import { newGoal } from 'data/goal';


export default function Index() {
  let authContext = useAuthContext();
  let userContext = useUserContext();
  const displayName = userContext ? userContext.displayName : "";

  const handleSubmit = () => {
    let id =userContext.id as string;
    let gs = newGoalSheet("title!", "note");
    let g1 = newGoal("goal1", 1);
    let g2 = newGoal("goal2", 2);
    gs.goals = [g1, g2];

   setGoalSheet(id, gs);
  };
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

    <Box sx={{m: 1, p: 1}}>
      <Button variant="outlined" fullWidth onClick={handleSubmit}>
        目標シートを追加
      </Button>
    </Box>
    <SiteLogo />

    <Button onClick={() => {authContext.signout(() => {})}}>signout</Button>
  </div>
  );
}
