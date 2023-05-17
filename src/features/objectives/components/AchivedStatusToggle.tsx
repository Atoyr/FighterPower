import { useEffect, useState } from 'react';

import { 
  ToggleButton, 
  ToggleButtonGroup
  } from '@mui/material';

type AchiveStatusToggleProps = {

};

export const AchiveStatusToggle = (props: AchiveStatusToggleProps) => {

  return(
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment" >
        <ToggleButton value="success" aria-label="left aligned">
          {"成功"}
        </ToggleButton>
        <ToggleButton value="failer" aria-label="centered">
          {"失敗"}
        </ToggleButton>
        <ToggleButton value="no" aria-label="centered">
          {"意識外"}
        </ToggleButton>
        <ToggleButton value="nop" aria-label="centered">
          {"機会なし"}
        </ToggleButton>
      </ToggleButtonGroup>
  );
};


