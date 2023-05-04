import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { 
  Button, 
  Container, 
  TextField, 
  Typography, 
  } from '@mui/material';

import { Loading } from '@/components/Loading';
import { useAuth } from '@/hooks';
import { MainContainerStyle } from '@/styles';

import { RankRating } from '../components';
import { useObjectiveKeyResults } from '../hooks';
import { ObjectiveKeyResultsState } from '../stores';

export const KeyResult = () => {
  const { objectiveId } = useParams<"objectiveId">();
  const { keyResultId } = useParams<"keyResultId">();
  const navigate = useNavigate();
  const authState = useAuth();

  const objectiveKeyResultsStore = useRecoilValue(ObjectiveKeyResultsState);
  const [ objectiveVersion, setObjectiveVersion ] = useState(objectiveKeyResultsStore?.version ?? 0);
  const [ keyResultTitle, setKeyResultTitle] = useState("");
  const [ keyResultRank, setKeyResultRank] = useState(3);
  const [ keyResultMemo, setKeyResultMemo] = useState("");

  const objectiveKeyResults = useObjectiveKeyResults(authState.user.uid, objectiveId, objectiveVersion);
  // TODO objectiveIdのvalidate

  if (objectiveKeyResults === null) {
    // Loading
      return (
      <Container maxWidth="xl" sx={MainContainerStyle}>
        <Loading />
      </Container>);
  } else if (objectiveKeyResults.objective === null) {
    // Objectiveが取得できない場合
    return (
      <Container maxWidth="xl" sx={MainContainerStyle}>
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
      </Container>);
  } else if (keyResultId === "new") {

    return (
      <Container maxWidth="xl" sx={MainContainerStyle}>
        <Typography variant="h3" noWrap component="h3">
        {objectiveKeyResults.objective.title}
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          name="key_result_title"
          id="key_result_title"
          label="目標 (達成したいこと・なりたい姿)"
          type="text"
          fullWidth
          variant="standard"
          onChange={(event) => setKeyResultTitle(event.target.value)}
          />
        <RankRating defaultValue={keyResultRank} onSave={(newValue) => setKeyResultRank(newValue)} sx={{my: 1}}/>
        <TextField
          name="key_result_memo"
          id="key_result_memo"
          label="メモ"
          type="text"
          fullWidth
          multiline
          maxRows={8}
          onChange={(event) => setKeyResultMemo(event.target.value)}
          />
        <Button onClick={() => {navigate(`/app/objectives/${objectiveId}`);}}>決定</Button>
        <Button onClick={() => {return;}}>キャンセル</Button>
      </Container>);
  } else if (!objectiveKeyResults.keyResults.find((kr) => kr.id === keyResultId)) {
    // KeyResultが存在しない場合

  } else if (objectiveKeyResults.objective.status === "open") {
    // 編集可
    return (
      <>
        <h2>{objectiveId}</h2>
        <h2>{keyResultId}</h2>
        <h2>編集OK</h2>
      </>);
  } else {
    // readonly
    return (
      <>
        <h2>{objectiveId}</h2>
        <h2>{keyResultId}</h2>
        <h2>readonly</h2>
      </>);
  }
};

