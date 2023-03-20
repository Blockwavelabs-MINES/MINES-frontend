import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../utils/style/Color/colors";
import Typograpy from "../../utils/style/Typography";
import { ContainedButton } from "../button";
import { ProfileDefault } from "../../assets/icons";
import { ProfileDropbox } from "./components";
import { useTranslation } from "react-i18next";
import { getUserInfo } from "../../utils/api/auth";

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
  background-image: url(${({ img }) => (img ? img : ProfileDefault)});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
`;

const LoginHeader = ({ onVisible }) => {
  const [dropBoxOn, setDropBoxOn] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const { t } = useTranslation();

  const loginOnClick = () => {
    onVisible(true);
  };

  const profileImgOnClick = () => {
    setDropBoxOn(!dropBoxOn);
  };

  const profileImgOnClose = () => {
    setDropBoxOn(false);
  };

  const getUserData = async () => {
    await getUserInfo().then((data) => {
      setUserInfo(data);
    });
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      getUserData();
    }
  }, [localStorage.getItem("accessToken")]);

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
        {localStorage.getItem("accessToken") ? (
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
            label={t("introPageHeader1")}
            onClick={loginOnClick}
          />
        )}
      </InnerContainer>
    </HeaderContainer>
  );
};

export default LoginHeader;
