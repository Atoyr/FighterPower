import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Terms(){
  const headerSx = {
        mt: 10,
        mb: 2,
  }
  const titleSx = {
    mt: 4,
    mb: 1,
  };
  const subTitleSx = {
    mt: 3,
    mb: 1,
  };
  const bodySx = {
    mt: 1,
    mb: 1,
  };

  return (
  <Container maxWidth="md">
    <Box sx={{mt: 10, mb: 2}}>
      <Typography variant="h2" component="div" gutterBottom
        sx={{
          display: {sx: "inline-block", md: "inline" }
        }}>
        {"FighterPower"}
      </Typography>
      <Typography variant="h2" component="div" gutterBottom
        sx={{
          display: {sx: "inline-block", md: "inline" }
        }}>
      {"サービス利用規約"}
      </Typography>
    </Box>

    <Typography variant="subtitle2" component="div" gutterBottom>
      {"発行日 : 2022年4月1日"}
    </Typography>
    <Typography variant="subtitle2" component="div" gutterBottom>
      {"最終更新日 : 2022年4月1日"}
    </Typography>

    <Typography variant="body1" component="div" sx={{my: 3}}>
      {"この利用規約（以下、「本規約」といいます。）は、本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。"}
    </Typography>

    <Typography variant="h4" component="div" sx={titleSx}>
      {"第1条（規約の適用）"}
    </Typography>
    <Typography variant="body1" component="div" sx={bodySx}>
      {"本規約は、本サービスの提供条件及び本サービス運営者（以下「運営者」といいます。）と利用者との間の権利義務関係を定めることを目的とし、利用者と運営者との間のサービスの利用に関わる一切の関係に適用されるものとします。"}
    </Typography>

    <Typography variant="h4" component="div" sx={titleSx}>
      {"第2条（利用登録）"}
    </Typography>

    <ol>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"本サービスにおいては、登録希望者が本規約に同意の上、当社の定める方法によって利用登録を申請し、当社がこれを承認することによって、利用登録が完了するものとします。"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
         {"当社は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。"}
        </Typography>
      </li>
    </ol>

  </Container>
  );
}
