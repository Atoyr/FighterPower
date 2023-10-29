import { useState } from 'react';

import HelpIcon from '@mui/icons-material/Help';
import { ClickAwayListener, IconButton, Tooltip } from '@mui/material';

type HelpTooltipProps = {
  title : string;
}

export const HelpTooltip = ({title, message }: HelpTooltipProps) => {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <Tooltip
        PopperProps={{ disablePortal: true, }}
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={title} >
        <IconButton onClick={handleTooltipOpen}><HelpIcon /></IconButton>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
};
