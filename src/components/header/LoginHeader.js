import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../utils/style/Color/colors";
import Typograpy from "../../utils/style/Typography";
import { ContainedButton } from "../button";
import { ProfileSmall } from "../../assets/icons";
import { getLocalUserInfo } from "../../utils/functions/setLocalVariable";
import { ProfileDropbox } from "./components";

const HeaderContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 75px;
  border-bottom: 1px solid ${palette.grey_7};
  padding: 22px 20px 12px 20px;
  background-color: ${palette.white};
  position: fixed;
  top: 0px;
  z-index: 10;
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

const ProfileButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  border: 1px solid ${palette.grey_7};
  background-image: url(${({ img }) => (img ? img : ProfileSmall)});
  background-size: 36px 36px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
`;

const LoginHeader = ({ onVisible }) => {
  const [userInfo, setUserInfo] = useState();
  const [dropBoxOn, setDropBoxOn] = useState(false);

  useEffect(() => {
    var globalUserInfo = getLocalUserInfo();
    if (globalUserInfo) {
      setUserInfo(globalUserInfo);
    }
  }, []);

  const loginOnClick = () => {
    console.log("jell");
    onVisible(true);
  };

  const profileImgOnClick = () => {
    setDropBoxOn(!dropBoxOn);
  };

  const profileImgOnClose = () => {
    setDropBoxOn(false);
  };

  return (
    <HeaderContainer>
      {dropBoxOn ? (
        <ProfileDropbox
          visible={dropBoxOn}
          closable={true}
          maskClosable={true}
          onClose={profileImgOnClose}
        />
      ) : (
        <></>
      )}
      <InnerContainer>
        <LogoContainer>3TREE</LogoContainer>
        {userInfo ? (
          <ProfileButton
            img={userInfo.profileImg}
            onClick={profileImgOnClick}
          />
        ) : (
          <ContainedButton
            type="secondary"
            styles="outlined"
            states="default"
            size="medium"
            label="로그인"
            onClick={loginOnClick}
          />
        )}
      </InnerContainer>
    </HeaderContainer>
  );
};

export default LoginHeader;
