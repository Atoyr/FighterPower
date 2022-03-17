import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useAuthContext } from 'context/AuthProvider'
import { useDocumentTitle } from 'hook/useDocumentTitle'
  
export default function Index() {
  let authContext = useAuthContext();
  useDocumentTitle("");
  return (
  <Container>
    <Typography variant="h2" component="div" gutterBottom
      sx={{
        textAlign: "center",
        mt: 10,
        mb: 2,
      }}>
      格闘ゲーマーの成長をサポート
    </Typography>
    <Typography variant="h5" component="div" gutterBottom
      sx={{
        textAlign: "center",
        mt: 1,
        mb: 1,
      }}>
      ゲームの目標を管理し、プレイヤーの成長をサポートします。
    </Typography>
    { !authContext.authState?.user ? 
    <Box sx={{textAlign: "center"}}>
      <Button variant="contained" href="signup" sx={{width: 250, mt: 2, mb: 1}}>無料で新規登録</Button>
      <br />
      <Link href="signin" sx={{width: 250, mt: 1, mb: 2}}>すでにアカウントをお持ちですか？ログイン</Link>
    </Box>
    : 
    <Box sx={{textAlign: "center"}}>
      <Button variant="contained" href="home" sx={{width: 250, mt: 2, mb: 1}}>HOME</Button>
    </Box> 
    }
  </Container>
  );
}
