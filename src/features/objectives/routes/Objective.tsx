import { useParams } from 'react-router-dom';
import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import EditIcon from '@mui/icons-material/Edit';

import { InputSingleTextDialog } from '@/components/InputDialog'
import { Loading } from '@/components/Loading'
import { useAuth } from '@/hooks';
import { MainContainerStyle } from '@/styles';

import { setObjective } from '../api';
import { useObjectiveKeyResults } from '../hooks';
import { InputTitleDialogState, ObjectiveVersionState } from '../stores';

const EDIT_OBJECTIVE_TITLE = "edit_objective_title";
const ADD_KEY_RESULT = "add_key_result";
const EDIT_KEY_RESULT = "edit_key_result";

export const Objective = () => {
  const { objectiveId } = useParams<"objectiveId">();
  const authState = useAuth();

  const [ ObjectiveVersion, setObjectiveVersion ] = useRecoilState(ObjectiveVersionState);
  const [ TitleDialog, setTitleDialog ] = useRecoilState(InputTitleDialogState);
  const resetTitleDialog = useResetRecoilState(InputTitleDialogState);

  const objectiveKeyResults = useObjectiveKeyResults(authState.user.uid, objectiveId, ObjectiveVersion);

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
          break;
        case EDIT_OBJECTIVE_TITLE :
          let objective = {
            ...objectiveKeyResults.objective, 
            title: value, 
            };
          const result = await setObjective(authState.user.uid, objective);
          if(result.isSuccess()) {
            setObjectiveVersion(ObjectiveVersion + 1);
          } else {
            // TODO Error
          }
          break;
      }
    }
    resetTitleDialog();
  };

  const editObjectiveTitle = () => {
    const dialogTitle = "目標名";
    const defaultValue = objectiveKeyResults.objective.title;
    const props = TitleDialog.Props;
    setTitleDialog(
      {
        type: EDIT_OBJECTIVE_TITLE, 
        index: 0, 
        props: {
          ...props,
          title: dialogTitle,
          defaultValue: defaultValue,
          open: true,
        }
      });
  }

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
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          }}>
          <Typography variant="h3" noWrap component="h3" sx={{ flexGrow: 1}}>
            {objectiveKeyResults.objective.title}
          </Typography>
          <IconButton aria-label="edit" size="large" sx={{mx: 1, flexGrow:0 }} onClick={editObjectiveTitle}>
            <EditIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Box>
          <Button variant="outlined"
            fullWidth
            onClick={() => {}}
            sx={{
              my:1,
              p:1,
              height : { xs : 50 },
              display: { xs: 'none', sm: 'flex' },
            }}>
            {"指標を追加"}
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
      <Typography variant="h1" component="div" gutterBottom
        sx={{
          textAlign: "center",
          mt: 10,
          mb: 2,
        }}>
        Error
      </Typography>
      <Typography variant="h2" component="div" gutterBottom
        sx={{
          textAlign: "center",
          my: 2,
        }}>
        目標のアクセス権限がないか存在しません
      </Typography>
    </Container>);

  }
}
