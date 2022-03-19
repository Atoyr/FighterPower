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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useGoalResultDialogOpen } from './useGoalResultDialogOpen';

import { GoalResult, newGoalResult } from 'data/goalResult';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface InputGoalResultDialogProp {
  title: string;
  open: boolean;
  inputGoalResult: GoalResult | null,
  goalCount: number,
  order: number,
  onClose: (value: GoalResult | null, isCancel: boolean) => void;
}

export function InputGoalResultDialog(props: InputGoalResultDialogProp) {
  const { title, open, inputGoalResult, goalCount, onClose } = props;
  const [alignment, setAlignment] = React.useState('battle');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  const goals:string[] = [];
  for (var i = 0; i < goalCount; i++) {
    if (inputGoalResult != null && inputGoalResult.goalAchives && inputGoalResult.goalAchives[i]) {
      goals.push(inputGoalResult.goalAchives[i])
    } else {
      goals.push("");
    }
  }
  

  const handleClickOpen = async () => {
    const goalResult = (inputGoalResult == null) ?
    newGoalResult("",0,"")
    :{
      ...inputGoalResult,
    } as GoalResult;
    await onClose(goalResult, false);
  };

  const handleClose = async () => {
    await onClose(null, true);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            保存
          </Button>
        </Toolbar>
      </AppBar>
      <Box 
      sx={{
        textAlign: "left",
        mx: 2,
      }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: 'row',
            textAlign: "center",
          }}>
          <TextField
            autoFocus
            margin="dense"
            name="value"
            id="value"
            label="タイトル"
            type="text"
            variant="standard"
            sx={{
              flexGrow: 1
            }}
            />
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            sx={{
              m: 1,
              flexGrow: 0
            }}>
              <ToggleButton value="battle">実戦</ToggleButton>
            <ToggleButton value="training">トレモ</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box
          sx={{
            textAlign: "left",
            mt: 2,
            display: "flex",
            flexDirection: 'column',
          }}>
            { goals.map((goal, index) => {
            return (
            <FormControl>
              <FormLabel id={`goal${index + 1}`}>目標{index + 1}</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="female" control={<Radio />} label="成功" />
                <FormControlLabel value="male" control={<Radio />} label="失敗" />
                <FormControlLabel value="other" control={<Radio />} label="意識外" />
                <FormControlLabel value="no" control={<Radio />} label="機会無" />
              </RadioGroup>
            </FormControl>
            );})}
        </Box>
        <Box
          sx={{
            textAlign: "left",
            mt: 2,
          }}>
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={2}
            defaultValue="Default Value"
            sx={{ width: "100%" }}
          />
        </Box>
      </Box>
    </Dialog>
  );
};

