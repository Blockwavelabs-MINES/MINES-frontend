import { DiscordIcon, TelegramIcon, TwitterIcon } from "assets/icons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";
import Switch from "./Switch";

const AccountListContainer = styled.div`
  min-width: 350px;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const AccountInfo = styled.div`
  display: flex;
`;

const AccountIcon = styled.img`
  width: 32px;
  margin: 0 8px;
`;

const AccountName = styled.div`
  ${Typography.Body};
  margin-left: 4px;
`;

const AccountStatus = styled.div`
  ${Typography.Headline3};
  color: ${palette.grey_2};
`;

const AccountList = () => {
  const [isTwitterOn, setIsTwitterOn] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    //isTwitterOn 기본 값은 유저 정보에서 불러오기.
  }, []);

  const handleTwitterToggle = () => {
    if (isTwitterOn) {
      //해제하시겠어요? 모달 띄우기.
    } else {
      window.location.href = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_TWITTER_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_TWITTER_REDIRECT_URI}&scope=tweet.read%20tweet.write%20users.read%20follows.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain`;
    }
  };

  const accountList = [
    {
      icon: TwitterIcon,
      text: t("accountLinkingPage2"),
      supported: true,
      checked: isTwitterOn,
      handler: handleTwitterToggle,
    },
    {
      icon: TelegramIcon,
      text: t("accountLinkingPage3"),
      supported: false,
    },
    {
      icon: DiscordIcon,
      text: t("accountLinkingPage4"),
      supported: false,
    },
  ];

  return (
    <>
      {accountList.map((account) => {
        return (
          <AccountListContainer>
            <AccountInfo>
              <AccountIcon src={account.icon} alt={account.text} />
              <AccountName>{account.text}</AccountName>
            </AccountInfo>
            {account.supported ? (
              <Switch checked={account.checked} handler={account.handler} />
            ) : (
              <AccountStatus>{t("accountLinkingPage5")}</AccountStatus>
            )}
          </AccountListContainer>
        );
      })}
    </>
  );
};

export default AccountList;
