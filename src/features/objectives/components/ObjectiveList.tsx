import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from "react-router-dom";

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

import { authState } from '@/stores';

import { InputDialogOpenState } from '../stores';
import { createObjective } from '../functions';
import { 
  setObjective, 
  setKeyResult, 
} from '../api';
import { InputObjectiveDialog } from './InputObjectiveDialog';


export const ObjectiveList = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);

  const [ openDialog, setOpenDialog] = useRecoilState(InputDialogOpenState);
  const resetOpenDialog = useResetRecoilState(InputDialogOpenState);

  const onClose = async (objectiveTitle:string, objectiveMemo:string, isCancel: boolean) => {
    if (!isCancel)
    {
      const objective = createObjective(objectiveTitle, objectiveMemo);
      // TODO Catch exception
      const result = await setObjective(auth.user.uid!, objective);
      if (result.isSuccess())
      {
        navigate(`/app/objectives/${result.value}`);
        resetOpenDialog();
        return;
      }
    }
    resetOpenDialog();
  }

  const openInputDialog = () => {
    setOpenDialog(true);
  };

  return (
    <Container maxWidth="xl" 
    sx={{
      mt: { xs: 1, sm: 10 }
    }}>
    <h2>目標シート</h2>
    <Box sx={{mb: 1}}>
      <Button variant="contained" fullWidth onClick={openInputDialog}
        sx={{
          m: { xs: 0, sm: 1 },
          mt: { xs: 1 },
          p:1,
          width: { xs: "100%", sm: 250 },
          height : { xs : 50, sm: 150 }
        }}>
        目標シートを追加
      </Button>

    </Box>

    <InputObjectiveDialog
      open={openDialog}
      onClose={onClose}
    />
  </Container>
  );
}

