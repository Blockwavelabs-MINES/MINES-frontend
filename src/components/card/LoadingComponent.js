import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Typography from "../../utils/style/Typography/index";
import { COLORS as palette } from "../../utils/style/Color/colors";
import Lottie from "react-lottie-player";
import animation from "../../assets/lottie/airplane-lottie.json";

const ContentContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 50px;
`;

const LottieContainer = styled.div`
  width: 380px;
  margin: 0px auto;
  padding-top: 100px;
  margin-bottom: 2px;
`;

const TextLine = styled.div`
  ${Typography.Headline1}
  text-align: center;
  margin-bottom: 14px;
  font-family: Montserrat;
`;

const CheckTxTitle = styled.div`
  ${Typography.Subhead}
  color: ${palette.grey_1};
  text-align: center;
  margin-bottom: 80px;
`;

const ComplainLink = styled.a`
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: ${palette.grey_4};
`;

const LoadingComponent = () => {
  return (
    <>
      <ContentContainer>
        <LottieContainer>
          <Lottie animationData={animation} loop={true} play/>
        </LottieContainer>
        <TextLine>토큰을 보내는 중이에요</TextLine>
        <CheckTxTitle>
          네트워크 환경에 따라 소요되는 시간이 달라져요.
          <br />
          잠시만 기다려주세요!
        </CheckTxTitle>
        <ComplainLink
          href="https://forms.gle/4CGoKQAWzJVG2dd69"
          target="_blank"
        >
          문제가 생겼나요?
        </ComplainLink>
      </ContentContainer>
    </>
  );
};

export default LoadingComponent;
