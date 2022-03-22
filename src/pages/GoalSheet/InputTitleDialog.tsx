import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export interface InputTitleDialogProps {
  title: string;
  label: string;
  open: boolean;
  error: boolean;
  defaultValue: string;
  message: string;
  onClose: (value: string, isCancel: boolean) => void;
}

export function newInputTitleDialogProps() : InputTitleDialogProps {
  return {
    title: "",
    label: "",
    open: false,
    error: false,
    defaultValue: "",
    message: "",
    onClose: () => {}
  };
}

export function InputTitleDialog(props: InputTitleDialogProps) {
  const { 
    title,
    label,
    open,
    error,
    defaultValue,
    message,
    onClose 
  } = props;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let v = formData.get('value') as string;
    await onClose(v, false);
  };

  const handleCancel = async () => {
    await onClose("", true);
  };

  return (
    <Dialog open={open} onClose={handleCancel} >
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit}>
      <DialogContent>
        <DialogContentText>
        </DialogContentText>
        <TextField
          autoFocus
          error={error}
          helperText={message}
          margin="dense"
          name="value"
          id="value"
          label={label}
          type="text"
          fullWidth
          variant="standard"
          defaultValue={defaultValue}
          />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" fullWidth onClick={handleCancel}>キャンセル</Button>
        <Button variant="contained" fullWidth type="submit">決定</Button>
      </DialogActions>
      </form>
    </Dialog> 
  );
}


