import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Privacy(){
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
      {"プライバシーポリシー"}
      </Typography>
    </Box>

    <Typography variant="subtitle2" component="div" gutterBottom>
      {"発行日 : 2022年4月1日"}
    </Typography>
    <Typography variant="subtitle2" component="div" gutterBottom>
      {"最終更新日 : 2022年4月1日"}
    </Typography>


    <Typography variant="body1" component="div" sx={{my: 3}}>
      {"本サービス運営者（以下「運営者」といいます。）は、本ウェブサイト上で提供するサービス（以下,「本サービス」といいます。）における，ユーザーの個人情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。"}
    </Typography>

    <Typography variant="h4" component="div" sx={titleSx}>
      {"第1条（個人情報）"}
    </Typography>
    <Typography variant="body1" component="div" sx={bodySx}>
      {"「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，生存する個人に関する情報であって，当該情報に含まれる氏名，生年月日，住所，電話番号，連絡先その他の記述等により特定の個人を識別できる情報及び容貌，指紋，声紋にかかるデータ，及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。"}
    </Typography>

    <Typography variant="h4" component="div" sx={titleSx}>
      {"第2条（個人情報の収集方法）"}
    </Typography>
    <Typography variant="body1" component="div" sx={bodySx}>
      {"運営者は，ユーザーが利用登録をする際に氏名，生年月日，住所，電話番号，メールアドレスなどの個人情報をお尋ねすることがあります。また，ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録や決済に関する情報を,当社の提携先（情報提供元，広告主，広告配信先などを含みます。以下，｢提携先｣といいます。）などから収集することがあります。"}
    </Typography>

    <Typography variant="h4" component="div" sx={titleSx}>
      {"第3条（個人情報を収集・利用する目的）"}
    </Typography>
    <Typography variant="body1" component="div" sx={bodySx}>
      {"当社が個人情報を収集・利用する目的は，以下のとおりです。"}
    </Typography>
    <ol>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"当社サービスの提供・運営のため"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"ユーザーが利用中のサービスの新機能，更新情報，キャンペーン等及び当社が提供する他のサービスの案内のメールを送付するため"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"メンテナンス，重要なお知らせなど必要に応じたご連絡のため"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"利用規約に違反したユーザーや，不正・不当な目的でサービスを利用しようとするユーザーの特定をし，ご利用をお断りするため"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"ユーザーにご自身の登録情報の閲覧や変更，削除，ご利用状況の閲覧を行っていただくため"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"有料サービスにおいて，ユーザーに利用料金を請求するため"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"上記の利用目的に付随する目的"}
        </Typography>
      </li>
    </ol>

    <Typography variant="h4" component="div" sx={titleSx}>
      {"第4条（利用目的の変更）"}
    </Typography>
    <ol>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"当社は，利用目的が変更前と関連性を有すると合理的に認められる場合に限り，個人情報の利用目的を変更するものとします。"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"利用目的の変更を行った場合には，変更後の目的について，当社所定の方法により，ユーザーに通知し，または本ウェブサイト上に公表するものとします。"}
        </Typography>
      </li>
    </ol>

    <Typography variant="h4" component="div" sx={titleSx}>
      {"第5条（個人情報の第三者提供）"}
    </Typography>
    <ol>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"当社は，次に掲げる場合を除いて，あらかじめユーザーの同意を得ることなく，第三者に個人情報を提供することはありません。ただし，個人情報保護法その他の法令で認められる場合を除きます。"}
        </Typography>
        <ol>
          <li>
            <Typography variant="body1" component="div" sx={bodySx}>
              {"人の生命，身体または財産の保護のために必要がある場合であって，本人の同意を得ることが困難であるとき"}
            </Typography>
          </li>
          <li>
            <Typography variant="body1" component="div" sx={bodySx}>
              {"公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって，本人の同意を得ることが困難であるとき"}
            </Typography>
          </li>
          <li>
            <Typography variant="body1" component="div" sx={bodySx}>
              {"国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって，本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき"}
            </Typography>
          </li>
          <li>
            <Typography variant="body1" component="div" sx={bodySx}>
              {"予め次の事項を告知あるいは公表し，かつ当社が個人情報保護委員会に届出をしたとき"}
            </Typography>
            <ol>
              <li>
                <Typography variant="body1" component="div" sx={bodySx}>
                  {"利用目的に第三者への提供を含むこと"}
                </Typography>
              </li>
              <li>
                <Typography variant="body1" component="div" sx={bodySx}>
                  {"第三者に提供されるデータの項目"}
                </Typography>
              </li>
              <li>
                <Typography variant="body1" component="div" sx={bodySx}>
                  {"第三者への提供の手段または方法"}
                </Typography>
              </li>
              <li>
                <Typography variant="body1" component="div" sx={bodySx}>
                  {"本人の求めに応じて個人情報の第三者への提供を停止すること"}
                </Typography>
              </li>
              <li>
                <Typography variant="body1" component="div" sx={bodySx}>
                  {"本人の求めを受け付ける方法"}
                </Typography>
              </li>
            </ol>
          </li>
        </ol>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"前項の定めにかかわらず，次に掲げる場合には，当該情報の提供先は第三者に該当しないものとします。"}
        </Typography>
        <ol>
        </ol>
      </li>
    </ol>



  </Container>
  );
}
