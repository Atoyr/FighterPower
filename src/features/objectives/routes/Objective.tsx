import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import EditIcon from '@mui/icons-material/Edit';

import { EditableLabel } from '@/components/EditableLabel'
import { InputSingleTextDialog } from '@/components/InputDialog'
import { Loading } from '@/components/Loading'
import { useAuth } from '@/hooks';
import { MainContainerStyle } from '@/styles';

import { setObjective } from '../api';
import { ObjectiveNotFound } from '../components';
import { useObjectiveKeyResults } from '../hooks';
import { InputTitleDialogState } from '../stores';

const EDIT_OBJECTIVE_TITLE = "edit_objective_title";
const ADD_KEY_RESULT = "add_key_result";
const EDIT_KEY_RESULT = "edit_key_result";

export const Objective = () => {
  const { objectiveId } = useParams<"objectiveId">();
  const navigate = useNavigate();
  const authState = useAuth();

  const [ objectiveVersion, setObjectiveVersion ] = useState(0);
  const [ TitleDialog, setTitleDialog ] = useRecoilState(InputTitleDialogState);
  const [ editObjectiveTitleError, setEditObjectiveTitleError ] = useState("");
  const resetTitleDialog = useResetRecoilState(InputTitleDialogState);

  const objectiveKeyResults = useObjectiveKeyResults(authState.user.uid, objectiveId, objectiveVersion);

  const onClose = async (value:string, isCancel: boolean) => {
    if (!isCancel) {
      // validate
      if ( value == "" ) {
        setTitleDialog(
          {
            type: TitleDialog.type,
            index: TitleDialog.index,
            props: {
              ...TitleDialog.props,
              error: true,
              message: "空白です",
            }});
        return;
      }

      // const index = TitleDialogProps.index;
      //setTitleDialogProps({type: "", index: 0, props: newInputTitleDialogProps()});

      switch(TitleDialog.type) {
        case ADD_KEY_RESULT :
          break;
        case EDIT_KEY_RESULT :
          break; case EDIT_OBJECTIVE_TITLE :
          let objective = {
            ...objectiveKeyResults.objective, 
            title: value, 
            };
          const result = await setObjective(authState.user.uid, objective); 
          if(result.isSuccess()) { 
            setObjectiveVersion(objectiveVersion + 1);
          } else {
            // TODO Error
          }
          break;
      }
    }
    resetTitleDialog();
  };

  const saveObjectiveTitle = async (newValue) => {
    setEditObjectiveTitleError("");
    if (newValue == "") {
      // TODO ERROR
      return;
    }
    let objective = {
      ...objectiveKeyResults.objective, 
      title: newValue, 
    };
    const result = await setObjective(authState.user.uid, objective)
    if(result.isSuccess()) { 
      setObjectiveVersion(objectiveVersion + 1);
    } else {
      // TODO Error
    }
  };

  if (!objectiveKeyResults) {
    // Loading...
      return (
      <Container maxWidth="xl" sx={MainContainerStyle}>
        <Loading />
      </Container>);
  } else if (objectiveKeyResults.objective) {
    // Main
    return (
      <Container maxWidth="xl" sx={MainContainerStyle}>
        <EditableLabel label={objectiveKeyResults.objective.title} onSave={saveObjectiveTitle} allowEmpty={false}/>
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
        <InputSingleTextDialog
          title={TitleDialog.props.title}
          label={TitleDialog.props.label}
          open={TitleDialog.props.open}
          defaultValue={TitleDialog.props.defaultValue}
          error={TitleDialog.props.error}
          message={TitleDialog.props.message}
          onClose={onClose}
        />
      </Container>);
  } else {
    // NotAccess
    return (
    <Container>
      <ObjectiveNotFound />
    </Container>);

  }
}
