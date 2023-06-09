import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from 'react-query';

import {
  Button, 
  Box, 
  Container, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  Stack, 
  Skeleton, 
  TextField, 
  Typography } from '@mui/material';

import { BreadcrumbsSetter } from '@/components/Breadcrumbs';
import { Title } from '@/components/Title';
import { useAuth } from '@/hooks';

import { getObjectives, setObjective } from '../api';
import { InputObjectiveDialog, ObjectiveCard } from '../components';
import { createObjective } from '../functions';
import { Objective } from '../types';
import { CARD_WIDTH, CARD_HEIGHT, OBJECTIVE_BUTTON_HEIGHT } from '../styles';

export const Objectives = () => {
  const navigate = useNavigate();
  const authState = useAuth();

  const [ openDialog, setOpenDialog] = useState(false);
  const { data: objectives } = useQuery([ "objectives", authState.user.uid], () => getObjectives(authState.user.uid));
  const { mutate: createObjectiveMutate } = useMutation(({userId, objective}) => setObjective(userId, objective), {
    onSuccess: (id) => {
      navigate(id);
      setOpenDialog(false);
    }});

  const breadcrumbs = [
    { path: '/app/objectives', name: '目標一覧' },
  ];

  const onClose = (objectiveTitle:string, objectiveMemo:string) => {
    const objective = createObjective(objectiveTitle, objectiveMemo);
    createObjectiveMutate({userId: authState.user.uid!, objective: objective})
  }
  const onCancel = async () => {
    setOpenDialog(false);
  }

  const openInputDialog = () => {
    setOpenDialog(true);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: { xs: 1, sm: 1 } }}>
      <Title title="目標一覧" />
      <BreadcrumbsSetter breadcrumbs={breadcrumbs} />
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
            status={objective.status}
            createdAt={objective.createdAt} 
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

