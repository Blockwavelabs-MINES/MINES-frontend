import { LoginHeader } from "components/header";
import { SingleModal } from "components/modal";
import { BottomNavBar } from "components/navbar";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginModalVisibleState, loginState } from "utils/atoms/login";
import Typography from "utils/style/Typography/index";
import { AccountList } from "./components";

const FullContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 75px;
`;

const ContentContainer = styled.div`
  padding: 49.5px 20px 0 20px;
`;

const HeaderText = styled.div`
  ${Typography.Headline1}
  margin-bottom: 32px;
`;

const AccountLinkingPage = () => {
  const [loginAlertModalVisible, setLoginAlertModalVisible] = useState(false);
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
          <HeaderText>소셜 계정 연동</HeaderText>
          <AccountList />
        </ContentContainer>
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

export default AccountLinkingPage;
