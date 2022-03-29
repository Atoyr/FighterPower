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
    
    <Typography variant="body1" component="div" sx={bodySx}>
      {"本サービスは以下の条件をすべて満たす方に限り、ご利用いただくことができます。"}
    </Typography>
    <ol>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"ご自身でインターネットの利用環境、端末、ソフトウェアなどを用意することができる方"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"本規約に同意かつ遵守できる方"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"過去に本規約に違反したことのない方"}
        </Typography>
      </li>
    </ol>

    <Typography variant="h4" component="div" sx={titleSx}>
      {"第3条（ユーザーIDおよびパスワードの管理）"}
    </Typography>

    <ol>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
        {"ユーザーは、自己の責任において、本サービスのユーザーIDおよびパスワードを適切に管理するものとします。"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
        {"ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与し、もしくは第三者と共用することはできません。ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には、そのユーザーIDを登録しているユーザー自身による利用とみなします。"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
        {"ユーザーID及びパスワードが第三者によって使用されたことによって生じた損害は、運営者に故意又は重大な過失がある場合を除き、運営者は一切の責任を負わないものとします。"}
        </Typography>
      </li>
   </ol>

    <Typography variant="h4" component="div" sx={titleSx}>
      {"第4条（禁止事項）"}
    </Typography>
    <Typography variant="body1" component="div" sx={bodySx}>
      {"ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。"}
    </Typography>
    <ol>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"法令または公序良俗に違反する行為"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"犯罪行為に関連する行為"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"本サービスの内容等、本サービスに含まれる著作権、商標権ほか知的財産権を侵害する行為"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"運営者、ほかのユーザー、またはその他第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"本サービスによって得られた情報を商業的に利用する行為"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"本サービスの運営を妨害するおそれのある行為"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"不正アクセスをし、またはこれを試みる行為"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"他のユーザーに関する個人情報等を収集または蓄積する行為"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"不正な目的を持って本サービスを利用する行為"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"本サービスの他のユーザーまたはその他の第三者に不利益、損害、不快感を与える行為"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"他のユーザーに成りすます行為"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"運営者が許諾しない本サービス上での宣伝、広告、勧誘、または営業行為"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"面識のない異性との出会いを目的とした行為"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"本サービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"その他、運営者が不適切と判断する行為"}
        </Typography>
      </li>
    </ol>
    <Typography variant="h4" component="div" sx={titleSx}>
      {"第5条（本サービスの提供の停止等）"}
    </Typography>
    <ol style={{ marginBottom: 2}}>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"運営者は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。"}
        </Typography>
      </li>
      <ol>
        <li>
          <Typography variant="body1" component="div" sx={bodySx}>
            {"本サービスにかかるコンピュータシステムの保守点検または更新を行う場合"}
          </Typography>
        </li>
        <li>
          <Typography variant="body1" component="div" sx={bodySx}>
            {"地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合"}
          </Typography>
        </li>
        <li>
          <Typography variant="body1" component="div" sx={bodySx}>
            {"コンピュータまたは通信回線等が事故により停止した場合"}
          </Typography>
        </li>
        <li>
          <Typography variant="body1" component="div" sx={bodySx}>
            {"本サービスが利用しているクラウドサービスが停止した場合"}
          </Typography>
        </li>
        <li>
          <Typography variant="body1" component="div" sx={bodySx}>
            {"その他、運営者が本サービスの提供が困難と判断した場合"}
          </Typography>
        </li>
      </ol>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"運営者は、本サービスの提供の停止または中断により、利用者または第三者が被ったいかなる損害または不利益について、理由を問わず一切の責任を負わないものとします。"}
        </Typography>
      </li>
    </ol>
    <Typography variant="h4" component="div" sx={titleSx}>
      {"第6条（利用制限および登録抹消）"}
    </Typography>
    <ol>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"運営者は、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、ユーザーに対して、本サービスの全部もしくは一部の利用を制限し、またはユーザーとしての登録を抹消することができるものとします。"}
        </Typography>
        <ol>
          <li>
            <Typography variant="body1" component="div" sx={bodySx}>
              {"本規約のいずれかの条項に違反した場合"}
            </Typography>
          </li>
          <li>
            <Typography variant="body1" component="div" sx={bodySx}>
              {"登録事項に虚偽の事実があることが判明した場合"}
            </Typography>
          </li>
          <li>
            <Typography variant="body1" component="div" sx={bodySx}>
              {"料金等の支払債務の不履行があった場合"}
            </Typography>
          </li>
          <li>
            <Typography variant="body1" component="div" sx={bodySx}>
              {"運営者からの連絡に対し、一定期間返答がない場合"}
            </Typography>
          </li>
          <li>
            <Typography variant="body1" component="div" sx={bodySx}>
              {"本サービスについて、最終の利用から一定期間利用がない場合"}
            </Typography>
          </li>
          <li>
            <Typography variant="body1" component="div" sx={bodySx}>
              {"その他、運営者が本サービスの利用を適当でないと判断した場合"}
            </Typography>
          </li>
        </ol>
      </li>
    </ol>
    <Typography variant="h4" component="div" sx={titleSx}>
      {"第7条（退会）"}
    </Typography>
    <Typography variant="body1" component="div" sx={bodySx}>
      {"ユーザーは、運営者の定める退会手続により、本サービスから退会できるものとします。"}
    </Typography>

    <Typography variant="h4" component="div" sx={titleSx}>
      {"第8条（保証の否認および免責事項）"}
    </Typography>
    <Typography variant="body1" component="div" sx={bodySx}>
      {"ユーザーは、運営者の定める退会手続により、本サービスから退会できるものとします。"}
    </Typography>
    <ol>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"運営者は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"運営者は、本サービスに起因してユーザーに生じたあらゆる損害について、運営者の故意又は重過失による場合を除き、一切の責任を負いません。ただし、本サービスに関する運営者とユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"前項ただし書に定める場合であっても、運営者は、運営者の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（運営者またはユーザーが損害発生につき予見し、または予見し得た場合を含みます。）について一切の責任を負いません。また、運営者の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害の賠償は、ユーザーから当該損害が発生した月に受領した利用料の額を上限とします。"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"運営者は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。"}
        </Typography>
      </li>
    </ol>

    <Typography variant="h4" component="div" sx={titleSx}>
      {"第9条（サービス内容の変更等）"}
    </Typography>
    <Typography variant="body1" component="div" sx={bodySx}>
      {"運営者は、ユーザーへの事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、ユーザーはこれを承諾するものとします。"}
    </Typography>

    <Typography variant="h4" component="div" sx={titleSx}>
      {"第10条（利用規約の変更）"}
    </Typography>
    <ol>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"運営者は以下の場合には、ユーザーの個別の同意を要せず、本規約を変更することができるものとします。"}
        </Typography>
        <ol>
          <li>
            <Typography variant="body1" component="div" sx={bodySx}>
              {"本規約の変更がユーザーの一般の利益に適合するとき。"}
            </Typography>
          </li>
          <li>
            <Typography variant="body1" component="div" sx={bodySx}>
              {"本規約の変更が本サービス利用契約の目的に反せず、かつ、変更の必要性、変更後の内容の相当性その他の変更に係る事情に照らして合理的なものであるとき。"}
            </Typography>
          </li>
        </ol>
      </li>
      <li>
      <Typography variant="body1" component="div" sx={bodySx}>
        {"運営者はユーザーに対し、前項による本規約の変更にあたり、事前に、本規約を変更する旨及び変更後の本規約の内容並びにその効力発生時期を通知します。"}
      </Typography>
      </li>
    </ol>

    <Typography variant="h4" component="div" sx={titleSx}>
      {"第11条（個人情報の取扱い）"}
    </Typography>
    <Typography variant="body1" component="div" sx={bodySx}>
      {"運営者は、本サービスの利用によって取得する個人情報については、「プライバシーポリシー」に従い適切に取り扱うものとします。"}
    </Typography>

    <Typography variant="h4" component="div" sx={titleSx}>
      {"第12条（通知または連絡）"}
    </Typography>
    <Typography variant="body1" component="div" sx={bodySx}>
      {"ユーザーと運営者との間の通知または連絡は、運営者の定める方法によって行うものとします。運営者は、ユーザーから、運営者が別途定める方式に従った変更届け出がない限り、現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、これらは、発信時にユーザーへ到達したものとみなします。"}
    </Typography>

    <Typography variant="h4" component="div" sx={titleSx}>
      {"第13条（権利義務の譲渡の禁止）"}
    </Typography>
    <Typography variant="body1" component="div" sx={bodySx}>
      {"ユーザーは、運営者の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。"}
    </Typography>

    <Typography variant="h4" component="div" sx={titleSx}>
      {"第14条（準拠法・裁判管轄）"}
    </Typography>
    <ol>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"本規約の解釈にあたっては、日本法を準拠法とします。"}
        </Typography>
      </li>
      <li>
        <Typography variant="body1" component="div" sx={bodySx}>
          {"本サービスに関して紛争が生じた場合には、運営者の本店所在地を管轄する裁判所を専属的合意管轄とします。"}
        </Typography>
      </li>
    </ol>

    <Typography variant="body1" component="div" sx={bodySx}>
      {"以上"}
    </Typography>
  </Container>
  );
}
