import {
  Button, 
  Box, 
  Card, 
  Typography 
  }from '@mui/material';

import { RankRating } from '../components';

type KeyResultCardProps = {
  title: string;
  rank: number;
  onClick: () => void;
  sx: SxProps<Theme>;
};

export const KeyResultCard = (props: KeyResultCardProps) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      }}>
        <Typography variant="h3" noWrap component="h3" sx={{ flexGrow: 1}}>
        {props.title}
        </Typography>
        <RankRating sx={{mx: 1, flexGrow: 0 }} readOnly defaultValue={props.rank} size="large"/>
    </Box>
  );
};
