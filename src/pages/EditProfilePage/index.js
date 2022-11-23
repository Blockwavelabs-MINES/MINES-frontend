import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { EditProfileHeader } from "../../components/header";
import { ContainedButton } from "../../components/button";
import Typography from "../../utils/style/Typography/index";
import { COLORS as palette } from "../../utils/style/Color/colors";
import { AddLinkModal, LinkComponent, WalletComponent } from "./components";
import { ProfileCard } from "../../components/card";
import { getLocalUserInfo } from "../../utils/functions/setLocalVariable";

const FullContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Divider = styled.div`
  width: calc(100% - 40px);
  height: 1px;
  margin: 0px auto;
  background-color: ${palette.grey_6};
`;

const EditProfilePage = () => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    var globalUserInfo = getLocalUserInfo();
    if (globalUserInfo) {
      setUserInfo(JSON.parse(globalUserInfo));
    }
    console.log(JSON.parse(globalUserInfo));
  }, [getLocalUserInfo()]);

  const closeLoginModal = () => {
    setLoginModalVisible(false);
  };
  return (
    <FullContainer>
      <EditProfileHeader title="프로필 관리" />
      {loginModalVisible ? (
        <AddLinkModal
          visible={loginModalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeLoginModal}
        />
      ) : (
        <></>
      )}
      <ProfileCard
        profileImg={userInfo?.profileImg}
        userName={userInfo?.userId}
        introduction={userInfo?.introduction}
      />
      <LinkComponent />
      <Divider />
      <WalletComponent />
    </FullContainer>
  );
};

export default EditProfilePage;
