import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useAuthContext } from 'context/AuthProvider'
import { useDocumentTitle } from 'hook/useDocumentTitle'
import { AuthParameter } from 'data/authParameter'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';  

export default function Changelog() {
  let authContext = useAuthContext();
  let navigate = useNavigate();
  useDocumentTitle("Changelog");

  return (
  <Container>
    <Typography variant="h2" component="div" gutterBottom
      sx={{
        textAlign: "left",
        mt: 10,
        mb: 2,
      }}>
      Change Log
    </Typography>
    <Timeline>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="h4" component="div" gutterBottom>
          {"2022/04/01"}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
          {"Foo content"}
          </Typography>

        </TimelineContent>
      </TimelineItem>
    </Timeline>
  </Container>
  );
}
