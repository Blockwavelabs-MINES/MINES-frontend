import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { EditProfileHeader } from "../../../components/header";
import { IconButton } from "../../../components/button";
import { DeleteModal } from "../../../components/modal";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { ProfileCard } from "../../../components/card";
import { setLocalUserInfo } from "../../../utils/functions/setLocalVariable";
import { CameraIcon, ProfileLarge } from "../../../assets/icons";
import { InputBox, TextAreaBox } from "../../../components/input";
import { editProfile } from "../../../utils/api/auth";
import imageCompression from "browser-image-compression";
import { useTranslation } from "react-i18next";

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
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [realDelete, setRealDelete] = useState(false);
  const { t } = useTranslation();
  // useEffect(() => {
  //   if (introduction.length > 100) {
  //     setIntroduction(introduction.substr(0, 100));
  //   }
  // }, [introduction]);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
    // console.log("??");

    // alert("준비중인 기능입니다.");
  };

  const handleChange = async (event) => {
    console.log("hello");
    let reader = new FileReader();
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    let imageSize = fileUploaded.size / 1024 / 1024;
    console.log(imageSize, "MB");

    if (imageSize > 5) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(fileUploaded, options);
        console.log(
          "compressedFile instanceof Blob",
          compressedFile instanceof Blob
        ); // true
        console.log(
          `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        ); // smaller than maxSizeMB

        setProfileImage({
          file: compressedFile,
          imagePreviewUrl: compressedFile,
        });
        reader.onloadend = () => {
          setProfileImage({
            file: compressedFile,
            imagePreviewUrl: reader.result,
          });
        };
        reader.readAsDataURL(compressedFile);
        setProfileImageChange(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      setProfileImage({ file: fileUploaded, imagePreviewUrl: fileUploaded });
      reader.onloadend = () => {
        setProfileImage({ file: fileUploaded, imagePreviewUrl: reader.result });
      };
      reader.readAsDataURL(fileUploaded);
      setProfileImageChange(true);
    }
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

    const formData = new FormData();

    formData.append("profileImage", profileImage?.file);

    const formJson = {
      frontKey: process.env.REACT_APP_3TREE_API_KEY,
      profileName: name,
      profileBio: introduction,
    };

    formData.append("json", JSON.stringify(formJson));

    const editProfileResult = await editProfile(
      userInfo?.user.user_id,
      formData
    ).then((data) => {
      console.log(data);
      setLocalUserInfo({
        type: "edit",
        editKey: ["user", "profile_name"],
        editValue: name,
      });
      setLocalUserInfo({
        type: "edit",
        editKey: ["user", "profile_img"],
        editValue: profileImage.imagePreviewUrl,
      });
      setLocalUserInfo({
        type: "edit",
        editKey: ["user", "profile_bio"],
        editValue: introduction,
      });

      setEditMyInfo();
      setInfoChange(!infoChange);
    });
  };

  const hiddenFileInput = useRef(null);

  const closeCancelModal = () => {
    setCancelModalOpen(false);
  };

  const leftOnClick = () => {
    setCancelModalOpen(true);
  };

  const subDeleteOnClick = () => {
    setEditMyInfo(false);
    console.log("hi");
  };

  return (
    <>
      <FullContainer>
        <EditProfileHeader
          title={t("editProfilePageHeader")}
          leftOnClick={leftOnClick}
          rightOnClick={saveEditUserInfo}
        />
        <>
          {cancelModalOpen ? (
            <DeleteModal
              visible={cancelModalOpen}
              closable={true}
              maskClosable={true}
              onClose={closeCancelModal}
              text={<>{t("manageProfilePageAlert1")}</>}
              setRealDelete={setRealDelete}
              buttonText={t("manageProfilePageAlert2")}
              subDeleteOnClick={subDeleteOnClick}
            />
          ) : (
            <></>
          )}
        </>
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
              {t("editProfilePage2")}
              <br />
              {t("editProfilePage3")}
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
            label={t("editProfilePage4")}
            state="inactive"
            isRequired={true}
            placeholder={t("editProfilePage4")}
            value={name}
            onChange={(e) => nameOnChange(e)}
          />
          <TextAreaBox
            label={t("editProfilePage5")}
            placeholder={t("editProfilePage6")}
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
