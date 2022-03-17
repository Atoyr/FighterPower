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
import { newGoal } from 'data/goal';
import { newGoalResult } from 'data/goalResult';
import { useGoalSheets } from 'hook/useGoalSheets';
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let v = formData.get('value') as string;
    await onClose(v, false);
  };

  const handleCancel = async () => {
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
  const [dialogProp, setDialogProp] = React.useState<{title: string, label: string, selectedValue: string }>({title: "", label: "", selectedValue:""});

  const onClose = async (value:string, isCancel: boolean) => {
    if (!isCancel)
    {
      let id = userContext.id as string;
      let gs = newGoalSheet(value, "");
      let result = await setGoalSheet(id, gs);
      if (result.isSuccess())
      {
        navigate(`../goalsheet/${result.value}`);
      }
    }
    setIsOpenDialog(false);
  }
  const addGoalSheet = () => {
    let dialogTitle = "目標";
    let selectedValue = "";
    setDialogProp({ title: dialogTitle, selectedValue: selectedValue, label: ""})
    setIsOpenDialog(true);
  };

  return (
    <Container maxWidth="xl" 
    sx={{
      mt: { xs: 1, sm: 10 }
    }}>
    <h2>目標シート</h2>
    <Box>
      <Button variant="outlined" fullWidth onClick={addGoalSheet}
        sx={{
          m:1,
          p:1,
          width: { sm: 250 },
          height : { xs : 50, sm: 150 }
        }}>
        目標シートを追加
      </Button>

      { goalSheets ? 
      goalSheets.map((goalSheet) => {
        const href = `../goalsheet/${goalSheet.id}`;
        return (
        <Button variant="outlined" fullWidth onClick={() => navigate(href)} key={goalSheet.id}
          sx={{
            m:1,
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
              <Typography variant="h6" noWrap component="h6" sx={{ textAlign: "left"}}>
                {goalSheet.title}
              </Typography>
              <Typography variant="subtitle2" noWrap component="div" sx={{ textAlign: "left"}}>
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

    <InputDialog
      title={dialogProp.title}
      open={isOpenDialog}
      label={dialogProp.label}
      selectedValue={dialogProp.selectedValue}
      onClose={onClose}
    />
  </Container>
  );
}
