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

import { EditableLabel } from '@/components/EditableLabel';
import { EditableTextField } from '@/components/EditableTextField';
import { useAuth } from '@/hooks';
import { MainContainerStyle } from '@/styles';

import { 
  getArchives, 
  getKeyResults, 
  getObjective, 
  setObjective } from '../api';
import { KeyResultCard, ObjectiveNotFound } from '../components';

const EDIT_OBJECTIVE_TITLE = "edit_objective_title";
const ADD_KEY_RESULT = "add_key_result";
const EDIT_KEY_RESULT = "edit_key_result";

export const Objective = () => {
  const { objectiveId } = useParams<"objectiveId">();
  const navigate = useNavigate(); const authState = useAuth();

  const [ objectiveVersion, setObjectiveVersion ] = useState(0);

  const { data: objective } = useQuery([ "objective", authState.user.uid, objectiveId], () => getObjective(authState.user.uid, objectiveId));
  const { data: keyResults } = useQuery([ "key-results", authState.user.uid, objectiveId], () => getKeyResults(authState.user.uid, objectiveId));
  const { data: archives } = useQuery([ "archives", authState.user.uid, objectiveId], () => getArchives(authState.user.uid, objectiveId));
  const { mutate: updateObjectiveMutate } = useMutation(({userId, objective}) => setObjective(userId, objective), {
    onSuccess: (id) => {
      setObjectiveVersion(objectiveVersion + 1);
    }
  });


  const saveObjectiveTitle = async (newValue) => {
    if (newValue == "") {
      // TODO ERROR
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

  if (objective) {
    // Main
    return (
      <Container maxWidth="xl" sx={MainContainerStyle}>
        <EditableLabel label={objective.title} onSave={saveObjectiveTitle} allowEmpty={false}/>
        <EditableTextField label={objective.note} onSave={saveObjectiveMemo} allowEmpty={false}/>
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
            {"やること(指標)を実行する"}
          </Button>
        </Box>
      </Container>);
  } else {
    // NotAccess
    return (
    <Container>
      <ObjectiveNotFound />
    </Container>);
  }
}
