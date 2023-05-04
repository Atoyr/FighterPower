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

type ObjectiveCardProps = {
  title: string;
  createAt: Date;
  modifiedAt: Date;
  onClick: () => void;
  sx: SxProps<Theme>;
}

export const ObjectiveCard = ({title, createdAt, modifiedAt, onClick, sx} : ObjectiveCardProps) => {
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
          <Typography variant="caption" noWrap display="block" sx={{ textAlign: "right"}}>
          {"作成日:"}{createdAt?.toLocaleString("ja-JP") ?? ""}
          </Typography>
          <Typography variant="caption" noWrap display="block" sx={{ textAlign: "right"}}>
          {"最終更新日:"}{modifiedAt?.toLocaleString("ja-JP") ?? ""}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
