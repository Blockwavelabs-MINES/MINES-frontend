import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ContainedButton } from "../../../components/button";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { ProfileCard } from "../../../components/card";

const FullContainer = styled.div`
  width: 100%;
  //   height: 100%;
  min-height: 100vh;
  position: relative;
  padding: 75px 20px;
  background-color: ${(props) => (props.color ? props.color : "transparent")};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: ${(props) => (props.value ? `url(${props.value})` : "")};
`;

const ButtonContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 88px;
  padding: 16px 20px;
  position: fixed;
  bottom: 0px;
  display: flex;
  z-index: 100;
  backdrop-filter: blur(15px);
`;

const LinkContainer = styled.div`
  width: 100%;
  height: 68px;
  border-radius: 16px;
  padding: 18px 16px;
  background-color: ${(props) => props.color};
  ${Typography.Headline2}
  color: ${(props) => props.value};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 22px;
`;

const WalletIconBox = styled.img`
  position: absolute;
  top: 22px;
  left: 20px;
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

const Preview = ({
  userInfo,
  setPreviewOn,
  backgroundColor,
  backImage,
  buttonColor,
  buttonFontColor,
  fontColor,
}) => {
  return (
    <>
      <FullContainer color={backgroundColor} value={backImage.imagePreviewUrl}>
        <ProfileCard
          profileImg={userInfo?.user.profile_img}
          userName={userInfo?.user.profile_name}
          introduction={userInfo?.user.profile_bio}
          isEditable={false}
          color={fontColor}
        />
        {userInfo?.links.map((link, idx) => (
          <LinkContainer color={buttonColor} value={buttonFontColor}>
            {link.link_title}
          </LinkContainer>
        ))}
        {userInfo?.wallets.map((wallet, idx) => (
          <LinkContainer color={buttonColor} value={buttonFontColor}>
            {walletConvert(wallet.wallet_address)}
          </LinkContainer>
        ))}
      </FullContainer>
      <ButtonContainer>
        <ContainedButton
          type="primary"
          styles="filled"
          states="default"
          size="large"
          label="닫기"
          onClick={() => setPreviewOn(false)}
        />
      </ButtonContainer>
    </>
  );
};

export default Preview;
