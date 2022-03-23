import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useAuthContext } from 'context/AuthProvider'
import { useUserContext } from 'context/UserProvider'
import { setGoalSheet, newGoalSheet } from 'data/goalSheet';
import { setGoal, newGoal } from 'data/goal';
import { newGoalResult } from 'data/goalResult';
import { useGoalSheets } from 'hook/useGoalSheets';
import { useDocumentTitle } from 'hook/useDocumentTitle'


export interface InputGoalSheetDialogProps {
  open: boolean;
  onClose: (goalSheetTitle: string, goalTitle: string, isCancel: boolean) => void;
}

function InputGoalSheetDialog(props: InputGoalSheetDialogProps) {
  const [ errorProps, setErrorProps] = React.useState<{sheetTitleError: boolean, goalTitleError: boolean, sheetMessage: string, goalMessage: string }>({sheetTitleError: false, goalTitleError: false, sheetMessage: "", goalMessage: ""} );
  const { onClose, open} = props;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorProps({sheetTitleError: false, goalTitleError: false, sheetMessage: "", goalMessage: ""} );

    const formData = new FormData(event.currentTarget);
    const goalSheetTitle = formData.get('goal_sheet_title') as string;
    const goalTitle = formData.get('goal_title') as string;
    let ste = false;
    let sm = "";
    let gte = false;
    let gm = "";

    if ( goalSheetTitle == "") {
      ste = true;
      sm = "空白です";
    }
    if ( goalTitle == "") {
      gte = true;
      gm = "空白です";
    }
    setErrorProps({sheetTitleError: ste, goalTitleError: gte, sheetMessage: sm, goalMessage: gm} );
    if ( ste || gte ) {
      return;
    }
    await onClose(goalSheetTitle, goalTitle, false);
  };

  const handleCancel = async () => {
    setErrorProps({sheetTitleError: false, goalTitleError: false, sheetMessage: "", goalMessage: ""} );
    await onClose("", "", true);
  };

  return (
    <Dialog open={open} onClose={handleCancel} >
      <DialogTitle>目標を追加</DialogTitle>
      <form onSubmit={handleSubmit}>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="goal_sheet_title"
          id="goal_sheet_title"
          label="目標シート タイトル"
          error={errorProps.sheetTitleError}
          helperText={errorProps.sheetMessage}
          type="text"
          fullWidth
          variant="standard"
          />
        <TextField
          margin="dense"
          name="goal_title"
          id="goal_title"
          label="目標1"
          error={errorProps.goalTitleError}
          helperText={errorProps.goalMessage}
          type="text"
          fullWidth
          variant="standard"
          />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>キャンセル</Button>
        <Button type="submit">決定</Button>
      </DialogActions>
      </form>
    </Dialog> 
  );
}


export default function Home() {
  let authContext = useAuthContext();
  let navigate = useNavigate();
  let userContext = useUserContext();
  let goalSheets = useGoalSheets(userContext?.id ?? "");
  const displayName = userContext ? userContext.displayName : "";
  useDocumentTitle("Home");

  const [isOpenDialog, setIsOpenDialog] = React.useState<boolean>(false);

  const onClose = async (goalSheetTitle:string, goalTitle:string, isCancel: boolean) => {
    if (!isCancel)
    {
      const gs = newGoalSheet(goalSheetTitle, "");
      const result = await setGoalSheet(userContext.id!, gs);
      if (result.isSuccess())
      {
        await setGoal(userContext.id!, result.value as string, newGoal(goalTitle, 1));
        navigate(`/goalsheet/${result.value}`);
      }
    }
    setIsOpenDialog(false);
  }

  const addGoalSheet = () => {
    setIsOpenDialog(true);
  };

  return (
    <Container maxWidth="xl" 
    sx={{
      mt: { xs: 1, sm: 10 }
    }}>
    <h2>目標シート</h2>
    <Box sx={{mb: 1}}>
      <Button variant="contained" fullWidth onClick={addGoalSheet}
        sx={{
          m: { xs: 0, sm: 1 },
          mt: { xs: 1 },
          p:1,
          width: { xs: "100%", sm: 250 },
          height : { xs : 50, sm: 150 }
        }}>
        目標シートを追加
      </Button>

      { goalSheets ? 
      goalSheets.map((goalSheet) => {
        const href = `/goalsheet/${goalSheet.id}`;
        return (
        <Button variant="outlined" fullWidth onClick={() => navigate(href)} key={goalSheet.id}
          sx={{
            m: { xs: 0, sm: 1 },
            mt: { xs: 1 },
            p:1,
            width: { sm: 250 },
            height : { xs : 150 },
          }}>
          <Box
          sx={{
            p:1,
            width: { xs: "100%", sm: 250 },
            height : { xs : "100%" },
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Box sx={{ flexGrow: 1}}>
              <Typography variant="h6" noWrap component="h6" sx={{ textAlign: "left", textTransform: "none"}}>
                {goalSheet.title}
              </Typography>
              <Typography variant="subtitle2" noWrap component="div" sx={{ textAlign: "left", textTransform: "none"}}>
                {goalSheet.note}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 0}}>
              <Typography variant="caption" noWrap display="block" sx={{ textAlign: "right"}}>
                {"作成日:"}{goalSheet.createdAt?.toLocaleString("ja-JP") ?? ""}
              </Typography>
              <Typography variant="caption" noWrap display="block" sx={{ textAlign: "right"}}>
                {"最終更新日:"}{goalSheet.modifiedAt?.toLocaleString("ja-JP") ?? ""}
              </Typography>
            </Box>
          </Box>
        </Button>
        );
      })
      : 
      <Stack spacing={1}>
        <Skeleton variant="text" />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={118} />
      </Stack>
      }
    </Box>

    <InputGoalSheetDialog
      open={isOpenDialog}
      onClose={onClose}
    />
  </Container>
  );
}
