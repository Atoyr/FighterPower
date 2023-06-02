import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
import { blue } from '@mui/material/colors';

const modes = [
  { title: "トレモ", key: "training", icon: () => <PersonIcon />}, 
  { title: "対戦", key: "battle", icon: () => <PeopleIcon />}, 
  { title: "CPU戦", key: "cpu", icon: () => <SmartToyTwoToneIcon />}, 
];

export type SelectAchiveModeDialogProps = {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
};

export const SelectAchiveModeDialog = (props: SelectAchiveModeDialogProps) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue ?? "");
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{"入力する実行結果を選択してください"}</DialogTitle>
      <List sx={{ pt: 0 }}>
        {modes.map((mode) => (
          <ListItem disableGutters key={mode}>
            <ListItemButton onClick={() => handleListItemClick(mode.key)} key={mode.key}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  {mode.icon()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={mode.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
