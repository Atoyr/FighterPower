import { useState } from 'react';

import { 
  TextField, 
  Typography, 
  } from '@mui/material';

import { RankRating } from '../components';

export type InputKeyResultProps = {
  title: string;
  rank: number;
  memo: string;
  onChangeTitle?: (newValue: string) => void; 
  onChangeRank?: (newValue: number) => void;
  onChangeMemo?: (newValue: string) => void;
}

export const InputKeyResult = (props: InputKeyResultProps) => {

  const [ title, setTitle] = useState(props?.title ?? "");

  const [ rank, setRank] = useState<number>(props?.rank ?? 3);
  const [ memo, setMemo] = useState(props?.memo ?? "");

  return(
  <>
    <TextField
      autoFocus
      margin="dense"
      name="key_result_title"
      id="key_result_title"
      label="目標に向けてやること (指標)"
      value={title}
      type="text"
      fullWidth
      variant="standard"
      onChange={(event) => { 
        setTitle(event.target.value)
        if (props.onChangeTitle) {
          props.onChangeTitle(title);
        }
      }}
      />
    <RankRating 
      defaultValue={rank} 
      onChange={(newValue) => {
        setRank(newValue);
        if (props.onChangeRank) {
          props.onChangeRank(newValue);
        }
      }}
      sx={{my: 1}}/>
    <TextField
      name="key_result_memo"
      id="key_result_memo"
      label="メモ"
      value={memo}
      type="text"
      fullWidth
      multiline
      maxRows={8}
      onChange={(event) => { 
        setMemo(event.target.value)
        if (props.onChangeMemo) {
          props.onChangeMemo(memo);
        }
      }}
      />
  </>
  );
};
