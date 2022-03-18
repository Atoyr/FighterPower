import React from 'react';
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

import { useParams } from 'react-router-dom';
import { useUserContext } from 'context/UserProvider';
import { useGoalSheetAndDtil } from 'hook/useGoalSheetAndDtil';
import { newGoal, setGoal } from 'data/goal';
import { setGoalSheet } from 'data/goalSheet';
import { useDocumentTitle } from 'hook/useDocumentTitle'

export interface InputDialogProps {
  title: string;
  open: boolean;
  label: string;
  selectedValue: string;
  onClose: (value: string, isCancel: boolean) => void;
}

function InputDialog(props: InputDialogProps) {
  const { onClose, selectedValue, open, title, label } = props;
  const [isDialogTextError, setIsDialogTextError] = React.useState<{error:boolean, errorLabel: string}>({error: false, errorLabel: ""});
  isDialogTextError 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let v = formData.get('value') as string;
    if ( v == "") {
      setIsDialogTextError({ error: true, errorLabel: "入力値が空です"})
      return;
    }
    setIsDialogTextError({ error: false, errorLabel: ""})
    await onClose(v, false);
  };

  const handleCancel = async () => {
    setIsDialogTextError({ error: false, errorLabel: ""})
    await onClose("", true);
  };

  return (
    <Dialog open={open} onClose={handleCancel} >
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit}>
      <DialogContent>
        <DialogContentText>
        </DialogContentText>
        <TextField
          autoFocus
          error={isDialogTextError.error}
          helperText={isDialogTextError.errorLabel}
          margin="dense"
          name="value"
          id="value"
          label={label}
          type="text"
          fullWidth
          variant="standard"
          defaultValue={selectedValue}
          />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" fullWidth onClick={handleCancel}>キャンセル</Button>
        <Button variant="contained" fullWidth type="submit">決定</Button>
      </DialogActions>
      </form>
    </Dialog> 
  );
}

export default function GoalSheet() {
  useDocumentTitle("GoalSheet");
  const [isOpenDialog, setIsOpenDialog] = React.useState<boolean>(false);
  const [dialogProp, setDialogProp] = React.useState<{type:string, index: number, title: string, label: string, selectedValue: string }>({type:"", index: 0, title: "", label: "", selectedValue:""});
  let userContext = useUserContext();

  let { id } = useParams<"id">();
  const goalSheetId = id ?? "";
  let goalSheetAndDtil = useGoalSheetAndDtil(userContext.id ?? "", goalSheetId);

  const onClose = async (value:string, isCancel: boolean) => {
    if (!isCancel)
    {
      switch(dialogProp.type) {
        case "addgoal" :
          let g = newGoal(value, goalSheetAndDtil.goals.length+1);
          await setGoal(userContext.id!, goalSheetId, g);
          goalSheetAndDtil.goals.push(g);
          break;
        case "editgoal" :
          goalSheetAndDtil.goals[dialogProp.index].title = value;
          await setGoal(userContext.id!, goalSheetId, goalSheetAndDtil.goals[dialogProp.index]);
          break;
        case "edittitle" :
          goalSheetAndDtil.goalSheet!.title = value;
          await setGoalSheet(userContext.id!, goalSheetAndDtil.goalSheet!);
          goalSheetAndDtil.goalSheet!.version = goalSheetAndDtil.goalSheet!.version + 1;
          break;
      }
    }
    setIsOpenDialog(false);
  }
  
  const addGoal = () => {
    const index = goalSheetAndDtil.goals.length + 1;
    let dialogTitle = `目標 ${index}`;
    let selectedValue = "";
    setDialogProp({ type: "addgoal", index:index, title: dialogTitle, selectedValue: selectedValue, label: ""})
    setIsOpenDialog(true);
  }

  const editGoal = (index: number) => {
    let dialogTitle = `目標 ${index + 1}`
    let selectedValue = goalSheetAndDtil.goals[index].title;
    setDialogProp({ type: "editgoal", index:index, title: dialogTitle, selectedValue: selectedValue, label: ""})
    setIsOpenDialog(true);
  }

  const editTitle = () => {
    let dialogTitle = "タイトル";
    let selectedValue = goalSheetAndDtil.goalSheet?.title ?? "";
    setDialogProp({ type: "edittitle", index:0, title: dialogTitle, selectedValue: selectedValue, label: ""})
    setIsOpenDialog(true);
  }

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
              height : { xs : 50 }
            }}>
            目標を追加
          </Button>
        </Box>
        <Box>
          { goalSheetAndDtil.goalResults.map((goalResult, index) => {

            return (
            <Button variant="outlined" fullWidth 
              key={goalResult.id}
              sx={{
                m:1,
                p:1,
                width: { sm: 250 },
                height : { xs : 200 },
              }}>
              {goalResult.title}
            </Button>
            );
          })}
        </Box>
        <InputDialog
          title={dialogProp.title}
          open={isOpenDialog}
          label={dialogProp.label}
          selectedValue={dialogProp.selectedValue}
          onClose={onClose}
        />
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

