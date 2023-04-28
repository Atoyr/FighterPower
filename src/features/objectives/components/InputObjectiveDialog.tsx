import { useRecoilState, useResetRecoilState } from 'recoil';

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
  onClose: (objectiveTitle: string, objectiveMemo: string, isCancel: boolean) => void;
}

export const InputObjectiveDialog = (props: InputObjectiveDialogProps) => {

  const [ errorProps, setErrorProps] = useRecoilState(InputDialogErrorState);
  const resetErrorProps = useResetRecoilState(InputDialogErrorState);
  const { open, onClose } = props;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetErrorProps();

    const formData = new FormData(event.currentTarget);
    const objectiveTitle = formData.get('objective_title') as string;
    const objectiveMemo = formData.get('objective_memo') as string;

    if ( objectiveTitle == "") {
      const objectiveTitleErrorMessage = "空白です";
      setErrorProps({ objectiveTitleErrorMessage } );
      return;
    }

    await onClose(objectiveTitle, objectiveMemo, false);
  };

  const handleCancel = async () => {
    resetErrorProps();
    await onClose("", "", true);
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
          error={errorProps.objectiveTitleErrorMessage}
          helperText={errorProps.objectiveTitleErrorMessage}
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

