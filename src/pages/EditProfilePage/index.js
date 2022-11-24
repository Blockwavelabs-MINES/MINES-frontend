import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SettingProfileHeader } from "../../components/header";
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

const FullContainer = styled.div`
  width: 100%;
  //   height: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 75px;
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
  const [editMyInfo, setEditMyInfo] = useState();

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

  const editOnClick = () => {
    setEditMyInfo(true);
  };

  return (
    <>
      {editMyInfo ? (
        <EditMyInfo userInfo={userInfo} setEditMyInfo={setEditMyInfo} />
      ) : (
        <FullContainer>
          <SettingProfileHeader title="프로필 관리" />
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
            onClick={editOnClick}
            isEditable={true}
          />
          <LinkComponent userInfoProps={userInfo?.linkList} />
          <Divider />
          <WalletComponent userInfoProps={userInfo?.walletList} />
        </FullContainer>
      )}
    </>
  );
};

export default EditProfilePage;
