import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ContainedButton } from "../../components/button";
import Typography from "../../utils/style/Typography/index";
import { COLORS as palette } from "../../utils/style/Color/colors";
import { CreateSuccess as SuccessImg } from "../../assets/icons";

const IntroTextBox = styled.div`
  width: 90%;
  margin: 0px auto;
  // margin-top: 70px;
`;

const InputContainer = styled.div`
  width: 90%;
  margin: 0px auto;
  margin-top: 70px;
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
  padding-bottom: 160px;
  position: absolute;
  top: 460px;
  //   bottom: 100px;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(1, 1fr);
`;

const SuccessImage = styled.img`
  width: 200px;
  height: 200px;
  margin-top: 63px;
`;

const CreateSuccess = () => {
  const settingOnClick = () => {
    window.location.href = "/editProfile";
  };

  const copyOnClick = () => {
    alert("준비중입니다.");
  };
  return (
    <>
      <IntroTextBox>
        <FirstIntro>링크 생성완료!</FirstIntro>
        <SecondIntro>
          프로필을 다듬고 <br /> 디지털 아이덴티티를 확장해보세요!
        </SecondIntro>
      </IntroTextBox>
      <SuccessImage src={SuccessImg} />
      <ButtonContainer>
        <ContainedButton
          type="primary"
          styles="filled"
          states="default"
          size="large"
          label="프로필 관리하기"
          onClick={settingOnClick}
        />
        <ContainedButton
          type="primary"
          styles="outlined"
          states="default"
          size="large"
          label="프로필 복사하기"
          onClick={copyOnClick}
        />
      </ButtonContainer>
    </>
  );
};

export default CreateSuccess;
