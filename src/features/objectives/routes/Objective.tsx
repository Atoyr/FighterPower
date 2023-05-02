import { useParams } from 'react-router-dom';
import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import EditIcon from '@mui/icons-material/Edit';

import { InputSingleTextDialog } from '@/components/InputDialog'
import { Loading } from '@/components/Loading'
import { useAuth } from '@/hooks';
import { MainContainerStyle } from '@/styles';

import { useObjectiveKeyResults } from '../hooks';
import { InputTitleDialogState } from '../stores';

const EDIT_OBJECTIVE_TITLE = "edit_objective_title";
const ADD_KEY_RESULT = "add_key_result";
const EDIT_KEY_RESULT = "edit_key_result";

export const Objective = () => {
  const { objectiveId } = useParams<"objectiveId">();
  const authState = useAuth();

  const [ TitleDialogState, setTitleDialogState ] = useRecoilState(InputTitleDialogState);
  const resetTitleDialogState = useResetRecoilState(InputTitleDialogState);

  let objectiveKeyResults = useObjectiveKeyResults(authState.user.uid, objectiveId);

  const onClose = async (value:string, isCancel: boolean) => {
    if (!isCancel)
    {
      // validate
      if ( value == "" ) {
        // setTitleDialogProps(
        //   {
        //     type: titleDialogProps.type,
        //     index: titleDialogProps.index,
        //     props: {
        //       ...titleDialogProps.props,
        //       error: true,
        //       message: "空白です",
        //     }});
        return;
      }

      // const index = TitleDialogProps.index;
      //setTitleDialogProps({type: "", index: 0, props: newInputTitleDialogProps()});

      switch(TitleDialogState.type) {
        case ADD_KEY_RESULT :
          break;
        case EDIT_KEY_RESULT :
          break;
        case EDIT_OBJECTIVE_TITLE :
          break;
      }
    }
    resetTitleDialogState();
  };

  const editObjectiveTitle = () => {
    const dialogTitle = "目標名";
    const defaultValue = objectiveKeyResults.objective.title;
    const props = TitleDialogState.Props;
    setTitleDialogState(
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
        <InputSingleTextDialog
          title={TitleDialogState.props.title}
          label={TitleDialogState.props.label}
          open={TitleDialogState.props.open}
          defaultValue={TitleDialogState.props.defaultValue}
          error={TitleDialogState.props.error}
          message={TitleDialogState.props.message}
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
