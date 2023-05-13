import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';

import { 
  Button, 
  Box, 
  Container, 
  Divider, 
  Skeleton, 
  TextField, 
  ToggleButton, 
  ToggleButtonGroup, 
  Typography, 
  } from '@mui/material';

import { EditableLabel } from '@/components/EditableLabel';
import { StyledToggleButtonGroup } from '@/components/ToggleButton';
import { useAuth } from '@/hooks';
import { MainContainerStyle } from '@/styles';

import { getAchive, getKeyResults, getObjective } from '../api';
import { KeyResultCard, KeyResultNotFound, ObjectiveNotFound, RankRating } from '../components';
import { createAchive, updateAchive, updateAchiveProps } from '../functions';

export const NewAchive = () => {
  const { objectiveId } = useParams<"objectiveId">();
  const navigate = useNavigate();
  const authState = useAuth();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const { data: objective } = useQuery([ "objective", authState.user.uid, objectiveId], () => getObjective(authState.user.uid, objectiveId));
  const { data: keyResults } = useQuery([ "key-results", authState.user.uid, objectiveId], () => getKeyResults(authState.user.uid, objectiveId));

  const [selectedKeyResults, setSelectedKeyResults] = useState(() => []);
  const [title, setTitle] = useState("");
  const [mode, setMode] = useState(searchParams.get("mode") ?? "");

  const { mutate: updateAchiveMutate } = useMutation((props: updateAchiveProps) => {
    return updateAchive(props);
  }, 
  {
    onSuccess: (id) => {
      navigate(`../${objectiveId}/achives/${id}`);
    }
  });

  const handleSelectedKeyResults = ( event: React.MouseEvent<HTMLElement>, newSelectedKeyResults: string[],) => setSelectedKeyResults(newSelectedKeyResults);

  const handleExecuteButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    const achive = createAchive();
    achive.title = title;
    achive.type = mode;
    achive.selectedKeyResults = selectedKeyResults;
    updateAchiveMutate({userId: authState.user.uid, objective: objective, achive: achive});
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
  const handleMode = (event: React.ChangeEvent<HTMLInputElement>, newMode: string) => {
    if((newMode ?? "") !== "") {
      setMode(newMode);
    }
  };

  return (
    <Container maxWidth="xl" sx={MainContainerStyle}>
      <Box>
      <Typography variant="h3" noWrap component="h3">
      {objective.title}
      </Typography>
      <Divider />
      <Box sx={{
        display: 'flex', 
        flexDirection: 'row', 
        my: 2, 
        }}>
        <TextField 
          value={title} 
          onChange={handleTitleChange} 
          sx={{ width: '100%', flexGrow: 1}}
          label="タイトル"
        />
        <ToggleButtonGroup
          value={mode}
          color="primary"
          exclusive
          onChange={handleMode}
          sx={{ flexGrow: 0, mx: 1 , width: "30%"}}
          aria-label="Mode" >
          <ToggleButton value="training" sx={{width: "100%"}}> {"トレモ"} </ToggleButton>
          <ToggleButton value="battle" sx={{width: "100%"}} > {"対戦"} </ToggleButton>
          <ToggleButton value="cpu"  sx={{width: "100%"}}> {"CPU戦"} </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Typography 
        variant={"h6"}
        noWrap 
        sx={{ mx: 1, textAlign: "left"}}>
        {"やること(指標)を選択"}
      </Typography>
      </Box>
      <StyledToggleButtonGroup
        size="small"
        color="primary"
        orientation="vertical"
        value={selectedKeyResults}
        onChange={handleSelectKeyResults}
        sx={{ display: 'flex', width: '100%'}}
        aria-label="text formatting">

        { keyResults ?
          keyResults.map((keyResult) => {
            return(
            <ToggleButton value={keyResult.id} key={keyResult.id}>
              <Typography variant={"h4"} component={"h4"} noWrap 
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

      <Button variant="outlined"
        fullWidth
        onClick={handleExecuteButtonClick}
        sx={{
          my:1,
          p:1,
          height : { xs : 50 },
          display: { xs: 'none', sm: 'flex' },
        }}>
        {"やること(指標)を開始する"}
      </Button>
    </Container>
      );
};

export const Achive = () => {
  const { objectiveId } = useParams<"objectiveId">();
  const { achiveId } = useParams<"achiveId">();
  const navigate = useNavigate();
  const authState = useAuth();

  const { data: objective } = useQuery([ "objective", authState.user.uid, objectiveId], () => getObjective(authState.user.uid, objectiveId));
  const { data: keyResults } = useQuery([ "key-results", authState.user.uid, objectiveId], () => getKeyResults(authState.user.uid, objectiveId));
  const { data: achive } = useQuery([ "achive", authState.user.uid, objectiveId, achiveId], () => getAchive(authState.user.uid, objectiveId, achiveId));

  return (
    <Container maxWidth="xl" sx={MainContainerStyle}>
      <Typography variant="h3" noWrap component="h3">
      {objectiveId}
      </Typography>
      <Typography variant="h3" noWrap component="h3">
      {achiveId}
      </Typography>
        { keyResults ?
          keyResults.filter((kr) => achive.selectedKeyResults.includes(kr.id)).map((keyResult) => {
            return(
            <ToggleButton value={keyResult.id} key={keyResult.id}>
              <Typography variant={"h4"} component={"h4"} noWrap 
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
    </Container>
      );
};
