import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';

import { 
  Button, 
  Box, 
  Container, 
  Skeleton, 
  TextField, 
  ToggleButton, 
  Typography, 
  } from '@mui/material';

import { StyledToggleButtonGroup } from '@/components/ToggleButton';
import { useAuth } from '@/hooks';
import { MainContainerStyle } from '@/styles';

import { 
  getArchive, 
  getKeyResults, 
  getObjective, 
  setArchive } from '../api';
import { KeyResultCard, KeyResultNotFound, ObjectiveNotFound, RankRating } from '../components';
import { createKeyResult } from '../functions';


export const NewArchive = () => {
  const { objectiveId } = useParams<"objectiveId">();
  const navigate = useNavigate();
  const authState = useAuth();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get("mode");

  const { data: objective } = useQuery([ "objective", authState.user.uid, objectiveId], () => getObjective(authState.user.uid, objectiveId));
  const { data: keyResults } = useQuery([ "key-results", authState.user.uid, objectiveId], () => getKeyResults(authState.user.uid, objectiveId));

  //
  const [formats, setFormats] = useState(() => []);
    const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[],
  ) => {
    setFormats(newFormats);
  };
  //


  return (
    <Container maxWidth="xl" sx={MainContainerStyle}>
      <Typography variant="h3" noWrap component="h3">
      {objectiveId}
      </Typography>
      <Typography variant="h3" noWrap component="h3">
      {mode}
      </Typography>

      <Typography 
        variant={"h3"}
        component={"h3"} 
        noWrap 
        sx={{ flexGrow: 1, mx: 1, textAlign: "left"}}>
        {"指標を選択してください"}
      </Typography>
      <StyledToggleButtonGroup
      size="small"
      color="primary"
      orientation="vertical"
      value={formats}
      onChange={handleFormat}
      sx={{ display: 'flex', width: '100%'}}
      aria-label="text formatting">
        { keyResults ?
          keyResults.map((keyResult) => {
            return(
            <ToggleButton value={keyResult.id} key={keyResult.id}>
              <Typography 
                variant={"h3"}
                component={"h3"} 
                noWrap 
                sx={{ flexGrow: 1, mx: 1, textAlign: "left"}}>
                  {keyResult.title}
              </Typography>
              <RankRating sx={{mx: 1, flexGrow: 0 }} readOnly value={keyResult.rank} size="large"/>
            </ToggleButton>
            );
            })
            :
            <Skeleton variant="rectangular" width={50} height={150} />
            }
      </StyledToggleButtonGroup>
    </Container>
      );
};

export const Archive = () => {
  const { objectiveId } = useParams<"objectiveId">();
  const { archiveId } = useParams<"archiveId">();
  const navigate = useNavigate();
  const authState = useAuth();

  return (
    <Container maxWidth="xl" sx={MainContainerStyle}>
      <Typography variant="h3" noWrap component="h3">
      {objectiveId}
      </Typography>
      <Typography variant="h3" noWrap component="h3">
      {archiveId}
      </Typography>
    </Container>
      );
};
