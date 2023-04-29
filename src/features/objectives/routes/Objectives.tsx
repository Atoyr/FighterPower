import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { authState } from '@/stores';

import { getObjectives, setObjective } from '../api';
import { InputObjectiveDialog, ObjectiveCard } from '../components';
import { createObjective } from '../functions';
import { useObjectives } from '../hooks';
import { Objective } from '../types';
import { InputDialogOpenState } from '../stores';

export const Objectives = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);

  const [ openDialog, setOpenDialog] = useRecoilState(InputDialogOpenState);
  const resetOpenDialog = useResetRecoilState(InputDialogOpenState);
  const objectives = useObjectives(auth.user.uid);

  const onClose = async (objectiveTitle:string, objectiveMemo:string, isCancel: boolean) => {
    if (!isCancel)
    {
      const objective = createObjective(objectiveTitle, objectiveMemo);
      const result = await setObjective(auth.user.uid!, objective);
      if (result.isSuccess())
      {
        navigate(result.value);
        resetOpenDialog();
        return;
      } else {
        // TODO Exception 
      }
    }
    resetOpenDialog();
  }

  const openInputDialog = () => {
    setOpenDialog(true);
  };

  return (
    <Container maxWidth="xl" 
    sx={{ mt: { xs: 1, sm: 10 } }}>
    <Typography variant="h3" component="div" gutterBottom >
    目標一覧
    </Typography>
    <Box sx={{mb: 1}}>
      <Button variant="contained" fullWidth onClick={openInputDialog}
        sx={{
          m: { xs: 0, sm: 1 },
          mt: { xs: 1 },
          p:1,
          width: { xs: "100%", sm: 250 },
          height : { xs : 50, sm: 150 }
        }}>
        目標を追加
      </Button>
      { objectives ? 
      objectives.map((objective) => {
        const href = `${objective.id}`;
        return (
          <ObjectiveCard 
            key={objective.id}
            title={objective.title} 
            createAt={objective.createAt} 
            modifiedAt={objective.modifiedAt}
            onClick={() => navigate(href)} />
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
    <InputObjectiveDialog
      open={openDialog}
      onClose={onClose}
    />
  </Container>
  );
}

