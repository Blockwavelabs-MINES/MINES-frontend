import { MetamaskIcon } from "assets/icons";
import { ContainedButton } from "components/button";
import { ProfileCard } from "components/card";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getUserInfo } from "utils/api/auth";
import { getLink } from "utils/api/link";
import { getWallet } from "utils/api/wallets";
import Typography from "utils/style/Typography/index";

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

const MetamaskIconImg = styled.img`
  position: absolute;
  left: 16px;
  width: 32px;
  height: 32px;
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
  userId,
  setPreviewOn,
  backgroundColor,
  backImage,
  buttonColor,
  buttonFontColor,
  fontColor,
}) => {
  const [userInfo, setUserInfo] = useState([]);
  const [linkList, setLinkList] = useState([]);
  const [walletList, setWalletList] = useState([]);

  const getUserInfoData = async () => {
    await getUserInfo().then((data) => {
      setUserInfo(data);
    });
  };

  const getLinkList = async () => {
    await getLink(userId).then((data) => {
      setLinkList(data);
    });
  };

  const getWalletList = async () => {
    await getWallet(userId).then((data) => {
      setWalletList(data);
    });
  };

  useEffect(() => {
    getUserInfoData();
    getLinkList();
    getWalletList();
  }, []);

  return (
    <>
      <FullContainer color={backgroundColor} value={backImage.imagePreviewUrl}>
        <ProfileCard
          profileImg={userInfo.profileImg}
          userName={userInfo.profileName}
          introduction={userInfo.profileBio}
          isEditable={false}
          color={fontColor}
        />
        {linkList.map((link, idx) => (
          <LinkContainer color={buttonColor} value={buttonFontColor}>
            {link.linkTitle}
          </LinkContainer>
        ))}
        {walletList.map((wallet, idx) => (
          <LinkContainer color={buttonColor} value={buttonFontColor}>
            <MetamaskIconImg src={MetamaskIcon} />
            {walletConvert(wallet.walletAddress)}
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
