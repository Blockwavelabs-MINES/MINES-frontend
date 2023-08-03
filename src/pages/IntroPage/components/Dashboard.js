import NFTs from "./NFTs";
import TransactionHistory from "./TransactionHistory";

import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";
import styled from "styled-components";
import Profile from "./Profile";
import { useEffect } from "react";
import { useState } from "react";
import { getProfileDeco } from "utils/api/profile";
import { getLink } from "utils/api/link";
import { getWallet } from "utils/api/wallets";
import { getUserInfo } from "utils/api/auth";

const FullContainer = styled.div`
`;

const DashBoard = () => {
  const [userInfoData, setUserInfoData] = useState("");
  const [profileDecoData, setProfileDecoData] = useState("");
  const [linkData, setLinkData] = useState([]);
  const [walletData, setWalletData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      await getUserInfo()
        .then((data) => {
          setUserInfoData(data);
          getUserData(data.userId);
        })
    }

    fetch();
  }, [])
  
  const getUserData = async (userId) => {
    await getProfileDeco(userId)
      .then((data) => {
        setProfileDecoData(data);
      })
    await getLink(userId)
      .then((data) => {
        setLinkData(data);
      })
    await getWallet(userId)
      .then((data) => {
        setWalletData(data);
      })
  };

  return (  
    <>
      <Profile 
        userName={userInfoData.userId}
        profileImg={userInfoData.profileImg}
        introduction={userInfoData.profileBio}
        backgroundColor={profileDecoData.backgroundColor}
        fontColor={profileDecoData.fontColor}
        link={linkData}
        wallet={walletData}
        profileDecoData={profileDecoData}
      />
      <TransactionHistory />
    </>
  );
}
 
export default DashBoard;