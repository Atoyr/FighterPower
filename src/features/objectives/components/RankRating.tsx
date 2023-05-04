import { useState } from 'react';

import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

import { SxProps, Theme } from '@mui/material/styles';

const labels: { [index: string]: string } = {
  1: 'D',
  2: 'C',
  3: 'B',
  4: 'A',
  5: 'S',
};

const getLabelText = (value: number) => {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export type RankRatingProps = {
  defaultValue: number;
  readonly: boolean;
  onSave: (newValue: number) => void;
  sx: SxProps<Theme>;
}

export const RankRating = (props: RankRatingProps) => {
  const [value, setValue] = useState<number>(props.defaultValue ?? 3);
  const [hover, setHover] = useState(-1);
  const containerStyle = {
    width: 200,
    display: 'flex',
    alignItems: 'center',
    ...props.sx, 
  }

  return (
    <Box sx={containerStyle} >
      <Rating
        name="rank-rating"
        value={value}
        precision={1}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
            props.onSave(newValue);
            setValue(newValue);
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
