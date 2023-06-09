import {
  Container, 
  Divider, 
  Link, 
  Typography, 
} from '@mui/material';
import {
  Timeline, 
  TimelineItem, 
  TimelineConnector, 
  TimelineContent, 
  TimelineDot, 
  TimelineOppositeContent, 
  TimelineSeparator, 
} from '@mui/lab';

import { Title } from '@/components/Title';

export const Changelog = () => {
  const Item = ({date, version, children}: { date: string, version: string, children: React.ReactNode}) => {
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
    <Title title="変更履歴" />
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

