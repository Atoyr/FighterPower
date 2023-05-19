import { useEffect, useState } from 'react';

import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

import { SxProps, Theme } from '@mui/material/styles';

import { Rank, RankValue } from '../types';
import { getRank, getRankValue } from '../functions';

const getLabelText = (value: number) => {
  return `${value} Star${value !== 1 ? 's' : ''}, ${getRank(value)}`;
}

export type RankRatingProps = {
  value: Rank;
  readOnly: boolean;
  onChange?: (newValue: Rank) => void;
  size: string;
  sx: SxProps<Theme>;
}

export const RankRating = (props: RankRatingProps) => {
  const [value, setValue] = useState<number>(props.value ? getRankValue(props.value) : 3);
  const [hover, setHover] = useState(-1);

  useEffect(() => { setValue(props.value); }, [props.value ? getRankValue(props.value) : 3]);

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
        readOnly={props.readOnly}
        size={props.size ?? "medium"}
        onChange={(event, newValue) => {
          if(newValue === null) {
            return;
          }
          setValue(newValue);
          if (props.onChange) {
            props.onChange(getRank(newValue));
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

