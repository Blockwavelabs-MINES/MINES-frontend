import { DiscordIcon, TelegramIcon, TwitterIcon } from "assets/icons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getSocialConnectList } from "utils/api/twitter";
import { loginState } from "utils/atoms/login";
import { twitterIdState } from "utils/atoms/twitter";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";

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

const LinkAccount = styled.div`
  ${Typography.Headline3};
  color: ${palette.blue_1};
  cursor: pointer;
`;

const RadioButtonLabel = styled.label`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  border: 1px solid #ccc;
`;

const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-right: 10px;

  &:checked + ${RadioButtonLabel} {
    background: ${palette.blue_1};
    border: 1px solid ${palette.blue_1};
    box-shadow: 0 0 0 4px #fff inset;
  }
`;

const AccountListComponent = ({ twitterConnected, setTwitterConnected }) => {
  const [socialList, setSocialList] = useState(null);
  const isLoggedIn = useRecoilValue(loginState);
  const setTwitterId = useSetRecoilState(twitterIdState);

  const { t } = useTranslation();
  const accountList = [
    {
      icon: TwitterIcon,
      text: socialList?.data[0]
        ? "@" + socialList?.data[0]?.socialId
        : t("sendPage00_4"),
      supported: true,
      connected: twitterConnected,
    },
    {
      icon: TelegramIcon,
      text: t("sendPage00_5"),
      supported: false,
    },
    {
      icon: DiscordIcon,
      text: t("sendPage00_6"),
      supported: false,
    },
  ];

  const getSocialList = async () => {
    await getSocialConnectList().then((data) => {
      console.log(data);
      setSocialList(data);
      setTwitterId(data.data[0].socialId);
    });
  };

  useEffect(() => {
    isLoggedIn && getSocialList(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    socialList?.data[0]
      ? setTwitterConnected(true)
      : setTwitterConnected(false);
  }, [socialList]);

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
              account.connected ? (
                <>
                  <RadioButton type="radio" name="radio" checked={true} />
                  <RadioButtonLabel />
                </>
              ) : (
                <LinkAccount
                  onClick={() => {
                    window.location.href = "/accountLinking";
                  }}
                >
                  {t("sendPage00_3")}
                </LinkAccount>
              )
            ) : (
              <AccountStatus>{t("sendPage00_7")}</AccountStatus>
            )}
          </AccountListContainer>
        );
      })}
    </>
  );
};

export default AccountListComponent;
