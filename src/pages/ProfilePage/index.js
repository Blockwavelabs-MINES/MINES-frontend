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
import { getUserInfo } from "../../utils/api/auth";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const location = useLocation();

  useEffect(() => {
    (async () => {
      var globalUserInfo = getLocalUserInfo();
      console.log(globalUserInfo);

      var currentPageUserId = location.pathname
        .slice(1)
        .split("/")[0]
        .substr(1);
      console.log(currentPageUserId);

      const MetaUserInfo = {
        links: [
          {
            index: 3,
            user_index: 10,
            link_title: "MEPE",
            link_url: "https://mepe.app",
          },
          {
            index: 3,
            user_index: 10,
            link_title: "Web3Tree",
            link_url: "https://3tree.io",
          },
        ],
        wallets: [
          {
            index: 3,
            user_index: 10,
            wallet_address: "0x0000000000000000000",
          },
        ],
        user: {
          index: 10,
          profile_name: null,
          profile_img: null,
          profile_bio: `hello, I am ${currentPageUserId}`,
          user_id: currentPageUserId,
          social_id: "gkrry2723",
          social_platform: "GOOGLE",
          role: null,
        },
      };
      if (currentPageUserId != globalUserInfo?.user.user_id) {
        setIsUserPage(true);
        // setUserInfo(MetaUserInfo);
        const getUserInfoResult = await getUserInfo(currentPageUserId).then(
          (data) => {
            console.log(data);
            setUserInfo(data);
          }
        );
      } else {
        const getUserInfoResult = await getUserInfo(globalUserInfo.user.user_id)
          .then((data) => {
            console.log(data);
            setUserInfo(data);
          })
          .catch((err) => {
            console.log("error");
          });
      }
    })();
  }, []);

  return (
    <>
      <FullContainer>
        <ProfileHeader />
        <ProfileCard
          profileImg={userInfo?.user?.profile_img}
          userName={userInfo?.user?.profile_name}
          introduction={userInfo?.user?.profile_bio}
          style={{
            paddingTop: "135px",
            backgroundColor: "transparent",
          }}
        />
        {userInfo ? (
          <>
            {userInfo.links.length ? (
              <LinkComponent userLinkList={userInfo?.links} />
            ) : (
              <></>
            )}
            {userInfo.wallets.length ? (
              <>
                <Divider />
                <WalletComponent userWalletList={userInfo?.wallets} />
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
            <>{t("profilePage4")}</>
        )}
      </FullContainer>
    </>
  );
};

export default ProfilePage;
