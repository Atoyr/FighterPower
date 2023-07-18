import {
  Button, 
  Box, 
  Card, 
  Paper, 
  Typography 
  }from '@mui/material';

import { SxProps, Theme, useTheme } from '@mui/material/styles';

import { StarRating } from '@/components/Rating';
import { HelpTooltip } from '@/components/Tooltip';

import { rankRatingLabels } from '../constants';

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
    '&:hover': {
      backgroundColor: theme.palette.action.hover, 
      cursor: 'pointer', // カーソルスタイルをポインターに変更
    },
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
          <StarRating sx={{mx: 1, flexGrow: 0 }} readOnly value={props.rank} size="large" labels={rankRatingLabels}/>
    </Paper>
  );
};
