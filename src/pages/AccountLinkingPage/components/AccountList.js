import { DiscordIcon, TelegramIcon, TwitterIcon } from "assets/icons";
import { ConfirmModal, NoticeModal } from "components/modal";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { disconnectTwitter, getSocialConnectList } from "utils/api/twitter";
import { loginState } from "utils/atoms/login";
import { twitterJustConnectedState } from "utils/atoms/twitter";
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
  const [socialList, setSocialList] = useState(null);
  const [isTwitterOn, setIsTwitterOn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [twitterJustConnected, setTwitterJustConnected] = useRecoilState(
    twitterJustConnectedState
  );
  const { t } = useTranslation();
  const isLoggedIn = useRecoilValue(loginState);

  const getSocialList = async () => {
    await getSocialConnectList()
      .then((data) => {
        console.log(data);
        setSocialList(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      getSocialList();

      if (twitterJustConnected) {
        setTwitterJustConnected(false);
        setIsNoticeModalOpen(true);
        setTimeout(() => {
          setIsNoticeModalOpen(false);
        }, 4000);
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (socialList?.data[0]) {
      setIsTwitterOn(true);
    }
  }, [socialList]);

  const handleTwitterToggle = () => {
    if (isTwitterOn) {
      setIsModalOpen(true);
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
          <AccountListContainer key={account.icon}>
            <AccountInfo>
              <AccountIcon src={account.icon} alt={account.text} />
              <AccountName>{account.text}</AccountName>
            </AccountInfo>
            {account.supported ? (
              <Switch checked={account.checked} handler={account.handler} />
            ) : (
              <AccountStatus>{t("accountLinkingPage5")}</AccountStatus>
            )}
            <ConfirmModal
              visible={isModalOpen}
              closable={true}
              maskClosable={true}
              onClose={() => setIsModalOpen(false)}
              text="연동을 정말 해제하시겠어요?"
              buttonText="연결해제"
              subActionOnClick={async () => {
                await disconnectTwitter().then((data) => {
                  console.log(data);
                  setIsTwitterOn(false);
                });
              }}
            />
            <NoticeModal visible={isNoticeModalOpen} text="연동되었습니다." />
          </AccountListContainer>
        );
      })}
    </>
  );
};

export default AccountList;
