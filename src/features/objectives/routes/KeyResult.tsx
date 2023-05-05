import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { 
  Button, 
  Container, 
  TextField, 
  Typography, 
  } from '@mui/material';

import { Loading } from '@/components/Loading';
import { useAuth } from '@/hooks';
import { MainContainerStyle } from '@/styles';

import { setKeyResult } from '../api';
import { 
  InputKeyResult, 
  KeyResultNotFound, 
  ObjectiveNotFound, 
  } from '../components';
import { createKeyResult } from '../functions';
import { useObjective, useKeyResult } from '../hooks';
import { ObjectiveKeyResultsState } from '../stores';

export const KeyResult = () => {
  const { objectiveId } = useParams<"objectiveId">();
  const { keyResultId } = useParams<"keyResultId">();
  const navigate = useNavigate();
  const authState = useAuth();

  const objectiveState = useObjective(authState.user.uid, objectiveId);
  const keyResultState = keyResultId === "new" ? {isLoading: false, value: null} : useKeyResult(authState.user.uid, objectiveId, keyResultId);

  const [ keyResultTitle, setKeyResultTitle] = useState(keyResultState.value?.title ?? "");
  const [ keyResultRank, setKeyResultRank] = useState(keyResultState.value?.rank ?? 3);
  const [ keyResultMemo, setKeyResultMemo] = useState(keyResultState.value?.memo ?? "");
  const [ isEdit, setIsEdit] = useState(false);

  const onSave = async () => {
    const keyResult = keyResultState.value ?? createKeyResult();
    keyResult.title = keyResultTitle;
    keyResult.rank = keyResultRank;
    keyResult.memo = keyResultMemo;
    const result = await setKeyResult(authState.user.uid, objectiveId, keyResult);
    if(result.isSuccess()) { 
      navigate(`../${objectiveId}`);
    } else {
      // TODO Error
      console.log(result.value);
    }
  };

  const onCancel = () => {
    setKeyResultTitle(keyResultState.value?.title ?? "");
    setKeyResultRank(keyResultState.value?.rank ?? 3);
    setKeyResultMemo(keyResultState.value?.memo ?? "")
  }

  if (objectiveState.isLoading || keyResultState.isLoading) {
    // Loading
      return (
      <Container maxWidth="xl" sx={MainContainerStyle}>
        <Loading />
      </Container>);
  } else if (objectiveState.value === null) {
    // Objectiveが取得できない場合
    return (
      <Container maxWidth="xl" sx={MainContainerStyle}>
        <ObjectiveNotFound />
      </Container>);
  } else if (keyResultId !== "new" && keyResultState.value === null ) {
    return (
      <Container maxWidth="xl" sx={MainContainerStyle}>
        <KeyResultNotFound />
      </Container>);
  } else {
    const readOnly = objectiveState.status ?? "open" !== "open";

    return (
      <Container maxWidth="xl" sx={MainContainerStyle}>
        <Typography variant="h3" noWrap component="h3">
        {objectiveState.value.title}
        </Typography>
        <InputKeyResult 
          title={keyResultTitle}
          rank={keyResultRank}
          memo={keyResultMemo}
          onChangeTitle={(newValue) => setKeyResultTitle(newValue)}
          onChangeMemo={(newValue) => setKeyResultMemo(newValue)}
          onChangeRank={(newValue) => setKeyResultRank(newValue)}
          readOnly={readOnly}
        />
        <Button onClick={onSave}>決定</Button>
        <Button onClick={onCancel}>キャンセル</Button>
      </Container>);
  }
};

