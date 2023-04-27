import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import { CARD_MIN_WIDTH, CARD_WIDTH } from '../styles';

type ObjectiveCardProps = {
  title: string;
  createAt: Date;
  modifiedAt: Date;
  onClick: () => void;
}

export const ObjectiveCard = ({title, createAt, modifiedAt, onClick} : ObjectiveCardProps) => {
  return (
    <Card sx={{ 
    minWidth: CARD_MIN_WIDTH, 
    width: CARD_WIDTH, 
    }}>
      <CardActionArea component={Button} onClick={onClick}>
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="caption" noWrap display="block" sx={{ textAlign: "right"}}>
          {"作成日:"}{createAt?.toLocaleString("ja-JP") ?? ""}
          </Typography>
          <Typography variant="caption" noWrap display="block" sx={{ textAlign: "right"}}>
          {"最終更新日:"}{modifiedAt?.toLocaleString("ja-JP") ?? ""}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
