import { IconMoreVertical, ProfileDefault } from "assets/icons";
import axios from "axios";
import { LoginModal } from "components/modal";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { handleTokenExpired } from "utils/api/base";
import {
  loginDoneState,
  loginModalVisibleState,
  loginState,
} from "utils/atoms/login";
import i18n from "utils/lang/i18n";
import { COLORS as palette } from "utils/style/Color/colors";
import Typograpy from "utils/style/Typography";
import { ContainedButton } from "../button";
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
  z-index: 101;
`;

const InnerContainer = styled.div`
  width: 100%;
  margin: auto 0px;
  display: flex;
  justify-content: space-between;
`;

const LogoContainer = styled.button`
  ${Typograpy.Headline1}
  color: #000000;
  font-family: Montserrat;
  margin: auto 0px;
  border: none;
`;

const ProfileButton = styled.button`
  width: 26px;
  height: 26px;
  border-radius: 18px;
  border: 1px solid ${palette.white};
  background-image: url(${({ img }) => (img ? img : ProfileDefault)});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
`;

const LoginHeader = () => {
  const [dropBoxOn, setDropBoxOn] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [loginModalVisible, setLoginModalVisible] = useRecoilState(
    loginModalVisibleState
  );
  const setLoginDone = useSetRecoilState(loginDoneState);
  const { t } = useTranslation();

  const profileImgOnClick = () => {
    setDropBoxOn(!dropBoxOn);
  };

  const profileImgOnClose = () => {
    setDropBoxOn(false);
  };

  const getUserData = async () => {
    let returnValue;
    await axios
      .get(`/user`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((data) => {
        returnValue = data.data.data;
        setUserInfo(returnValue);
        const userLanguage = returnValue?.language.toLowerCase().slice(0, 2);
        userLanguage === "en"
          ? i18n.changeLanguage("en")
          : i18n.changeLanguage("ko");
        localStorage.setItem("language", userLanguage);
      })
      .catch((error) => {
        console.log(error);
        handleTokenExpired(error);
      });
  };

  const onClickLogo = () => {
    window.location.href = '/';
  }

  useEffect(() => {
    if (isLoggedIn && localStorage.getItem("accessToken")) {
      getUserData();
    }
  }, [localStorage.getItem("accessToken")]);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <HeaderContainer>
      {dropBoxOn && (
        <ProfileDropbox
          visible={dropBoxOn}
          closable={true}
          maskClosable={true}
          onClose={profileImgOnClose}
        />
      )}
      <InnerContainer>
        <LogoContainer onClick={onClickLogo}>MINES</LogoContainer>
        {isLoggedIn ? (
          <ProfileButton
            img={IconMoreVertical}
            onClick={profileImgOnClick}
          />
        ) : (
          <ContainedButton
            type="secondary"
            styles="outlined"
            states="default"
            size="medium"
            label={t("introPageHeader1")}
            onClick={() => setLoginModalVisible(true)}
          />
        )}
      </InnerContainer>
      {loginModalVisible && (
        <LoginModal
          visible={loginModalVisible}
          closable={true}
          maskClosable={true}
          onClose={() => setLoginModalVisible(false)}
          setStatus={() => setLoginDone(true)}
        />
      )}
    </HeaderContainer>
  );
};

export default LoginHeader;
