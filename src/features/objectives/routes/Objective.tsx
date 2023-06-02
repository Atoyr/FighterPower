import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { useMutation, useQuery } from 'react-query';

import {
  Box, 
  Button, 
  Container, 
  IconButton, 
  Skeleton, 
  Typography} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

import { BreadcrumbsSetter } from '@/components/Breadcrumbs';
import { EditableLabel } from '@/components/EditableLabel';
import { EditableTextField } from '@/components/EditableTextField';
import { useAuth, useErrorSnackbar } from '@/hooks';
import { MainContainerStyle } from '@/styles';

import { 
  getAchives, 
  getKeyResults, 
  getObjective, 
  setObjective} from '../api';
import { 
  AchiveCard, 
  KeyResultCard, 
  ObjectiveNotFound, 
  SelectAchiveModeDialog } from '../components';

export const Objective = () => {
  const { objectiveId } = useParams<"objectiveId">();
  const navigate = useNavigate(); const authState = useAuth();
  const showErrorSnackbar = useErrorSnackbar();

  const [ objectiveVersion, setObjectiveVersion ] = useState(0);
  const [ dialogOpen, setDialogOpen ] = useState(false);

  const { data: objective, refetch: refetchObjective } = useQuery([ "objective", authState.user.uid, objectiveId], () => getObjective(authState.user.uid, objectiveId));
  const { data: keyResults } = useQuery([ "key-results", authState.user.uid, objectiveId], () => getKeyResults(authState.user.uid, objectiveId));
  const { data: achives } = useQuery([ "achives", authState.user.uid, objectiveId], () => getAchives(authState.user.uid, objectiveId));
  const { mutate: updateObjectiveMutate } = useMutation(({userId, objective}) => setObjective(userId, objective), {
    onSuccess: (id) => {
      setObjectiveVersion(objectiveVersion + 1);
      refetchObjective();
    }
  });

  const breadcrumbs = [
    { path: '/app/objectives', name: '目標一覧' },
    { path: `/app/objectives/${objectiveId}`, name: objective.title }, 
  ];

  const saveObjectiveTitle = async (newValue) => {
    if (newValue === "") {
      showErrorSnackbar("目標に向けてやること (指標)が空白です");
      return;
    }
    const o = {
      ...objective, 
      title: newValue, 
    };
    updateObjectiveMutate({userId: authState.user.uid, objective: o});
  };

  const saveObjectiveMemo = async (newValue) => {
    if (newValue == "") {
      // TODO ERROR
      return;
    }
    const o = {
      ...objective, 
      note: newValue, 
    };
    updateObjectiveMutate({userId: authState.user.uid, objective: o});
  };

  const handleDialogClose = (value) => {
    if(value === "") {
      return;
    }

    navigate(`achives/new?mode=${value}`);
  };

  if (objective) {
    // Main
    return (
      <Container maxWidth="xl" sx={MainContainerStyle}>
        <BreadcrumbsSetter breadcrumbs={breadcrumbs} />
        <EditableLabel label={objective.title} onSave={saveObjectiveTitle} allowEmpty={false}/>
        <EditableTextField label={objective.note} onSave={saveObjectiveMemo} allowEmpty={false}/>
        { (objective?.status ?? "") === "open" ?
        <Box>
          <Button variant="outlined"
            fullWidth
            onClick={() => navigate(`key-results/new`)}
            sx={{
              my:1,
              p:1,
              height : { xs : 50 },
              display: { xs: 'none', sm: 'flex' },
            }}>
            {"やること(指標)を追加"}
          </Button>
        </Box>
        : <></>
        }
        <Box>
          { keyResults ?
            keyResults.map((keyResult) => {
              return (
              <KeyResultCard 
                title={keyResult.title} 
                rank={keyResult.rank} 
                key={keyResult.id}
                variant="h4"
                component="h4"
                sx={{my:1}}
                onClick={() => navigate(`key-results/${keyResult.id}`)} />
              );
            })
            :
            <Skeleton variant="rectangular" width={50} height={150} />
          }
        </Box>
        { (keyResults?.length ?? 0) !== 0 ?
        <Box>
          <Button variant="outlined"
            fullWidth
            onClick={() => setDialogOpen(true)}
            sx={{
              my:1,
              p:1,
              height : { xs : 50 },
              display: { xs: 'none', sm: 'flex' },
            }}>
            {"やること(指標)を実行する"}
          </Button>
        </Box> 
        : <></>
        }
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          { achives ? 
          achives.map((achive) => {
            const href = `achives/${achive.id}`;
            return (
              <AchiveCard
                sx={{
                  m: { xs: 0, sm: 1 },
                  mt: { xs: 1 },
                }}
                key={achive.id}
                title={achive.title} 
                onClick={() => navigate(href)} />
            );
          })
          : 
          <Stack spacing={1}>
            <Skeleton variant="rectangular" width={250} height={150} />
          </Stack>
          }
        </Box>
        <SelectAchiveModeDialog open={dialogOpen} onClose={handleDialogClose}/>
      </Container>);
  } else {
    // NotAccess
    return (
    <Container>
      <ObjectiveNotFound />
    </Container>);
  }
}
