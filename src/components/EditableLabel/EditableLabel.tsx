import { useState } from 'react';
import { 
  Button, 
  Box, 
  IconButton, 
  TextField, 
  Typography } from "@mui/material";

import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

export type EditableLabelProps = {
  label: string;
  onSave: (newValue: string) => boolean;
  allowEmpty: boolean;
}

export const EditableLabel = ({ label, onSave, allowEmpty = true }: EditableLabelProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(label);
  const [error, setError] = useState("");

  const handleEdit = () => {
    setError("");
    setValue(label);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setError("");
    setIsEditing(false);
    setValue(label);
  };

  const handleSave = () => {
    setError("");
    if(!allowEmpty && value === "") {
      setError("空白です");
      return;
    }
    onSave(value)
    setValue(label);
    setIsEditing(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      }}>
      {isEditing ? (
        <>
          <TextField 
            value={value} 
            onChange={handleChange} 
            variant="standard" 
            sx={{flexGrow: 1}} 
            inputProps={{style:{fontSize: "3rem"}}}
            error={(error !== null && error !== "")}
            label={error ?? ""}
          />
          <IconButton aria-label="edit" size="large" sx={{mx: 0, flexGrow:0 }} onClick={handleSave}>
            <SaveIcon fontSize="inherit" />
          </IconButton>
          <IconButton aria-label="edit" size="large" sx={{mx: 0, flexGrow:0 }} onClick={handleCancel}>
            <ClearIcon fontSize="inherit" />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h3" noWrap component="h3" sx={{ flexGrow: 1}}>
          {label}
          </Typography>
          <IconButton aria-label="edit" size="large" sx={{mx: 1, flexGrow:0 }} onClick={handleEdit}>
            <EditIcon fontSize="inherit" />
          </IconButton>
        </>
      )}
    </Box>
  );
};
