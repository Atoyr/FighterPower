import { useState } from "react";
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

import { useAuth } from '@/hooks';

import { getObjectives, setObjective } from '../api';
import { InputObjectiveDialog, ObjectiveCard } from '../components';
import { createObjective } from '../functions';
import { useObjectives } from '../hooks';
import { Objective } from '../types';
import { InputDialogOpenState } from '../stores';
import { CARD_WIDTH, CARD_HEIGHT, OBJECTIVE_BUTTON_HEIGHT } from '../styles';

export const Objectives = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [ openDialog, setOpenDialog] = useState(false);
  const objectives = useObjectives(auth.user.uid);

  const onClose = async (objectiveTitle:string, objectiveMemo:string) => {
    const objective = createObjective(objectiveTitle, objectiveMemo);
    const result = await setObjective(auth.user.uid!, objective);
    if (result.isSuccess())
    {
      navigate(result.value);
    } else {
      // TODO Exception 
      console.log(result.value);
    }
    setOpenDialog(false);
  }
  const onCancel = async () => {
    setOpenDialog(false);
  }

  const openInputDialog = () => {
    setOpenDialog(true);
  };

  return (
    <Container maxWidth="xl" 
    sx={{ mt: { xs: 1, sm: 1 } }}>
    <Typography variant="h3" component="div" gutterBottom >
    目標一覧
    </Typography>
    <Box sx={{mb: 1}} display="flex" flexDirection="row" flexWrap="wrap">
      <Button variant="contained" fullWidth onClick={openInputDialog}
        sx={{
          m: { xs: 0, sm: 1 },
          mt: { xs: 1 },
          p:1,
          width: CARD_WIDTH, 
          minWidth: CARD_WIDTH, 
          height : OBJECTIVE_BUTTON_HEIGHT, 
        }}>
        目標を追加
      </Button>
      { objectives ? 
      objectives.map((objective) => {
        const href = `${objective.id}`;
        return (
          <ObjectiveCard 
            sx={{
              m: { xs: 0, sm: 1 },
              mt: { xs: 1 },
            }}
            key={objective.id}
            title={objective.title} 
            createAt={objective.createdAt} 
            modifiedAt={objective.modifiedAt}
            onClick={() => navigate(href)} />
        );
      })
      : 
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width={250} height={150} />
      </Stack>
      }
    </Box>
    <InputObjectiveDialog
      open={openDialog}
      onClose={onClose}
      onCancel={onCancel}
    />
  </Container>
  );
}

