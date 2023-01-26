import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { EditProfileHeader } from "../../../components/header";
import { IconButton, ContainedButton } from "../../../components/button";
import { DeleteModal } from "../../../components/modal";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { ProfileCard } from "../../../components/card";
import { setLocalUserInfo } from "../../../utils/functions/setLocalVariable";
import { CustomIcon } from "../../../assets/icons";
import { InputBox, TextAreaBox } from "../../../components/input";
import { editProfile } from "../../../utils/api/auth";
import imageCompression from "browser-image-compression";
import { useTranslation } from "react-i18next";
import { SketchPicker } from "react-color";
import { Preview } from ".";
import {
  editDecoBackground,
  editDecoButton,
  editDecoFont,
} from "../../../utils/api/profile";

const FullContainer = styled.div`
  width: 100%;
  //   height: 100%;
  min-height: calc(100vh + 300px);
  position: relative;
  padding-top: 75px;
`;

const ContentBox = styled.div`
  padding: 44px 20px;
`;

const ComponentTitle = styled.div`
  ${Typography.Headline1}
  margin-bottom: 12px;
`;

const ComponentBox = styled.div`
  padding: 24px 0px;
  box-shadow: 0px 13px 40px 0px #e9eaeccc;
  border-radius: 20px;
  background-color: ${palette.white};
  margin-bottom: 48px;
`;

const SelectBackTypeBox = styled.div`
  display: flex;
  gap: 20px;
  padding: 0px 20px;
  padding-bottom: 24px;
`;

const BackTypeBox = styled.div`
  width: 100%;
`;

const BackTypeColorBox = styled.button`
  width: 100%;
  height: 220px;
  border-radius: 23px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${(props) => (props.color ? props.color : palette.grey_5)};
  position: relative;
  border: hidden;
  box-shadow: ${(props) =>
    props.is
      ? `0 0 0 2px ${palette.grey_1} inset, 0 0 0 8px ${palette.white} inset`
      : "0 0 0 0"};
  filter: ${(props) => (props.is ? "" : "opacity(50%)")};
`;

const BackTypeTextBox = styled.div`
  ${Typography.Footer}
  color: ${palette.grey_1};
  margin-top: 8px;
  width: 100%;
  text-align: center;
`;

const SubTitleBox = styled.div`
  padding: 8px 20px;
  ${Typography.Headline2}
  margin-bottom: 12px;
`;

const ColorBar = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  padding: 0px 16px;
  position: relative;
`;

const ColorPicker = styled.button`
  min-width: 51px;
  height: 51px;
  border-radius: 10px;
  border: 1px solid ${palette.grey_7};
  background-color: ${(props) => props.color};
`;

const ColorHexBox = styled.div`
  width: 100%;
  height: 51px;
  border-radius: 10px;
  border: 1px solid ${palette.sky_3};
  background-color: ${palette.sky_4};
  padding: 15px 16px;
  color: ${palette.grey_1};
  ${Typography.Headline3};
`;

const PickerBox = styled.div`
  position: absolute;
  top: 55px;
  z-index: 90;
`;

const CustomIconButton = styled.img`
  width: 36px;
  height: 36px;
  position: absolute;
  transform: translate(-50%, -50%);
`;

const ButtonContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 88px;
  padding: 16px 20px;
  position: fixed;
  bottom: 0px;
  display: flex;
  z-index: 100;
  backdrop-filter: blur(15px);
`;

