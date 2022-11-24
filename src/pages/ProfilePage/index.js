import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ProfileHeader } from "../../components/header";
import { ContainedButton } from "../../components/button";
import Typography from "../../utils/style/Typography/index";
import { COLORS as palette } from "../../utils/style/Color/colors";
import {
  AddLinkModal,
  LinkComponent,
  WalletComponent,
  EditMyInfo,
} from "./components";
import { ProfileCard } from "../../components/card";
import { getLocalUserInfo } from "../../utils/functions/setLocalVariable";
import { useLocation } from "react-router-dom";
import { MetamaskIcon } from "../../assets/icons";

const FullContainer = styled.div`
  width: 100%;
  //   height: 100%;
  min-height: 100vh;
  position: relative;
  // padding-top: 75px;
  background: linear-gradient(180deg, #d1e0ff 0%, #ece0ed 57.29%, #fff1f1 100%);
`;

const Divider = styled.div`
  width: calc(100% - 40px);
  height: 1px;
  margin: 0px auto;
  background-color: ${palette.grey_6};
`;

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState();
  const [isUserPage, setIsUserPage] = useState(false); // false : my page

  const location = useLocation();

  useEffect(() => {
    var globalUserInfo = JSON.parse(getLocalUserInfo());
    console.log(globalUserInfo);

    var currentPageUserId = location.pathname.slice(1).split("/")[0].substr(1);
    console.log(currentPageUserId);

    const MetaUserInfo = {
      userId: currentPageUserId,
      userToken: "",
      profileImg: "",
      introduction: `hello, I am ${currentPageUserId}`,
      linkList: [
        {
          title: "MEPE",
          url: "https://mepe.app",
        },
        {
          title: "Web3Tree",
          url: "https://3tree.io",
        },
      ],
      walletList: [
        {
          type: "Metamask",
          address: "0x07B0ea6D444B9B66F3A7709FB1fA75BcDCD67A16",
          icon: MetamaskIcon,
        },
        {
          type: "Metamask",
          address: "0xed6631bD706BC910A37cdc41ACd48a5d94F7bCC0",
          icon: MetamaskIcon,
        },
      ],
    };
    if (currentPageUserId != globalUserInfo.userId) {
      setIsUserPage(true);
      setUserInfo(MetaUserInfo);
    } else {
      setUserInfo(globalUserInfo);
    }
  }, [getLocalUserInfo()]);

  return (
    <>
      <FullContainer>
        <ProfileHeader />
        <ProfileCard
          profileImg={userInfo?.profileImg}
          userName={userInfo?.userId}
          introduction={userInfo?.introduction}
          style={{
            paddingTop: "135px",
            backgroundColor: "transparent",
          }}
        />
        <LinkComponent userLinkList={userInfo?.linkList} />
        <Divider />
        <WalletComponent userWalletList={userInfo?.walletList} />
      </FullContainer>
    </>
  );
};

export default ProfilePage;
