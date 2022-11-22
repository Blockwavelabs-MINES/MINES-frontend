import React from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../utils/style/Color/colors";
import Typograpy from "../../utils/style/Typography";
import { ContainedButton } from "../button";

const HeaderContainer = styled.div`
  width: 100%;
  height: 75px;
  border-bottom: 1px solid ${palette.grey_7};
  padding: 17px 20px;
`;

const InnerContainer = styled.div`
  width: 100%;
  margin: auto 0px;
  display: flex;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  ${Typograpy.Headline1}
  color: #000000;
  font-family: Montserrat;
  margin: auto 0px;
`;

const LoginHeader = ({ onVisible }) => {
  const loginOnClick = () => {
    console.log("jell");
    onVisible(true);
  };
  return (
    <HeaderContainer>
      <InnerContainer>
        <LogoContainer>3TREE</LogoContainer>
        <ContainedButton
          type="secondary"
          styles="outlined"
          states="default"
          size="medium"
          label="로그인"
          onClick={loginOnClick}
        />
      </InnerContainer>
    </HeaderContainer>
  );
};

export default LoginHeader;
