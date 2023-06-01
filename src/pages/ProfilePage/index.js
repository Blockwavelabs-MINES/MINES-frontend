import { ProfileCard } from "components/card";
import { ProfileHeader } from "components/header";
import { LinkComponent, WalletComponent } from "pages/ProfilePage/components";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getUserInfoAndProfileDeco } from "utils/api/auth";
import { COLORS as palette } from "utils/style/Color/colors";

const FullContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: ${(props) => (props.color ? props.color : "transparent")};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: ${(props) => (props.value ? `url(${props.value})` : "")};
`;

const Divider = styled.div`
  width: calc(100% - 40px);
  height: 1px;
  margin: 0px auto;
  background-color: ${palette.grey_6};
`;

const ProfilePage = () => {
  const [userInfoData, setUserInfoData] = useState("");
  const [profileDecoData, setProfileDecoData] = useState("");
  const [linkData, setLinkData] = useState([]);
  const [walletData, setWalletData] = useState([]);
  const { t } = useTranslation();
  const location = useLocation();

  const getUserData = async (currentPageUserId) => {
    await getUserInfoAndProfileDeco(currentPageUserId).then((data) => {
      setUserInfoData(data.user);
      setProfileDecoData(data.profileDecorate);
      setLinkData(data.links);
      setWalletData(data.wallets);
    });
  };

  useEffect(() => {
    const currentPageUserId = location.pathname.split("/")[1].replace("@", "");
    getUserData(currentPageUserId);
  }, []);

  return (
    <>
      <FullContainer
        color={
          profileDecoData.backgroundType == "COLOR"
            ? profileDecoData.backgroundColor
            : ""
        }
        value={
          profileDecoData.backgroundType == "IMAGE"
            ? profileDecoData.backgroundImg
            : ""
        }
      >
        <ProfileHeader />
        <ProfileCard
          profileImg={userInfoData.profileImg}
          userName={userInfoData.profileName}
          introduction={userInfoData.profileBio}
          style={{
            paddingTop: "135px",
            backgroundColor: "transparent",
          }}
          color={profileDecoData.fontColor}
        />
        {userInfoData ? (
          <>
            {linkData.length !== 0 && (
              <LinkComponent
                userLinkList={linkData}
                profileDecorate={profileDecoData}
              />
            )}
            {walletData.length !== 0 && (
              <>
                <WalletComponent
                  userWalletList={walletData}
                  profileDecorate={profileDecoData}
                />
              </>
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
