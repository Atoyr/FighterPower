import { useEffect, useState } from 'react';

import { 
  ToggleButton, 
  ToggleButtonGroup
  } from '@mui/material';

type AchiveStatusToggleProps = {
  status: string;
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
  };

  return(
      <ToggleButtonGroup
        color="primary"
        value={achiveStatus}
        exclusive
        onChange={handleAchiveStatus}
        aria-label="text alignment" >
        <ToggleButton value="success" >
          {"成功"}
        </ToggleButton>
        <ToggleButton value="failer" >
          {"失敗"}
        </ToggleButton>
        <ToggleButton value="no" >
          {"意識外"}
        </ToggleButton>
        <ToggleButton value="nop" >
          {"機会なし"}
        </ToggleButton>
      </ToggleButtonGroup>
  );
};


