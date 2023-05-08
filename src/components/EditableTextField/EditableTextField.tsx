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

export type EditableTextFieldProps = {
  label: string;
  onSave: (newValue: string) => boolean;
  allowEmpty: boolean;
}

export const EditableTextField = ({ label, onSave, allowEmpty = true }: EditableTextFieldProps) => {
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
            sx={{flexGrow: 1}} 
            multiline
            error={(error !== null && error !== "")}
            label={error === "" ? "memo" : error}
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
          <Typography variant="subtitle1" sx={{ flexGrow: 1, whiteSpace: "pre-wrap" }}>
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

