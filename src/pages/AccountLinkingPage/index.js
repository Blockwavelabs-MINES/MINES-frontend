import { LoginHeader } from "components/header";
import { BottomNavBar } from "components/navbar";
import styled from "styled-components";
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
    </>
  );
};

export default AccountLinkingPage;
