import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { CrossImage } from "../../../assets/images";
import { ContainedButton } from "../../../components/button";

const ContentContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 50px;
`;

const LottieContainer = styled.div`
  width: 200px;
  margin: 0px auto;
  padding-top: 100px;
  margin-bottom: 2px;
`;

const CrossImageBox = styled.img`
  width: 200px;
  height: 200px;
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
  margin-bottom: 30px;
`;

const ComplainLink = styled.a`
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: ${palette.grey_4};
`;

const FailComponent = ({ buttonOnClick }) => {
  console.log(buttonOnClick);
  return (
    <>
      <ContentContainer>
        <LottieContainer>
          <CrossImageBox src={CrossImage} />
        </LottieContainer>
        <TextLine>토큰 보내기에 실패했어요</TextLine>
        <CheckTxTitle>다시 한 번 시도해주세요!</CheckTxTitle>
        <ContainedButton
          type="primary"
          styles="filled"
          states="default"
          size="large"
          label="다시보내기"
          onClick={async () => {
            const promise = await buttonOnClick();
          }}
          style={{ marginBottom: "22px" }}
        />
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

export default FailComponent;
