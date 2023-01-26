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
  CustomizeMyInfo,
} from "./components";
import { ProfileCard } from "../../components/card";
import { getLocalUserInfo } from "../../utils/functions/setLocalVariable";
import { getUserInfo } from "../../utils/api/auth";
import { useTranslation } from "react-i18next";

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
  const [customizeMyInfo, setCustomizeMyInfo] = useState(false);
  const [infoChange, setInfoChange] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    var globalUserInfo = getLocalUserInfo();
    if (globalUserInfo) {
      console.log(globalUserInfo);
      (async () => {
        const getUserInfoResult = await getUserInfo(
          globalUserInfo.user.user_id
        ).then((data) => {
          console.log(data);
          setUserInfo(data);
        });
      })();
    } else {
      alert(t("introPageAlert1"));
      window.location.href = "/";
    }
  }, [infoChange, customizeMyInfo]);

  const closeLoginModal = () => {
    setLoginModalVisible(false);
  };

  const editOnClick = () => {
    setEditMyInfo(true);
  };

  const customizeOnClick = () => {
    setCustomizeMyInfo(true);
  };

  return (
    <>
      {editMyInfo ? (
        <EditMyInfo
          userInfo={userInfo}
          setEditMyInfo={setEditMyInfo}
          setInfoChange={setInfoChange}
          infoChange={infoChange}
        />
      ) : (
        <>
          {customizeMyInfo ? (
            <CustomizeMyInfo
              userInfo={userInfo}
              setCustomizeMyInfo={setCustomizeMyInfo}
              setInfoChange={setInfoChange}
              infoChange={infoChange}
            />
          ) : (
            <FullContainer>
              <SettingProfileHeader
                info={userInfo}
                title={t("manageProfilePageHeader")}
              />
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
                profileImg={userInfo?.user.profile_img}
                userName={userInfo?.user.profile_name}
                introduction={userInfo?.user.profile_bio}
                onClick={editOnClick}
                onClickRight={customizeOnClick}
                isEditable={true}
              />
              <LinkComponent
                userInfoProps={userInfo}
                setInfoChange={setInfoChange}
                infoChange={infoChange}
              />
              {/* <Divider /> */}
              <WalletComponent
                userInfoProps={userInfo}
                setInfoChange={setInfoChange}
                infoChange={infoChange}
              />
            </FullContainer>
          )}
        </>
      )}
    </>
  );
};

export default EditProfilePage;
