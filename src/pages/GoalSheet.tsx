import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useParams } from 'react-router-dom';
import { useUserContext } from 'context/UserProvider'
import { useGoalSheet } from 'hook/useGoalSheet';


function createData(name: string, success: number, fail: number, unconscious: number, noOppo: number) {
  return { name, success, fail, unconscious, noOppo };
}
const brows = [
  createData('目標1', 75, 13,13,11),
  createData('目標2', 25, 75,0,11),
  createData('目標3', 13, 13,75,11),
];
const trows = [
  createData('目標1', 100, 0,0,0),
  createData('目標2', 100, 0,0,0),
  createData('目標3', 0, 100,0,0),
];

function createResultData(no: number, type: string, goal1: string,goal2: string,goal3: string, remarks: string) {
  return { no, type, goal1, goal2, goal3, remarks};
}
const rows = [
  createResultData(1, '対戦', '失敗', '失敗', '機会', ''),
  createResultData(2, '対戦', '成功', '失敗', '成功', ''),
  createResultData(3, 'トレモ', '成功', '失敗', '機会', ''),
  createResultData(4, 'トレモ', '失敗', '失敗', '意識', ''),
];

export default function GoalSheet() {
  let userContext = useUserContext();

  let { id } = useParams<"id">();
  const goalSheetId = id ?? "";
  let goalSheet = useGoalSheet(userContext.id ?? "", goalSheetId);

  if (goalSheet != null)
  {
    return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid>
        <Grid item xs={12}>
          <Paper
            component="form"
            sx={{ p: '2px 4px', m: 2, display: 'flex', alignItems: 'center' }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="目標1"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="checkin">
              <CheckIcon />
            </IconButton>
          </Paper>
          <Paper
            component="form"
            sx={{ p: '2px 4px', m: 2, display: 'flex', alignItems: 'center' }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="目標2"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="checkin">
              <CheckIcon />
            </IconButton>
          </Paper>
          <Paper
            component="form"
            sx={{ p: '2px 4px', m: 2, display: 'flex', alignItems: 'center' }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="目標3"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="checkin">
              <CheckIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={12} sx={{ m: 2}}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>対戦</TableCell>
                  <TableCell align="right">成功</TableCell>
                  <TableCell align="right">失敗</TableCell>
                  <TableCell align="right">意識外</TableCell>
                  <TableCell align="right">機会無</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {brows.map((row) => (
                    <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                    {row.name}
                    </TableCell>
                    <TableCell align="right">{row.success}</TableCell>
                    <TableCell align="right">{row.fail}</TableCell>
                    <TableCell align="right">{row.unconscious}</TableCell>
                    <TableCell align="right">{row.noOppo}</TableCell>
                    </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sx={{ m: 2}}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>トレモ</TableCell>
                  <TableCell align="right">成功</TableCell>
                  <TableCell align="right">失敗</TableCell>
                  <TableCell align="right">意識外</TableCell>
                  <TableCell align="right">機会無</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {trows.map((row) => (
                    <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                    {row.name}
                    </TableCell>
                    <TableCell align="right">{row.success}</TableCell>
                    <TableCell align="right">{row.fail}</TableCell>
                    <TableCell align="right">{row.unconscious}</TableCell>
                    <TableCell align="right">{row.noOppo}</TableCell>
                    </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sx={{ m: 0}}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>形式</TableCell>
                  <TableCell align="center">目標1</TableCell>
                  <TableCell align="center">目標2</TableCell>
                  <TableCell align="center">目標3</TableCell>
                  <TableCell align="left">備考</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {rows.map((row) => (
                    <TableRow
                    key={row.no}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row" align="right">{row.no}</TableCell>
                    <TableCell> {row.type} </TableCell>
                    <TableCell align="center">{row.goal1}</TableCell>
                    <TableCell align="center">{row.goal2}</TableCell>
                    <TableCell align="center">{row.goal3}</TableCell>
                    <TableCell align="left">{row.remarks}</TableCell>
                    </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
    );
  } else {
    return (
    <Box>
      id not found.
    </Box>
    );
  }

}

