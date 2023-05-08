import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';

import { 
  Button, 
  Container, 
  TextField, 
  Typography, 
  } from '@mui/material';

import { useAuth } from '@/hooks';
import { MainContainerStyle } from '@/styles';

import { getKeyResult, getObjective, setKeyResult } from '../api';
import { InputKeyResult, KeyResultNotFound, ObjectiveNotFound } from '../components';
import { createKeyResult } from '../functions';

export const Archive = () => {
  const { objectiveId } = useParams<"objectiveId">();
  const { archiveId } = useParams<"archiveId">();
  const navigate = useNavigate();
  const authState = useAuth();

  return (
    <Container maxWidth="xl" sx={MainContainerStyle}>
      <Typography variant="h3" noWrap component="h3">
      {objectiveId}
      {archiveId}
      </Typography>
    </Container>
      );
};
