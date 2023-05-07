import {
  Button, 
  Box, 
  Card, 
  Paper, 
  Typography 
  }from '@mui/material';

import { SxProps, Theme, useTheme } from '@mui/material/styles';

import { RankRating } from '../components';

type KeyResultCardProps = {
  title: string;
  rank: number;
  variant: string;
  component: string;
  onClick: () => void;
  sx: SxProps<Theme>;
};

export const KeyResultCard = (props: KeyResultCardProps) => {
  const theme = useTheme();
  const handleClick = () => {
    if(props.onClick) {
      props.onClick();
    }
  };
  const paperStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    ...props.sx, 
  };
  return (
    <Paper
      onClick={handleClick}
      elevation={3}
      sx={paperStyle}>
          <Typography 
            variant={props.variant ?? "h3"}
            component={props.variant ?? "h3"} 
            noWrap 
            sx={{ flexGrow: 1, mx: 1}}>
          {props.title}
          </Typography>
          <RankRating sx={{mx: 1, flexGrow: 0 }} readOnly value={props.rank} size="large"/>
    </Paper>
  );
};
