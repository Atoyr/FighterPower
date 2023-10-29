import {
  Button, 
  Card, 
  CardActionArea, 
  CardActions, 
  CardContent, 
  Typography 
  }from '@mui/material';

import { SxProps, Theme, useTheme } from '@mui/material/styles';

import { CARD_MIN_WIDTH, CARD_WIDTH, CARD_HEIGHT } from '../styles';

type AchiveCardProps = {
  title: string;
  onClick: () => void;
  sx: SxProps<Theme>;
}

export const AchiveCard = ({title, onClick, sx} : AchiveCardProps) => {
  const theme = useTheme();
  const sizeStyle = {
      minWidth: CARD_MIN_WIDTH, 
      width: CARD_WIDTH, 
      height : CARD_HEIGHT, 
  }
  const borderStyle = {
      border: '1px solid',
      borderColor: theme.palette.primary.main, 
  }
  const cardStyle = {
    ...sizeStyle, 
    ...borderStyle,
    ...sx, 
  }
  const cardActionAreaStyle = {
    ...sizeStyle, 
  }

  return (
    <Card sx={ cardStyle }>
      <CardActionArea component={Button} onClick={onClick} 
        sx={ cardActionAreaStyle }>
        <CardContent>
          <Typography variant="h6" noWrap component="h6" sx={{ textAlign: "left", textTransform: "none"}}>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

