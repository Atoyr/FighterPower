import { useEffect, useState } from 'react';

import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

import { SxProps, Theme } from '@mui/material/styles';

const defaultLabels: { [index: string]: string } = {
  1: '1', 
  2: '2', 
  3: '3', 
  4: '4', 
  5: '5', 
};

export type StarRatingProps = {
  value: number;
  readOnly: boolean;
  onChange?: (newValue: number) => void;
  size: string;
  sx: SxProps<Theme>;
  labels: { [index: number]: string };
}

export const StarRating = (props: StarRatingProps) => {
  const [value, setValue] = useState<number>(props.value ?? 3);
  const [hover, setHover] = useState(-1);
  const labels = props.labels ?? defaultLabels;

  useEffect(() => { setValue(props.value); }, [props.value ?? 3]);

  const containerStyle = {
    width: 200,
    display: 'flex',
    alignItems: 'center',
    ...props.sx, 
  }

  const getLabelText = (value: number) => {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }

  return (
    <Box sx={containerStyle} >
      <Rating
        name="rank-rating"
        value={value}
        precision={1}
        getLabelText={getLabelText}
        readOnly={props.readOnly}
        size={props.size ?? "medium"}
        onChange={(event, newValue) => {
          if(newValue === null) {
            return;
          }
          setValue(newValue);
          if (props.onChange) {
            props.onChange(newValue);
          }
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}

