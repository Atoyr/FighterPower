import { useEffect, useState } from 'react';

import { 
  TextField, 
  Typography, 
  } from '@mui/material';

import { StarRating } from '@/components/Rating';

import { rankRatingLabels } from '../constants';

export type InputKeyResultProps = {
  title: string;
  rank: number;
  memo: string;
  onChangeTitle?: (newValue: string) => void; 
  onChangeRank?: (newValue: number) => void;
  onChangeMemo?: (newValue: string) => void;
  readOnly: boolean;
}

export const InputKeyResult = ({
  title, 
  rank, 
  memo, 
  onChangeTitle, 
  onChangeRank, 
  onChangeMemo, 
  readOnly
}: InputKeyResultProps) => {

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
      InputProps={{
            readOnly: readOnly ?? false, 
          }}
      onChange={(event) => { 
        // HACK 
        if (onChangeTitle) {
          onChangeTitle(event.target.value);
        }
      }}
      />
    <StarRating
      value={rank} 
      onChange={(newValue) => {
        // HACK 
        if (onChangeRank) {
          onChangeRank(newValue);
        }
      }}
      readOnly={readOnly ?? false}
      labels={rankRatingLabels}
      sx={{my: 1}}/>
    <TextField
      name="key_result_memo"
      id="key_result_memo"
      label="メモ"
      value={memo}
      type="text"
      fullWidth
      multiline
      InputProps={{
            readOnly: readOnly ?? false, 
          }}
      maxRows={8}
      onChange={(event) => { 
        // HACK 
        if (onChangeMemo) {
          onChangeMemo(event.target.value);
        }
      }}
      />
  </>
  );
};
