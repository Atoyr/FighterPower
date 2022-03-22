import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { goalAchiveValue } from 'data/goalResult';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export function GoalAchives(props: {goalResultId:string, goalAchives: string[], goalCount: number})  {
  const items : string[] = [];
  const { goalResultId, goalAchives, goalCount} = props;

  for (var i = 0; i < goalCount; i++) {
    if (goalAchives && goalAchives[i]) {
      items.push(goalAchiveValue(goalAchives[i]));
    } else {
      items.push(" ");
    }
  }
    return(
      <Box 
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
      { items.map((v,i) => {
        return(
        <Paper sx={{width: 70, m:0.5}}key={`${goalResultId}__${i}`}>
          <Typography variant="subtitle2" noWrap component="div" sx={{ textAlign: "center", textTransform: "none", height: 20}}>
            {`目標${i + 1}`}
          </Typography>
          <Divider />
          <Typography variant="body2" noWrap component="div" sx={{ textAlign: "center", textTransform: "none", height: 20}}>
            {v}
          </Typography>
        </Paper>
        );
      })}
      </Box>
      );
}

