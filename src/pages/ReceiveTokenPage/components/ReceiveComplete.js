import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ContainedButton } from "../../../components/button";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { EditableCard } from "../../../components/card";
import Lottie from "reactjs-lottie";
import animation from "../../../assets/lottie/check-lottie.json";
import { MetamaskIcon, GreenCheck, ChevronRight } from "../../../assets/icons";
import { CompasImage } from "../../../assets/images";

const ContentContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 50px;
`;

const LottieContainer = styled.div`
  width: 100px;
  margin: 0px auto;
  padding-top: 140px;
  margin-bottom: 10px;
`;

const WalletBox = styled.div`
  position: relative;
  margin-bottom: 50px;
`;

const TextLine = styled.div`
  ${Typography.Headline1}
  text-align: center;
  margin-bottom: 36px;
  font-family: Montserrat;
`;

const CheckBox = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(-50%, -50%);
`;

const CheckTxTitle = styled.div`
  ${Typography.Headline2}
  color: ${palette.grey_2};
`;

const TxHashCard = styled.button`
  width: 100%;
  min-height: 96px;
  padding: 24px 10px;
  border-radius: 16px;
  display: flex;
  gap: 16px;
  margin-top: 12px;
  margin-bottom: 57px;
  border: 1px solid ${palette.sky_3};
  background-color: ${palette.sky_4};
  align-items: center;
  position: relative;
`;

const TimerBox = styled.img`
  width: 46px;
`;

const TxHashInfobox = styled.div``;

const TxHashInfoTitle = styled.div`
  ${Typography.Caption1}
  color: ${palette.grey_1};
`;

const TxHashAddressBox = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const TxHashAddress = styled.div`
  ${Typography.Headline2}
  color: ${palette.Black};
  text-decoration: underline;
`;

const RightArrow = styled.img`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0%, -50%);
`;

const ComplainLink = styled.a`
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: ${palette.grey_4};
`;

const walletConvert = (walletAddress) => {
  var returnAddress = walletAddress;
  if (walletAddress?.length > 15) {
    returnAddress =
      walletAddress.substr(0, 6) +
      "..." +
      walletAddress.substr(walletAddress.length - 6, walletAddress.length);
  }
  return returnAddress;
};

const ReceiveComplete = ({ receiveInfo }) => {
  const txHashExplorerOnClick = () => {
    window.open(
      `https://goerli.etherscan.io/tx/${receiveInfo.transaction_escrow_hash}`
    );
  };
  return (
    <>
      <ContentContainer>
        <LottieContainer>
          <Lottie
            options={{
              animationData: animation,
              loop: false,
            }}
          />
        </LottieContainer>
        <TextLine>
          {receiveInfo?.token_amount} {receiveInfo?.token_udenom}
          <br />
          받기완료!
        </TextLine>
        <WalletBox>
          <CheckBox src={GreenCheck} />
          <EditableCard
            label={walletConvert(receiveInfo?.receiver_wallet_address)}
            isEdit={false}
            isTrash={false}
            // icon={wallet.icon}
            icon={MetamaskIcon}
          />
        </WalletBox>
        <CheckTxTitle>받은 내역 확인하고 싶다면?</CheckTxTitle>
        <TxHashCard onClick={txHashExplorerOnClick}>
          <RightArrow src={ChevronRight} />
          <TimerBox src={CompasImage} />
          <TxHashInfobox>
            <TxHashInfoTitle>
              트랜잭션 해시로 받은 내역 확인해요!
            </TxHashInfoTitle>
            <TxHashAddressBox>
              <TxHashAddress>
                {walletConvert(receiveInfo?.transaction_escrow_hash)}
              </TxHashAddress>
            </TxHashAddressBox>
          </TxHashInfobox>
        </TxHashCard>
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

export default ReceiveComplete;
