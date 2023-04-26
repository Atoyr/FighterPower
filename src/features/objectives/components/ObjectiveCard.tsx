import { Link as RouterLink } from "react-router-dom";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

type ObjectiveCardProps = {
  title: string;
  createAt: Date;
  modifiedAt: Date;
  to: string;
}

export const ObjectiveCard = ({title, createAt, modifiedAt, to} : ObjectiveCardProps) => {
  return (
    <Card sx={{ 
    minWidth: 275 , 
    width: { sm: 250 },
    }}>
      <CardActionArea component={RouterLink} to={to}>
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
