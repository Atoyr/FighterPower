import { Container, Typography } from '@mui/material';

import { Title } from '@/components/Title';

export const NotFound = () => {
  return (
  <Container>
    <Title title="NOT FOUND" />
    <Typography variant="h1" component="div" gutterBottom
      sx={{ textAlign: "center", mt: 10, mb: 2, }}>
      404
    </Typography>
    <Typography variant="h2" component="div" gutterBottom
      sx={{
        textAlign: "center",
        my: 2,
      }}>
      NOT FOUND
    </Typography>
  </Container>
  );
}

