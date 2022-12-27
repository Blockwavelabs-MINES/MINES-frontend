import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LoginHeader } from "../../components/header";
import { ContainedButton } from "../../components/button";
import Typography from "../../utils/style/Typography/index";
import { COLORS as palette } from "../../utils/style/Color/colors";
import { LoginModal, SingleModal } from "../../components/modal";
import { getLocalUserInfo } from "../../utils/functions/setLocalVariable";
import { MainImage } from "../../assets/images";

const FullContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 75px;
`;

const IntroTextBox = styled.div`
  width: 90%;
  margin: 0px auto;
  margin-top: 50px;
`;

const FirstIntro = styled.div`
  ${Typography.Headline1}
  color: ${palette.Black};
  line-height: 33.35px;
`;

const SecondIntro = styled.div`
  ${Typography.Body}
  color: ${palette.grey_2};
  line-height: 23.8px;
  margin-top: 14px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  padding: 30px 20px;
  position: absolute;
  bottom: 60px;
  //   top: 542px;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(1, 1fr);
`;

const MainImageBanner = styled.img`
  width: 90%;
  margin-top: 30px;
`;

const IntroPage = () => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [loginAlertModalVisible, setLoginAlertModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    var globalUserInfo = getLocalUserInfo();
    if (globalUserInfo) {
      setUserInfo(globalUserInfo);
    }
  }, []);

  const closeLoginModal = () => {
    setLoginModalVisible(false);
  };

  const closeLoginAlertModal = () => {
    setLoginAlertModalVisible(false);
  };

  const profileSettingOnClick = () => {
    if (userInfo) {
      window.location.href = "/editProfile";
    } else {
      setLoginAlertModalVisible(true);
    }
  };
  const sendOnClick = () => {
    // alert("준비중입니다.");
    if (userInfo) {
      window.location.href = "/sendToken";
    } else {
      setLoginAlertModalVisible(true);
    }
  };
  return (
    <FullContainer>
      <LoginHeader onVisible={setLoginModalVisible} />
      {loginModalVisible ? (
        <LoginModal
          visible={loginModalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeLoginModal}
        />
      ) : (
        <>
          {loginAlertModalVisible ? (
            <SingleModal
              visible={setLoginAlertModalVisible}
              closable={true}
              maskClosable={true}
              onClose={closeLoginAlertModal}
              text={<>해당 기능을 이용하려면 로그인을 먼저 해야해요.</>}
              setStatus={setLoginModalVisible}
              buttonText={"로그인하기"}
            />
          ) : (
            <></>
          )}
        </>
      )}
      <IntroTextBox>
        <FirstIntro>
          소셜계정만 알면 송금할 수 있는
          <br /> Web3 특화 나만의 링크
        </FirstIntro>
        <SecondIntro>
          나만의 링크를 생성하고 <br /> 디지털 아이덴티티를 확장해보세요
        </SecondIntro>
      </IntroTextBox>
      <MainImageBanner src={MainImage} />
      <ButtonContainer>
        <ContainedButton
          type="primary"
          styles="filled"
          states="default"
          size="large"
          label="송금하기"
          onClick={sendOnClick}
        />
        <ContainedButton
          type="primary"
          styles="outlined"
          states="default"
          size="large"
          label="프로필 관리하기"
          onClick={profileSettingOnClick}
        />
      </ButtonContainer>
    </FullContainer>
  );
};

export default IntroPage;
