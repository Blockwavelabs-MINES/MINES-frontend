import { DiscordIcon, TelegramIcon, TwitterIcon } from "assets/icons";
import { useState } from "react";
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
  //기본 값은 유저 정보에서 불러오기.

  const handleTwitterToggle = () => {
    setIsTwitterOn(!isTwitterOn);
    //1. 서버에 step1 요청

    //2. step1응답 바탕으로 Url 생성
    //     window.location.href = "";
    //   };
    // 응답 전달.
  };

  //3. step3 응답받으면

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
