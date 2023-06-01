import { useEffect, useState } from 'react';

import { 
  ToggleButton, 
  ToggleButtonGroup
  } from '@mui/material';
import { SxProps, Theme, useTheme } from '@mui/material/styles';

type AchiveStatusToggleProps = {
  status: string;
  onChange: (newValue: string) => void;
  sx: SxProps<Theme>;
};

export const AchiveStatusToggle = (props: AchiveStatusToggleProps) => {
  const [achiveStatus, setAchiveStatus] = useState(props.status);
  useEffect(() => { setAchiveStatus(props.status); }, [props.status]);

  const handleAchiveStatus = (
    event: React.MouseEvent<HTMLElement>,
    newAchiveStatus: string | null,
  ) => {
    if(newAchiveStatus !== null) {
      setAchiveStatus(newAchiveStatus);
    }

    if(props.onChange) {
      props.onChange(newAchiveStatus);
    }
  };
  const style = {
    ...props.sx, 
  };

  return(
      <ToggleButtonGroup
        color="primary"
        value={achiveStatus}
        exclusive
        onChange={handleAchiveStatus}
        sx={style}
        aria-label="text alignment" >
        <ToggleButton value="success" >
          {"成功"}
        </ToggleButton>
        <ToggleButton value="failer" >
          {"失敗"}
        </ToggleButton>
        <ToggleButton value="outside" >
          {"意識外"}
        </ToggleButton>
        <ToggleButton value="nochance" >
          {"機会なし"}
        </ToggleButton>
      </ToggleButtonGroup>
  );
};


