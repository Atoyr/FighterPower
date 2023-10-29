import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';

import { 
  Button, 
  Box, 
  Container, 
  Divider, 
  Paper, 
  Skeleton, 
  TextField, 
  ToggleButton, 
  ToggleButtonGroup, 
  Typography, 
  } from '@mui/material';

import { BreadcrumbsSetter } from '@/components/Breadcrumbs';
import { EditableLabel } from '@/components/EditableLabel';
import { StarRating } from '@/components/Rating';
import { Title } from '@/components/Title';
import { StyledToggleButtonGroup } from '@/components/ToggleButton';
import { useAuth, useErrorSnackbar, useSuccessSnackbar } from '@/hooks';
import { MainContainerStyle } from '@/styles';

import { 
  getAchive, 
  getAchiveResults, 
  getKeyResults, 
  getObjective } from '../api';
import { 
  AchiveResultTypeChip, 
  AchiveStatusToggle, 
  KeyResultCard, 
  KeyResultNotFound, 
  ObjectiveNotFound } from '../components';
import { rankRatingLabels } from '../constants';
import { 
  createAchive, 
  updateAchive, 
  updateAchiveProps, 
  updateAchiveResults, 
  updateAchiveResultsProps} from '../functions';

export const NewAchive = () => {
  const { objectiveId } = useParams<"objectiveId">();
  const navigate = useNavigate();
  const authState = useAuth();
  const showErrorSnackbar = useErrorSnackbar();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const { data: objective } = useQuery([ "objective", authState.user.uid, objectiveId], () => getObjective(authState.user.uid, objectiveId)); const { data: keyResults } = useQuery([ "key-results", authState.user.uid, objectiveId], () => getKeyResults(authState.user.uid, objectiveId));
  const [selectedKeyResults, setSelectedKeyResults] = useState(() => []);
  const [title, setTitle] = useState("");
  const [mode, setMode] = useState(searchParams.get("mode") ?? "");

  const breadcrumbs = [
    { path: '/app/objectives', name: '目標一覧' },
    { path: `/app/objectives/${objectiveId}`, name: objective.title }, 
    { path: `/app/objectives/${objectiveId}/achives/new`, name: "新規" }, 
  ];

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
    if (title === "") {
      showErrorSnackbar("タイトルが空白です");
      return;
    }
    if (selectedKeyResults.length === 0) {
      showErrorSnackbar("やること(指標)が選択されていません");
      return;
    }
    
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
      <Title title="指標 新規作成" />
      <BreadcrumbsSetter breadcrumbs={breadcrumbs} />
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
        onChange={handleSelectedKeyResults}
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
              <StarRating sx={{mx: 1, flexGrow: 0 }} readOnly value={keyResult.rank} size="large" labels={rankRatingLabels}/>
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
  const showSuccessSnackbar = useSuccessSnackbar();

  const { data: objective } = useQuery([ "objective", authState.user.uid, objectiveId], () => getObjective(authState.user.uid, objectiveId));
  const { data: keyResults } = useQuery([ "key-results", authState.user.uid, objectiveId], () => getKeyResults(authState.user.uid, objectiveId));
  const { data: achive } = useQuery([ "achive", authState.user.uid, objectiveId, achiveId], () => getAchive(authState.user.uid, objectiveId, achiveId));
  const { data: achiveResults } = useQuery([ "achive-results", authState.user.uid, objectiveId, achiveId], () => getAchiveResults(authState.user.uid, objectiveId, achiveId));

  const [toggle, setToggle] = useState({});

  const breadcrumbs = [
    { path: '/app/objectives', name: '目標一覧' },
    { path: `/app/objectives/${objectiveId}`, name: objective.title }, 
    { path: `/app/objectives/${objectiveId}/achives/${achiveId}`, name: achive?.title ?? "指標" }, 
  ];

  const { mutate: updateAchiveResultsMutate } = useMutation((props) => {
    const ids = Object.keys(props.toggle);
    let ars = []
    ids.forEach((id) => {
      const status = props.toggle[id];
      const achiveResult = achiveResults.find(ar => ar.id == id);
      achiveResult.status = status;
      ars = [...ars, achiveResult];
    });
    return  updateAchiveResults({userId: props.userId, objective: props.objective, achive: props.achive, achiveResults: ars});
  }, 
  {
    onSuccess: (ids) => {
      setToggle({});
      showSuccessSnackbar("更新しました");
    }
  });

  const handleToggleOnChange = (id, status) => {
    setToggle((prevData) => {
      const newData = { ...prevData };
      if(newData.hasOwnProperty(id)) {
        delete newData[id];
      }
      newData[id] = status;
      return newData;
    });
  }

  const handleSaveButton = (event: React.MouseEvent<HTMLElement>) => {
    updateAchiveResultsMutate({userId: authState.user.uid, objective: objective, achive: achive, toggle: toggle});
  };

  return (
  <Container maxWidth="xl" sx={MainContainerStyle}>
    <Title title={achive.title} />
    <BreadcrumbsSetter breadcrumbs={breadcrumbs} />
    <Box>
      <Typography variant="h3" noWrap component="h3">{objective.title}</Typography>
      <Divider />
      <Box sx={{
        display: 'flex', 
        flexDirection: 'row', 
        my: 2, 
        }}>
        <Typography variant="h3" noWrap component="h3" sx={{flex: 1}}>{achive.title}</Typography>
        <AchiveResultTypeChip type={achive.type} sx={{flex: 0}}/>
      </Box>
      <Divider />
    </Box>
      { achiveResults.map((achiveResult) => {
        const keyResult = keyResults.find(kr => kr.id == achiveResult.selectedKeyResult)
        return(
        <Paper key={achiveResult.id} elevation={3} sx={{my:1}}>
          <Typography variant={"h4"} component={"h4"} noWrap 
            sx={{ flexGrow: 1, mx: 1, textAlign: "left"}}>
              {keyResult.title ?? ""}
          </Typography>
          <StarRating sx={{mx: 1, flexGrow: 0 }} readOnly value={keyResult.rank ?? ""} size="large" labels={rankRatingLabels}/>
          <AchiveStatusToggle status={achiveResult.status} 
            onChange={(newValue) => handleToggleOnChange(achiveResult.id, newValue)} sx={{mx:2, my:2}}/>
        </Paper>
        );
      })}
      <Button variant="outlined"
        fullWidth
        onClick={handleSaveButton}
        sx={{
          my:1,
          p:1,
          height : { xs : 50 },
          display: { xs: 'none', sm: 'flex' },
        }}>
        {"保存する"}
      </Button>
    </Container>
      );
};