const CustomizeMyInfo = ({
  userInfo,
  setCustomizeMyInfo,
  setInfoChange,
  infoChange,
}) => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [backImage, setProfileImage] = useState({
    file: userInfo?.profileDecorate?.background_img,
    imagePreviewUrl: userInfo?.profileDecorate?.background_img,
  });
  const [backImageChange, setProfileImageChange] = useState(false);
  const [name, setName] = useState(userInfo?.user.profile_name);
  const [introduction, setIntroduction] = useState(userInfo?.user.profile_bio);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [realDelete, setRealDelete] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(
    userInfo?.profileDecorate?.background_color
  );
  const [backgroundColorPicker, setBackgroundColorPicker] = useState(false);
  const [buttonColor, setButtonColor] = useState(
    userInfo?.profileDecorate?.button_color
  );
  const [buttonColorPicker, setButtonColorPicker] = useState(false);
  const [buttonFontColor, setButtonFontColor] = useState(
    userInfo?.profileDecorate?.button_font_color
  );
  const [buttonFontColorPicker, setButtonFontColorPicker] = useState(false);
  const [fontColor, setFontColor] = useState(
    userInfo?.profileDecorate?.font_color
  );
  const [fontColorPicker, setFontColorPicker] = useState(false);
  const [backTypeIsColor, setBackTypeIsColor] = useState(
    userInfo?.profileDecorate?.background_type == "COLOR"
  );
  const [previewOn, setPreviewOn] = useState(false);
  const [pickerIndex, setPickerIndex] = useState(-1);
  const pickerRef = useRef(null);

  const pickerList = [
    {
      value: backgroundColor,
      switch: setBackgroundColorPicker,
    },
    {
      value: buttonColor,
      switch: setButtonColorPicker,
    },
    {
      value: buttonFontColor,
      switch: setButtonFontColorPicker,
    },
    {
      value: fontColor,
      switch: setFontColorPicker,
    },
  ];

  const { t } = useTranslation();
  // useEffect(() => {
  //   if (introduction.length > 100) {
  //     setIntroduction(introduction.substr(0, 100));
  //   }
  // }, [introduction]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pickerIndex]);

  useEffect(() => {
    (async () => {
      const formData = new FormData();

      formData.append("backgroundImg", backImage?.file);

      const formJson = {
        jwtToken: JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCAL_USER_INFO_NAME)
        )?.jwtToken,
        backgroundType: backTypeIsColor ? "COLOR" : "IMAGE",
        backgroundColor: backgroundColor,
      };

      formData.append("json", JSON.stringify(formJson));
      const editDecoBackgroundResult = await editDecoBackground(
        userInfo?.user?.user_id,
        formData
      );
    })();
  }, [backgroundColor, backImage, backTypeIsColor]);

  useEffect(() => {
    (async () => {
      const editDecoButtonResult = await editDecoButton(
        userInfo?.user?.user_id,
        buttonColor,
        buttonFontColor
      );
    })();
  }, [buttonColor, buttonFontColor]);

  useEffect(() => {
    (async () => {
      const editDecoFontResult = await editDecoFont(
        userInfo?.user?.user_id,
        fontColor
      );
    })();
  }, [fontColor]);

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

  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      console.log(pickerIndex);
      pickerList[pickerIndex].switch(false);
      // setPickerIndex(-1);
    }
  };

  const saveEditUserInfo = async () => {
    // const saveData = {
    //   userId: name,
    //   userToken: "",
    //   profileImg: backImage.imagePreviewUrl,
    //   introduction: introduction,
    // };
    // setLocalUserInfo({ type: "init", data: saveData });
    console.log(userInfo?.user.profile_name);

    const formData = new FormData();

    formData.append("backImage", backImage?.file);

    const formJson = {
      frontKey: process.env.REACT_APP_3TREE_API_KEY,
      jwtToken: JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCAL_USER_INFO_NAME)
      )?.jwtToken,
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
        editValue: backImage.imagePreviewUrl,
      });
      setLocalUserInfo({
        type: "edit",
        editKey: ["user", "profile_bio"],
        editValue: introduction,
      });

      setCustomizeMyInfo();
      setInfoChange(!infoChange);
    });
  };

  const hiddenFileInput = useRef(null);

  const closeCancelModal = () => {
    setCancelModalOpen(false);
  };

  const leftOnClick = () => {
    // setCancelModalOpen(true);
    setCustomizeMyInfo(false);
  };

  const subDeleteOnClick = () => {
    setCustomizeMyInfo(false);
    console.log("hi");
  };

  const handleBackgroundColorChangeComplete = (color) => {
    setBackgroundColor(color.hex);
    // setBackgroundColor(color.hex + Math.round(color.rgb.a * 255).toString(16));
  };

  const handleButtonColorChangeComplete = (color) => {
    setButtonColor(color.hex);
    // setButtonColor(color.hex + Math.round(color.rgb.a * 255).toString(16));
  };

  const handleButtonFontColorChangeComplete = (color) => {
    setButtonFontColor(color.hex)
    // setButtonFontColor(color.hex + Math.round(color.rgb.a * 255).toString(16));
  };

  const handleFontColorChangeComplete = (color) => {
    setFontColor(color.hex)
    // setFontColor(color.hex + Math.round(color.rgb.a * 255).toString(16));
  };

  const backColorPickerOnClick = () => {
    // if (!backgroundColorPicker) {
    setPickerIndex(0);
    // }
    setBackgroundColorPicker(!backgroundColorPicker);
  };

  const buttonColorPickerOnClick = () => {
    // if (!buttonColorPicker) {
    setPickerIndex(1);
    // }
    setButtonColorPicker(!buttonColorPicker);
  };

  const buttonFontColorPickerOnClick = () => {
    // if (!buttonFontColorPicker) {
    setPickerIndex(2);
    // }
    setButtonFontColorPicker(!buttonFontColorPicker);
  };

  const fontColorPickerOnClick = () => {
    // if (!fontColorPicker) {
    setPickerIndex(3);
    // }
    setFontColorPicker(!fontColorPicker);
  };

  return (
    <>
      {previewOn ? (
        <Preview
          userInfo={userInfo}
          setPreviewOn={setPreviewOn}
          backgroundColor={backgroundColor}
          backImage={backTypeIsColor ? "" : backImage}
          buttonColor={buttonColor}
          buttonFontColor={buttonFontColor}
          fontColor={fontColor}
        />
      ) : (
        <>
          <FullContainer>
            <EditProfileHeader
              title={t("manageProfilePage11")}
              leftOnClick={leftOnClick}
              rightOnClick={saveEditUserInfo}
            />
            <>
              {/* {cancelModalOpen ? (
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
              )} */}
            </>
            <ContentBox>
              <ComponentTitle>배경</ComponentTitle>
              <ComponentBox>
                <SelectBackTypeBox>
                  <BackTypeBox>
                    <BackTypeColorBox
                      is={backTypeIsColor}
                      color={backgroundColor}
                      onClick={() => setBackTypeIsColor(true)}
                    />
                    <BackTypeTextBox>색상</BackTypeTextBox>
                  </BackTypeBox>
                  <BackTypeBox>
                    <BackTypeColorBox
                      is={!backTypeIsColor}
                      style={{
                        backgroundImage: `url(${
                          backImage.imagePreviewUrl
                            ? backImage.imagePreviewUrl
                            : ""
                        })`,
                      }}
                      onClick={() => {
                        handleClick();
                        setBackTypeIsColor(false);
                      }}
                    >
                      <CustomIconButton src={CustomIcon} />
                      <input
                        type="file"
                        ref={hiddenFileInput}
                        onChange={(e) => {
                          console.log("hi");
                          handleChange(e);
                        }}
                        style={{ display: "none" }}
                      />
                    </BackTypeColorBox>
                    <BackTypeTextBox>이미지</BackTypeTextBox>
                  </BackTypeBox>
                </SelectBackTypeBox>
                <SubTitleBox>배경 색상</SubTitleBox>
                <ColorBar>
                  {backgroundColorPicker ? (
                    <PickerBox>
                      <div ref={pickerRef}>
                        <SketchPicker
                          color={backgroundColor}
                          onChangeComplete={handleBackgroundColorChangeComplete}
                        />
                      </div>
                    </PickerBox>
                  ) : (
                    <></>
                  )}
                  <ColorPicker
                    color={backgroundColor}
                    onClick={backColorPickerOnClick}
                  />
                  <ColorHexBox>{backgroundColor}</ColorHexBox>
                </ColorBar>
              </ComponentBox>
              <ComponentTitle>버튼</ComponentTitle>
              <ComponentBox>
                <SubTitleBox>버튼 색상</SubTitleBox>
                <ColorBar>
                  {buttonColorPicker ? (
                    <PickerBox>
                      <div ref={pickerRef}>
                        <SketchPicker
                          color={buttonColor}
                          onChangeComplete={handleButtonColorChangeComplete}
                        />{" "}
                      </div>
                    </PickerBox>
                  ) : (
                    <></>
                  )}
                  <ColorPicker
                    color={buttonColor}
                    onClick={buttonColorPickerOnClick}
                  />
                  <ColorHexBox>{buttonColor}</ColorHexBox>
                </ColorBar>
                <SubTitleBox style={{ marginTop: "24px" }}>
                  버튼 폰트 색상
                </SubTitleBox>
                <ColorBar>
                  {buttonFontColorPicker ? (
                    <PickerBox>
                      <div ref={pickerRef}>
                        <SketchPicker
                          color={buttonFontColor}
                          onChangeComplete={handleButtonFontColorChangeComplete}
                        />{" "}
                      </div>
                    </PickerBox>
                  ) : (
                    <></>
                  )}
                  <ColorPicker
                    color={buttonFontColor}
                    onClick={buttonFontColorPickerOnClick}
                  />
                  <ColorHexBox>{buttonFontColor}</ColorHexBox>
                </ColorBar>
              </ComponentBox>
              <ComponentTitle>폰트</ComponentTitle>
              <ComponentBox style={{ marginBottom: "350px" }}>
                <SubTitleBox>폰트 색상</SubTitleBox>
                <ColorBar>
                  {fontColorPicker ? (
                    <PickerBox>
                      <div ref={pickerRef}>
                        <SketchPicker
                          color={fontColor}
                          onChangeComplete={handleFontColorChangeComplete}
                        />{" "}
                      </div>
                    </PickerBox>
                  ) : (
                    <></>
                  )}
                  <ColorPicker
                    color={fontColor}
                    onClick={fontColorPickerOnClick}
                  />
                  <ColorHexBox>{fontColor}</ColorHexBox>
                </ColorBar>
              </ComponentBox>
            </ContentBox>
          </FullContainer>
          <ButtonContainer>
            <ContainedButton
              type="primary"
              styles="filled"
              states="default"
              size="large"
              label="미리보기"
              onClick={() => setPreviewOn(true)}
            />
          </ButtonContainer>
        </>
      )}
    </>
  );
};

export default CustomizeMyInfo;
