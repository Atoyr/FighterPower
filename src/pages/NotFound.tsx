import React from 'react';
import { useDocumentTitle } from 'hook/useDocumentTitle'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function NotFound() {
  useDocumentTitle("NotFound");
  return (
  <Container>
    <Typography variant="h1" component="div" gutterBottom
      sx={{
        textAlign: "center",
        mt: 10,
        mb: 2,
      }}>
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
