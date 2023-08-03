import { useEffect } from "react";

import { useTranslation } from "react-i18next";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";
import styled from "styled-components";

import { ProfileCard } from "components/card";
import LinkComponent from "./LinkComponent";
import WalletComponent from "./WalletComponent";

const FullContainer = styled.div`
  width: 90%;
  padding: 0px 0px 38px 0px;
  margin-top: 75px;
  gap: 24px;
  border-radius: 20px;
  background-color: ${palette.white};
  box-shadow: 0px 13px 40px 0px ${palette.grey_7};
`;

const Profile = ({
  userName,
  profileImg,
  introduction,
  link,
  wallet,
  profileDecoData
}) => {

  return (  
    <FullContainer style={{ backgroundColor: `${profileDecoData.backgroundColor}` }}>
      <ProfileCard
        profileImg={profileImg}
        userName={userName}
        introduction={introduction}
        backgroundColor={profileDecoData.backgroundColor}
        style={{
          paddingBottom: "0",
          backgroundColor: "transparent",
        }}
        color={profileDecoData.fontColor}
      />
      {profileDecoData && (
        <>
          {link.length !== 0 && (
            <LinkComponent
              userLinkList={link}
              profileDecorate={profileDecoData}
            />
          )}
          {wallet.length !== 0 && (
            <WalletComponent
              userWalletList={wallet}
              profileDecorate={profileDecoData}
            />
          )}
        </>
      )}
    </FullContainer>
  );
}
 
export default Profile;