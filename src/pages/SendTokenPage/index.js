import { ContainedButton } from "components/button";
import { LoginHeader } from "components/header";
import { SingleModal } from "components/modal";
import { BottomNavBar } from "components/navbar";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginModalVisibleState, loginState } from "utils/atoms/login";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography";
import { AccountListComponent } from "./components";

const FullContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 75px;
`;

const ContentContainer = styled.div`
  width: 100%;
  padding: 49.5px 20px 0 20px;
`;

const HeaderText = styled.h1`
  ${Typography.Headline1}
  margin-bottom: 14px;
`;

const SubText = styled.h2`
  ${Typography.Body};
  color: ${palette.grey_2};
  margin-bottom: 32px;
`;

const ContainedButtonWrapper = styled.div`
  position: absolute;
  left: 50%;
  bottom: 100px;
  transform: translate(-50%, -50%);
  width: 90%;
`;

const SendTokenPage = () => {
  const [loginAlertModalVisible, setLoginAlertModalVisible] = useState(false);
  const [twitterConnected, setTwitterConnected] = useState(false);
  const setLoginModalVisible = useSetRecoilState(loginModalVisibleState);
  const isLoggedIn = useRecoilValue(loginState);
  const { t } = useTranslation();

  useEffect(() => {
    !isLoggedIn && setLoginAlertModalVisible(true);
  }, []);

  return (
    <>
      <FullContainer>
        <LoginHeader />
        <ContentContainer>
          <HeaderText>{t("sendPage00_1")}</HeaderText>
          <SubText>{t("sendPage00_2")}</SubText>
          <AccountListComponent
            twitterConnected={twitterConnected}
            setTwitterConnected={setTwitterConnected}
          />
        </ContentContainer>
        <ContainedButtonWrapper>
          <ContainedButton
            type="primary"
            styles="filled"
            states={twitterConnected ? "defualt" : "disabled"}
            size="large"
            label={t("sendPage00_8")}
            onClick={() => {
              window.location.href = "/sendTokenSteps";
            }}
          />
        </ContainedButtonWrapper>
      </FullContainer>
      <BottomNavBar />
      {loginAlertModalVisible && (
        <SingleModal
          visible={setLoginAlertModalVisible}
          closable={true}
          maskClosable={true}
          onClose={() => setLoginAlertModalVisible(false)}
          text={<>{t("introPageAlert1")}</>}
          setStatus={() => setLoginModalVisible(true)}
          buttonText={t("introPageAlert2")}
        />
      )}
    </>
  );
};

export default SendTokenPage;
