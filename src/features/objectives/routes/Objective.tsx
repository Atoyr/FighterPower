import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { useMutation, useQuery } from 'react-query';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import EditIcon from '@mui/icons-material/Edit';

import { EditableLabel } from '@/components/EditableLabel'
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
  const navigate = useNavigate();
  const authState = useAuth();

  const [ objectiveVersion, setObjectiveVersion ] = useState(0);
  const [ editObjectiveTitleError, setEditObjectiveTitleError ] = useState("");

  const { data: objective } = useQuery([ "objective", authState.user.uid, objectiveId], () => getObjective(authState.user.uid, objectiveId));
  const { data: keyResults } = useQuery([ "key-results", authState.user.uid, objectiveId], () => getKeyResults(authState.user.uid, objectiveId));
  const { data: archives } = useQuery([ "archives", authState.user.uid, objectiveId], () => getArchives(authState.user.uid, objectiveId));
  const { mutate: updateObjectiveMutate } = useMutation(({userId, objective}) => setObjective(userId, objective), {
    onSuccess: (id) => {
      setObjectiveVersion(objectiveVersion + 1);
    }
  });


  const saveObjectiveTitle = async (newValue) => {
    setEditObjectiveTitleError("");
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

  if (objective) {
    // Main
    return (
      <Container maxWidth="xl" sx={MainContainerStyle}>
        <EditableLabel label={objective.title} onSave={saveObjectiveTitle} allowEmpty={false}/>
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
          <KeyResultCard title="foofoo" />
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
