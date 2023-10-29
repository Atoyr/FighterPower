import { Chip } from '@mui/material';
import { SxProps, Theme, useTheme } from '@mui/material/styles';

import { objectiveStatus } from '../constants';

type ObjectiveStatusChipProps = {
  status: string;
  sx: SxProps<Theme>;
};

export const ObjectiveStatusChip = (props: ObjectiveStatusChipProps) => {
  return(
      <Chip 
        label={objectiveStatus[props.status] ?? ""}
        variant="outlined" sx={props.sx}/>
  );
};

