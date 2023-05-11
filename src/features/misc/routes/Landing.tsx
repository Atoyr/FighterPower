import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from 'recoil';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { SignIn } from '@/lib/auth';
import { useAuth } from '@/hooks';

export const Landing = () => {
  const navigate = useNavigate();
  const AuthState = useAuth();

  const handleAnonymous = () => {
    let authParam = {
      AuthType: "Anonymously",
      email : "",
      password : "",
    } as AuthParameter;

    SignIn(authParam,
      (user) => {
        navigate('/app/dashboard', { replace: true });
      },
      (e) => {
        console.log(e);
      });
  };


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
    { !AuthState?.user ? 
    <Box sx={{textAlign: "center"}}>
      <Button variant="contained" href="/auth/signup" sx={{width: 250, mt: 2, mb: 1}}>無料で新規登録</Button>
      <br />
      <Link href="/auth/signin" sx={{width: 250, mt: 1, mb: 2}}>すでにアカウントをお持ちですか？ログイン</Link>
      <br />
      <Button variant="outlined" onClick={handleAnonymous} sx={{width: 250, mt: 5, mb: 1}}>登録せず利用</Button>
    </Box>
    : 
    <Box sx={{textAlign: "center"}}>
      <Button variant="contained" href="/app/dashboard" sx={{width: 250, mt: 2, mb: 1}}>HOME</Button>
    </Box> 
    }
  </Container>
  );
}

