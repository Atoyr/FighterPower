import { Chip } from '@mui/material';
import { SxProps, Theme, useTheme } from '@mui/material/styles';

import { achiveResultType } from '../constants';

type AchiveResultTypeChipProps = {
  type: string;
  sx: SxProps<Theme>;
};

export const AchiveResultTypeChip = (props: AchiveResultTypeChipProps) => {

  return(
      <Chip 
        label={achiveResultType[props.type] ?? ""}
        variant="outlined" sx={props.sx}/>
  );
};



