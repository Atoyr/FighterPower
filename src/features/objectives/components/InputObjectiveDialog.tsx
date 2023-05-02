import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { InputDialogErrorState } from '../stores';

export type InputObjectiveDialogProps = {
  open: boolean;
  onClose: (objectiveTitle: string, objectiveMemo: string) => void;
  onCancel: () => void;
}

export const InputObjectiveDialog = (props: InputObjectiveDialogProps) => {

  const [ error, setError] = useState("");
  const { open, onClose, onCancel } = props;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const objectiveTitle = formData.get('objective_title') as string;
    const objectiveMemo = formData.get('objective_memo') as string;

    if ( objectiveTitle == "") {
      setError("空白です");
      return;
    }

    await onClose(objectiveTitle, objectiveMemo);
  };

  const handleCancel = async () => {
    setError("");
    await onCancel();
  };

  return (
    <Dialog open={open} onClose={handleCancel} >
      <DialogTitle>目標を追加</DialogTitle>
      <form onSubmit={handleSubmit}>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="objective_title"
          id="objective_title"
          label="目標"
          error={error !== null && error !== ""}
          helperText={error ?? ""}
          type="text"
          fullWidth
          variant="standard"
          />
        <TextField
          margin="dense"
          name="objective_memo"
          id="objective_memo"
          label="メモ"
          type="text"
          fullWidth
          variant="standard"
          />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>キャンセル</Button>
        <Button type="submit">決定</Button>
      </DialogActions>
      </form>
    </Dialog> 
  );
}

