import { useTheme, Typography, Box } from '@mui/material';

import { Title } from '@/components/Title';

export const Debug = () => {
  const theme = useTheme();

  return (
    <div>
      <Title title="DEBUG" />
      <Typography variant="h6">Color Palette</Typography>
      <Box display="flex" flexWrap="wrap">
        {Object.entries(theme.palette).map(([key, value]) => {
          if(key === "mode") {
            return(<></>);
          } else if (value.main){
            return(
            <Box
              key={key}
              bgcolor={value.main}
              color={theme.palette.getContrastText(value.main)}
              p={2}
              m={1}
            >
              <Typography variant="caption">{key}</Typography>
              <Typography variant="caption">{value.main}</Typography>
            </Box>
          );
          }
            return(<></>);
        })}
      </Box>
    </div>
  );
};
