import { 
  Typography, 
  } from '@mui/material';

export const ObjectiveNotFound = () => {
  return(
    <>
      <Typography variant="h1" component="div" gutterBottom
        sx={{
          textAlign: "center",
          mt: 10,
          mb: 2,
        }}>
        Error
      </Typography>
      <Typography variant="h2" component="div" gutterBottom
        sx={{
          textAlign: "center",
          my: 2,
        }}>
        目標のアクセス権限がないか存在しません
      </Typography>
    </>
  );
};
