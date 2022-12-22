import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { EditProfileHeader } from "../../../components/header";
import { IconButton } from "../../../components/button";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { ProfileCard } from "../../../components/card";
import { setLocalUserInfo } from "../../../utils/functions/setLocalVariable";
import { CameraIcon, ProfileLarge } from "../../../assets/icons";
import { InputBox, TextAreaBox } from "../../../components/input";
import { editProfile } from "../../../utils/api/auth";

const FullContainer = styled.div`
  width: 100%;
  //   height: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 75px;
`;

const InnerContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: grid;
  gap: 25px;
`;

const ProfileImageButtonContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 50px;
`;

const ProfileImageButton = styled.button`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border: 1px solid #777777;
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 30px;
  margin: 0px auto;
  position: relative;
  text-align: center;
`;

const ProfileFilter = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  backdrop-filter: brightness(30%);
  display: flex;
  align-items: center;
  justify-content: center;
  ${Typography.Caption1}
  position: absolute;
  top: 0px;
  right: 0px;
`;

const EditMyInfo = ({ userInfo, setEditMyInfo, setInfoChange, infoChange }) => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState({
    file: userInfo?.user.profile_img,
    imagePreviewUrl: userInfo?.user.profile_img,
  });
  const [profileImageChange, setProfileImageChange] = useState(false);
  const [name, setName] = useState(userInfo?.user.profile_name);
  const [introduction, setIntroduction] = useState(userInfo?.user.profile_bio);

  // useEffect(() => {
  //   if (introduction.length > 100) {
  //     setIntroduction(introduction.substr(0, 100));
  //   }
  // }, [introduction]);

  const handleClick = (event) => {
    // hiddenFileInput.current.click();
    // console.log("??");

    alert("준비중인 기능입니다.");
  };

  const handleChange = (event) => {
    console.log("hello");
    let reader = new FileReader();
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    setProfileImage({ file: fileUploaded, imagePreviewUrl: fileUploaded });
    reader.onloadend = () => {
      setProfileImage({ file: fileUploaded, imagePreviewUrl: reader.result });
    };
    reader.readAsDataURL(fileUploaded);
    setProfileImageChange(true);
  };

  const nameOnChange = (e) => {
    setName(e.target.value);
  };

  const introductionOnChange = (e) => {
    if (e.target.value.length < 101) {
      setIntroduction(e.target.value);
    } else {
      setIntroduction(e.target.value.substr(0, 100));
    }
  };

  const saveEditUserInfo = async () => {
    // const saveData = {
    //   userId: name,
    //   userToken: "",
    //   profileImg: profileImage.imagePreviewUrl,
    //   introduction: introduction,
    // };
    // setLocalUserInfo({ type: "init", data: saveData });
    console.log(userInfo?.user.profile_name);

    const editProfileResult = await editProfile(
      userInfo?.user.user_id,
      name,
      introduction
    ).then((data) => {
      console.log(data);
      // setLocalUserInfo({
      //   type: "edit",
      //   editKey: ["user", "profile_name"],
      //   editValue: name,
      // });
      // setLocalUserInfo({
      //   type: "edit",
      //   editKey: ["user", "profile_img"],
      //   editValue: profileImage.imagePreviewUrl,
      // });
      // setLocalUserInfo({
      //   type: "edit",
      //   editKey: ["user", "profile_bio"],
      //   editValue: introduction,
      // });

      setEditMyInfo();
      setInfoChange(!infoChange);
    });
  };

  const hiddenFileInput = useRef(null);

  return (
    <>
      <FullContainer>
        <EditProfileHeader
          title="내 정보 수정"
          leftOnClick={setEditMyInfo}
          rightOnClick={saveEditUserInfo}
        />
        <ProfileImageButtonContainer>
          <ProfileImageButton
            onClick={handleClick}
            style={{
              backgroundImage: `url(${
                profileImage.imagePreviewUrl
                  ? profileImage.imagePreviewUrl
                  : ProfileLarge
              })`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <ProfileFilter>
              프로필 사진
              <br />
              (최대 5MB)
            </ProfileFilter>
            <IconButton
              type="primary"
              styles="filled"
              states="default"
              size="small"
              icon={CameraIcon}
              style={{
                position: "absolute",
                bottom: "0px",
                right: "0px",
                backgroundColor: palette.blue_2,
              }}
            />
          </ProfileImageButton>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={(e) => {
              handleChange(e);
            }}
            style={{ display: "none" }}
          />
        </ProfileImageButtonContainer>
        <InnerContainer>
          <InputBox
            label="이름"
            state="inactive"
            isRequired={true}
            placeholder="이름"
            value={name}
            onChange={(e) => nameOnChange(e)}
          />
          <TextAreaBox
            label="소개"
            placeholder="자신을 소개하는 말을 적어주세요."
            value={introduction}
            onChange={(e) => introductionOnChange(e)}
            maxSize={100}
          />
        </InnerContainer>
      </FullContainer>
    </>
  );
};

export default EditMyInfo;
