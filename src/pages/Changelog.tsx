import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useDocumentTitle } from 'hook/useDocumentTitle'
import Divider from '@mui/material/Divider';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';  
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

export default function Changelog() {
  useDocumentTitle("Changelog");

  const Item = ({date, version, children}: { date: string, version: string, children: JSX.Element}) => {
    return (
      <TimelineItem>
        <TimelineOppositeContent sx={{flex:"0"}}>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="h4" component="div" gutterBottom>
          {date}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
          {version}
          </Typography>
          {children}
        </TimelineContent>
      </TimelineItem>
      );
  };

  return (
  <Container maxWidth="md">
    <Typography variant="h2" component="div" gutterBottom
      sx={{
        textAlign: "left",
        mt: 10,
        mb: 2,
      }}>
      Change Log
    </Typography>
    <Divider />
    <Timeline>
      <Item date="2022/05/02" version="Version 0.2.0">
        <div>
          <Typography variant="body1" component="div" gutterBottom>
          {"機能追加"}
          </Typography>
          <Typography variant="body2" component="div" gutterBottom>
          {"認証方法にTwitterとGoogleを追加しました。"}
          <br />
          {"メール認証を廃止しました。"}
          </Typography>
        </div>
      </Item>
      <Item date="2022/04/02" version="Version 0.1.1">
        <Typography variant="body1" component="div" gutterBottom>
        {"軽微な不具合修正"}
        </Typography>
      </Item>
      <Item date="2022/04/01" version="Version 0.1.0">
        <Typography variant="body1" component="div" gutterBottom>
        {"初期リリース"}
        </Typography>
      </Item>
    </Timeline>
  </Container>
  );
}
