import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Container from '@mui/material/Container';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useParams } from 'react-router-dom';
import { useUserContext } from 'context/UserProvider'
import { useGoalSheetAndDtil } from 'hook/useGoalSheetAndDtil';

export default function GoalSheet() {
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  let userContext = useUserContext();

  let { id } = useParams<"id">();
  const goalSheetId = id ?? "";
  let goalSheetAndDtil = useGoalSheetAndDtil(userContext.id ?? "", goalSheetId);

  if (goalSheetAndDtil.isLoading) {
      return (<Container maxWidth="xl" 
      sx={{
        mt: { xs: 1, sm: 10 }
      }}>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>);
  } else if (goalSheetAndDtil.goalSheet != null) {
    return (
      <Container maxWidth="xl" 
      sx={{
        mt: { xs: 1, sm: 10 }
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          }}>
          <Typography variant="h3" noWrap component="h3" sx={{ flexGrow: 1}}>
          {goalSheetAndDtil.goalSheet.title}
          </Typography>
          <IconButton aria-label="edit" size="large" sx={{mx: 1, flexGrow:0 }}>
            <EditIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Box>
          { goalSheetAndDtil.goals.map((goal, index) => {
            return (
              <Box 
                key={goal.id}
                sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                my:2,
                borderBottom: 1,
                }}>
                <Typography variant="h6" noWrap component="h6" sx={{ flexGrow: 0, ml: 1, mr: 3}}>
                目標{index + 1}
                </Typography>
                <Typography variant="h6" noWrap component="h6" sx={{ flexGrow: 1}}>
                {goal.title}
                </Typography>
                <IconButton aria-label="edit" size="small" sx={{mx: 1, flexGrow : 0}}>
                  <EditIcon fontSize="inherit" />
                </IconButton>
              </Box>
            );})}
        </Box>
        <Box>
          <Button variant="outlined"
            onClick={() => setIsOpenDialog(true)}
            sx={{
              m:1,
              p:1,
              height : { xs : 50 }
            }}>
            目標を追加
          </Button>
        </Box>
        <Box>
          { goalSheetAndDtil.goalResults.map((goalResult, index) => {

            return (
            <Button variant="outlined" fullWidth 
              key={goalResult.id}
              sx={{
                m:1,
                p:1,
                width: { sm: 250 },
                height : { xs : 200 },
              }}>
              {goalResult.title}
            </Button>
            );
          })}
        </Box>
        <Dialog open={isOpenDialog} onClose={() => setIsOpenDialog(false)}>
          <DialogTitle>mo</DialogTitle>
          <DialogContent>
            <DialogContentText>
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label=""
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsOpenDialog(false)}>Cancel</Button>
            <Button onClick={() => setIsOpenDialog(false)}>Subscribe</Button>
          </DialogActions>
        </Dialog> 
      </Container>
    );
  } else {
    return (
    <Box>
      id not found.
    </Box>
    );
  }
}

