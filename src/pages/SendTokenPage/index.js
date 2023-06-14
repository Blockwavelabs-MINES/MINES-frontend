import { ContainedButton } from "components/button";
import { LoginHeader } from "components/header";
import { BottomNavBar } from "components/navbar";
import styled from "styled-components";
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
  return (
    <>
      <FullContainer>
        <LoginHeader />
        <ContentContainer>
          <HeaderText>소셜 계정 선택하기</HeaderText>
          <SubText>
            3TREE에서는 선택한 계정 아이디로 사람들에게 돈을 보낼 수 있어요!
          </SubText>
          <AccountListComponent />
        </ContentContainer>
        <ContainedButtonWrapper>
          <ContainedButton
            type="primary"
            styles="filled"
            states="default"
            size="large"
            label="송금 시작하기"
            onClick={() => {
              window.location.href = "/sendTokenSteps";
            }}
          />
        </ContainedButtonWrapper>
      </FullContainer>
      <BottomNavBar />
    </>
  );
};

export default SendTokenPage;
