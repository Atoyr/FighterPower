import { useParams } from 'react-router-dom';
import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';

import { InputSingleTextDialog } from '@/components/INputDialog'

import { InputTitleDialogState } from '../stores';

const EDIT_OBJECTIVE_TITLE = "edit_objective_title";
const ADD_KEY_RESULT = "add_key_result";
const EDIT_KEY_RESULT = "edit_key_result";

export const Objective = () => {
  const { objectiveId } = useParams<"objectiveId">();

  const [ titleDialogState, setTitleDialogState ] = useRecoilState(InputTitleDialogState);
  const resetTitleDialogState = useResetRecoilState(InputTitleDialogState);


  const onClose = async (value:string, isCancel: boolean) => {
    if (!isCancel)
    {
      // validate
      if ( value == "" ) {
        setTitleDialogProps(
          {
            type: titleDialogProps.type,
            index: titleDialogProps.index,
            props: {
              ...titleDialogProps.props,
              error: true,
              message: "空白です",
            }});
        return;
      }

      const index = titleDialogProps.index;
      setTitleDialogProps({type: "", index: 0, props: newInputTitleDialogProps()});

      switch(titleDialogState.type) {
        case ADD_KEY_RESULT :
          const g = newGoal(value, goalSheetAndDtil.goals.length+1);
          await setGoal(userContext.id!, goalSheetId, g);
          goalSheetAndDtil.goals.push(g);
          break;
        case EDIT_KEY_RESULT :
          goalSheetAndDtil.goals[titleDialogProps.index].title = value;
          await setGoal(userContext.id!, goalSheetId, goalSheetAndDtil.goals[titleDialogProps.index]);
          break;
        case EDIT_OBJECTIVE_TITLE :
          goalSheetAndDtil.goalSheet!.title = value;
          await setGoalSheet(userContext.id!, goalSheetAndDtil.goalSheet!);
          goalSheetAndDtil.goalSheet!.version = goalSheetAndDtil.goalSheet!.version + 1;
          break;
      }
          setVersion(version + 1);
    }
    resetTitleDialogState
  };

  const editObjectiveTitle = () => {
    const dialogTitle = "目標名";
    // TODO
    const defaultValue = "";
    const props = titleDialogState.Props;
    setTitleDialogProps(
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


  return (
    <>
      <h1>{objectiveId}</h1>
    </>
  );
}


import React from 'react';
import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Container from '@mui/material/Container';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import { useParams } from 'react-router-dom';
import { useUserContext } from 'context/UserProvider';
import { useGoalSheetAndDtil } from 'hook/useGoalSheetAndDtil';
import { newGoal, setGoal } from 'data/goal';
import { setGoalSheet } from 'data/goalSheet';
import { GoalResult, setGoalResult, goalTypeValue } from 'data/goalResult';
import { useDocumentTitle } from 'hook/useDocumentTitle';
import { InputGoalResultDialog, InputGoalResultDialogProps, newInputGoalResultDialogProps} from './InputGoalResultDialog';
import { InputTitleDialog, InputTitleDialogProps, newInputTitleDialogProps } from './InputTitleDialog';
import { GoalAchives} from './GoalAchives';

export default function GoalSheet() {
  useDocumentTitle("GoalSheet");
  const [version, setVersion] = React.useState<number>(0);
  const [isOpenGoalSheetDialog, setIsOpenGoalSheetDialog] = React.useState<boolean>(false);
  const [titleDialogProps, setTitleDialogProps] = React.useState<{type: string, index: number, props: InputTitleDialogProps}>({type:"", index:0, props: newInputTitleDialogProps()});
  const [goalResultDialogProps, setGoalResultDialogProps] = React.useState<{index:number, props: InputGoalResultDialogProps}>({index: -1, props: newInputGoalResultDialogProps()});
  const [speedDialogOpen, setSpeedDialogOpen] = React.useState<boolean>(false);
  const handleSpeedDialogOpen = () => setSpeedDialogOpen(true);
  const handleSpeedDialogClose = () => setSpeedDialogOpen(false);
  const userContext = useUserContext();

  const { id } = useParams<"id">();
  const goalSheetId = id ?? "";
  let goalSheetAndDtil = useGoalSheetAndDtil(userContext.id ?? "", goalSheetId, version);


  const onCloseResultDialog = async (value : GoalResult | null, isCancel : boolean) => {
    if (!isCancel)
    {
      if ( value != null ) {
        value.order =  goalResultDialogProps.index < 0 ? goalSheetAndDtil.goalResults.length + 1 : goalResultDialogProps.index;
        const r = await setGoalResult(userContext.id!, goalSheetId, value);
        if (r.isSuccess()) {
          setVersion(version + 1);
        }
      }
    }
    setGoalResultDialogProps({index: -1, props: newInputGoalResultDialogProps()});
  };

  const editTitle = () => {
    const dialogTitle = "タイトル";
    const defaultValue = goalSheetAndDtil.goalSheet?.title ?? "";
    const props = newInputTitleDialogProps()
    setTitleDialogProps(
      {
        type: "edittitle", 
        index: 0, 
        props: {
          ...props,
          title: dialogTitle,
          defaultValue: defaultValue,
          open: true,
        }
      });
  }
  
  const addGoal = () => {
    setSpeedDialogOpen(false);
    const index = goalSheetAndDtil.goals.length + 1;
    const dialogTitle = `目標 ${index}`;
    const props = newInputTitleDialogProps()
    setTitleDialogProps(
      {
        type: "addgoal", 
        index: index, 
        props: {
          ...props,
          title: dialogTitle,
          open: true,
        }
      });
  }

  const editGoal = (index: number) => {
    const dialogTitle = `目標 ${index + 1}`;
    const defaultValue = goalSheetAndDtil.goals[index].title;
    const props = newInputTitleDialogProps();
    setTitleDialogProps(
      {
        type: "editgoal", 
        index: index, 
        props: {
          ...props,
          title: dialogTitle,
          defaultValue: defaultValue,
          open: true,
        }
      });
  }

  const addGoalResult = () => {
    setSpeedDialogOpen(false);
    const props = newInputGoalResultDialogProps();
    props.title = "結果を入力";
    props.open = true;
    props.goalCount = goalSheetAndDtil.goals.length;
    setGoalResultDialogProps({index: -1, props: props});
  }

  const editGoalResult = (index: number) => {
    const props = newInputGoalResultDialogProps();
    props.inputGoalResult = goalSheetAndDtil.goalResults[index];
    props.title = `結果${index + 1}を編集`;
    props.open = true;
    props.goalCount = goalSheetAndDtil.goals.length;
    
    setGoalResultDialogProps({index, props});
  }

  const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
    display: { xs: 'grid', sm: 'none' },
  };

  if (goalSheetAndDtil.isLoading) {
      return (<Container maxWidth="xl" 
      sx={{
        mt: { xs: 1, sm: 10 }
      }}>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>);
  } else if (goalSheetAndDtil.goalSheet != null) {
    return (
      <Container maxWidth="xl" 
      sx={{
        mt: { xs: 1, sm: 10 }
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          }}>
          <Typography variant="h3" noWrap component="h3" sx={{ flexGrow: 1}}>
          {goalSheetAndDtil.goalSheet.title}
          </Typography>
          <IconButton aria-label="edit" size="large" sx={{mx: 1, flexGrow:0 }} onClick={editTitle}>
            <EditIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Box>
          { goalSheetAndDtil.goals.map((goal, index) => {
            return (
              <Box 
                key={goal.id}
                sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                my:2,
                borderBottom: 1,
                }}>
                <Typography variant="h6" noWrap component="h6" sx={{ flexGrow: 0, ml: 1, mr: 3}}>
                目標{index + 1}
                </Typography>
                <Typography variant="h6" noWrap component="h6" sx={{ flexGrow: 1}}>
                {goal.title}
                </Typography>
                <IconButton aria-label="edit" size="small" sx={{mx: 1, flexGrow : 0}} onClick={() => editGoal(index)}>
                  <EditIcon fontSize="inherit" />
                </IconButton>
              </Box>
            );})}
        </Box>
        <Box>
          <Button variant="outlined"
            fullWidth
            onClick={addGoal}
            sx={{
              my:1,
              p:1,
              height : { xs : 50 },
              display: { xs: 'none', sm: 'flex' },
            }}>
            目標を追加
          </Button>
        </Box>
        <Box>
          { goalSheetAndDtil.goalResults.map((goalResult, index) => {
            return (
            <Button variant="outlined" fullWidth onClick={() => editGoalResult(index)} key={goalResult.id}
              sx={{
                m: { xs: 0, sm: 1 },
                mt: { xs: 1 },
                p:1,
                width: { sm: 280 },
                minHeight: {xs: 150},
                height: {xs: "100%"}
              }}>
              <Box
              sx={{
                p:0,
                width: { xs: "100%", sm: 250 },
                height : { xs : "100%" },
                display: 'flex',
                flexDirection: 'column',
              }}>
                <Box sx={{ flexGrow: 1}}>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    }}>
                    <Typography variant="h6" noWrap component="h6" sx={{ flexGrow:1, textAlign: "left", textTransform: "none"}}>
                      {goalResult.title}
                    </Typography>
                    <Chip label={goalTypeValue(goalResult.type ?? "")} />
                  </Box>
                  <Typography variant="subtitle2" noWrap component="div" sx={{ textAlign: "left", textTransform: "none", height: 20}}>
                    {` ${goalResult.note}`}
                  </Typography>
                  <GoalAchives goalResultId={goalResult.id!} goalAchives={goalResult?.goalAchives} goalCount={goalSheetAndDtil.goals.length} />
                </Box>
                <Box sx={{ flexGrow: 0}}>
                  <Typography variant="caption" noWrap display="block" sx={{ textAlign: "right", textTransform: "none"}}>
                    {"最終更新日:"}{goalResult.modifiedAt?.toLocaleString("ja-JP") ?? ""}
                  </Typography>
                </Box>
              </Box>
            </Button>
            );
          })}
        </Box>
        <Box>
          <Button variant="contained"
            fullWidth
            onClick={addGoalResult}
            sx={{
              my:2,
              p:1,
              height : { xs : 50 },
              display: { xs: 'none', sm: 'flex' },
            }}>
            結果を追加
          </Button>
        </Box>
        <InputTitleDialog
          title={titleDialogProps.props.title}
          open={titleDialogProps.props.open}
          label={titleDialogProps.props.label}
          defaultValue={titleDialogProps.props.defaultValue}
          error={titleDialogProps.props.error}
          message={titleDialogProps.props.message}
          onClose={onClose}
        />
        <InputGoalResultDialog
          title={goalResultDialogProps.props.title}
          open={goalResultDialogProps.props.open}
          inputGoalResult={goalResultDialogProps.props.inputGoalResult}
          goalCount={goalResultDialogProps.props.goalCount}
          onClose={onCloseResultDialog}
        />
        <SpeedDial
          ariaLabel="追加"
          sx={{ position: 'absolute', bottom: 16, right: 16, display:{xs: "flex", sm: "none"} }}
          onClose={handleSpeedDialogClose}
          onOpen={handleSpeedDialogOpen}
          open={speedDialogOpen}
          icon={<SpeedDialIcon />}
          direction="up"
        >
          <SpeedDialAction
            key="goal_add"
            icon={<EditIcon />}
            onClick={addGoalResult}
            tooltipTitle={"結果を追加"}
            tooltipOpen
          />
          <SpeedDialAction
            key="result_add"
            icon={<EditIcon />}
            onClick={addGoal}
            tooltipTitle={"目標を追加"}
            tooltipOpen
          />
      </SpeedDial>
      </Container>
    );
  } else {
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
    </Container>
    );
  }
}




