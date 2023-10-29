import { useEffect, useState } from 'react';

import { 
  Box, 
  TextField, 
  Typography, 
  } from '@mui/material';

import { StarRating } from '@/components/Rating';
import { HelpTooltip } from '@/components/Tooltip';

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
    <Box sx={{
    display: 'flex',
    flexDirection: 'row',}} >
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
      <HelpTooltip title="クリア条件 D: 成功率50% C: 成功率60% B: 成功率70% A: 成功率80% S: 成功率90% " />

    </Box>
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
