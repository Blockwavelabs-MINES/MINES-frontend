import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { EditProfileHeader } from "../../../components/header";
import { IconButton } from "../../../components/button";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { ProfileCard } from "../../../components/card";
import { getLocalUserInfo } from "../../../utils/functions/setLocalVariable";
import { CameraIcon, ProfileLarge } from "../../../assets/icons";
import { InputBox } from "../../../components/input";

const FullContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const InnerContainer = styled.div`
  width: 100%;
  padding: 20px;
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
`;

const EditMyInfo = ({ userInfo, setEditMyInfo }) => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState({
    file: userInfo.profileImg,
    imagePreviewUrl: userInfo.profileImg,
  });
  const [profileImageChange, setProfileImageChange] = useState(false);
  const [name, setName] = useState("");

  const handleClick = (event) => {
    hiddenFileInput.current.click();
    console.log("??");
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

  const hiddenFileInput = useRef(null);

  return (
    <>
      <FullContainer>
        <EditProfileHeader
          title="내 정보 수정"
          leftOnClick={setEditMyInfo}
          rightOnClick={setEditMyInfo}
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
        </InnerContainer>
      </FullContainer>
    </>
  );
};

export default EditMyInfo;
