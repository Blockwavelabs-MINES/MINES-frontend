import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { EditProfileHeader } from "../../../components/header";
import { IconButton } from "../../../components/button";
import { DeleteModal, UnvalidFormatModal } from "../../../components/modal";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { CameraIcon, ProfileDefault } from "../../../assets/icons";
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

const ProfileImageButton = styled.div`
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
  const [profileImage, setProfileImage] = useState({
    file: userInfo?.profileImg,
    imagePreviewUrl: userInfo?.profileImg,
  });
  const [profileImageChange, setProfileImageChange] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [name, setName] = useState(userInfo?.profileName);
  const [introduction, setIntroduction] = useState(userInfo?.profileBio);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [realDelete, setRealDelete] = useState(false);
  const [nameInputState, setNameInputState] = useState("invalid");
  const [showFormatModal, setShowFormatModal] = useState(false);
  const { t } = useTranslation();

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = async (event) => {
    let reader = new FileReader();
    const fileUploaded = event.target.files[0];
    if (
      !["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
        fileUploaded.type
      )
    ) {
      setShowFormatModal(true);
      setTimeout(() => {
        setShowFormatModal(false);
      }, 4000);
      return;
    } else {
      setShowFormatModal(false);
    }
    setNewProfileImage(fileUploaded);
    let imageSize = fileUploaded?.size / 1024 / 1024;

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
        setNewProfileImage(compressedFile);
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

  useEffect(() => {
    if (!name) {
      setNameInputState("error");
    } else {
      setNameInputState("invalid");
    }
  }, [name]);

  const introductionOnChange = (e) => {
    if (e.target.value.length < 101) {
      setIntroduction(e.target.value);
    } else {
      setIntroduction(e.target.value.substr(0, 100));
    }
  };

  const saveEditUserInfo = async () => {
    if (!name) {
      return;
    }
    const formData = new FormData();
    const formJson = {
      profile_name: name,
      profile_description: introduction,
    };
    formData.append("image", profileImageChange ? newProfileImage : null);
    formData.append("profile", JSON.stringify(formJson));

    await editProfile(formData).then(() => {
      setEditMyInfo();
      setInfoChange(!infoChange);
    });
  };

  const hiddenFileInput = useRef(null);

  const closeCancelModal = () => {
    setCancelModalOpen(false);
  };

  const leftOnClick = () => {
    if (
      name === userInfo?.profileName &&
      introduction === userInfo?.profileBio
    ) {
      setEditMyInfo(false);
    } else {
      setCancelModalOpen(true);
    }
  };

  const subDeleteOnClick = () => {
    setEditMyInfo(false);
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
                  : ProfileDefault
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
            state={nameInputState}
            isRequired={true}
            placeholder={t("editProfilePage4")}
            value={name}
            onChange={(e) => nameOnChange(e)}
            message={!name && t("editProfilePage7")}
          />
          <TextAreaBox
            label={t("editProfilePage5")}
            placeholder={t("editProfilePage6")}
            value={introduction}
            onChange={(e) => introductionOnChange(e)}
            maxSize={100}
          />
        </InnerContainer>
        <UnvalidFormatModal
          visible={showFormatModal}
          onClickEvent={() => {
            setShowFormatModal(false);
          }}
        />
      </FullContainer>
    </>
  );
};

export default EditMyInfo;
