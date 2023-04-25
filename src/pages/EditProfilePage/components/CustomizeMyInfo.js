import imageCompression from "browser-image-compression";
import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Preview } from ".";
import { CustomIcon } from "../../../assets/icons";
import { ContainedButton } from "../../../components/button";
import { EditProfileHeader } from "../../../components/header";
import { UnvalidFormatModal } from "../../../components/modal";
import { editProfileDeco, getProfileDeco } from "../../../utils/api/profile";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import Typography from "../../../utils/style/Typography/index";

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

const ColorHexBox = styled.input`
  width: 100%;
  height: 51px;
  border-radius: 10px;
  border: ${({ state, hexCodeError }) =>
    state === "error" && hexCodeError
      ? `${palette.red_1} solid 1px`
      : `${palette.sky_3} solid 1px`};
  background-color: ${palette.sky_4};
  padding: 15px 16px;
  color: ${palette.grey_1};
  ${Typography.Headline3};
  &:focus {
    outline: none;
    border: ${({ state }) =>
      state === "error"
        ? `${palette.red_1} solid 1px`
        : `${palette.blue_2} solid 1px`};
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
  }
  & {
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
  }
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
  userId,
  setCustomizeMyInfo,
  setInfoChange,
  infoChange,
}) => {
  const [profileDecoData, setProfileDecoData] = useState(false);
  const [backImage, setBackImg] = useState({
    file: "",
    imagePreviewUrl: "",
  });
  const [backImageChange, setBackImageChange] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [backgroundColorPicker, setBackgroundColorPicker] = useState(false);
  const [buttonColor, setButtonColor] = useState("");
  const [buttonColorPicker, setButtonColorPicker] = useState(false);
  const [buttonFontColor, setButtonFontColor] = useState("");
  const [buttonFontColorPicker, setButtonFontColorPicker] = useState(false);
  const [fontColor, setFontColor] = useState("");
  const [fontColorPicker, setFontColorPicker] = useState(false);
  const [backTypeIsColor, setBackTypeIsColor] = useState(false);
  const [previewOn, setPreviewOn] = useState(false);
  const [pickerIndex, setPickerIndex] = useState(-1);
  const [backgroundColorState, setBackgroundColorState] = useState("verified");
  const [buttonColorState, setButtonColorState] = useState("verified");
  const [buttonFontColorState, setButtonFontColorState] = useState("verified");
  const [fontColorState, setFontColorState] = useState("verified");
  const [hexCodeError, setHexCodeError] = useState(false);
  const [showFormatModal, setShowFormatModal] = useState(false);
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

  useEffect(() => {
    getProfileDeco(userId).then((data) => {
      setProfileDecoData(data);
      setBackImg({
        file: data.backgroundImg,
        imagePreviewUrl: data.backgroundImg,
      });
      setBackgroundColor(data.backgroundColor);
      setButtonColor(data.buttonColor);
      setFontColor(data.fontColor);
      setButtonFontColor(data.buttonFontColor);
      setBackTypeIsColor(data.backgroundType === "COLOR");
    });

    setHexCodeError(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pickerIndex]);

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

        setBackImg({
          file: compressedFile,
          imagePreviewUrl: compressedFile,
        });
        reader.onloadend = () => {
          setBackImg({
            file: compressedFile,
            imagePreviewUrl: reader.result,
          });
        };
        reader.readAsDataURL(compressedFile);
        setBackImageChange(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      setBackImg({ file: fileUploaded, imagePreviewUrl: fileUploaded });
      reader.onloadend = () => {
        setBackImg({ file: fileUploaded, imagePreviewUrl: reader.result });
      };
      reader.readAsDataURL(fileUploaded);
      setBackImageChange(true);
    }
  };

  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      console.log(pickerIndex);
      pickerList[pickerIndex].switch(false);
      // setPickerIndex(-1);
    }
  };

  const handleKeyDown = (event) => {
    if (
      (event.keyCode === 8 || event.keyCode === 46) &&
      event.target.value.length === 1
    ) {
      event.preventDefault();
    }
  };

  const saveProfileDecoEdited = async () => {
    if (
      backgroundColorState === "error" ||
      buttonColorState === "error" ||
      buttonFontColorState === "error" ||
      fontColor === "error"
    ) {
      setHexCodeError(true);
      return;
    }
    const formData = new FormData();
    const formJson = {
      background_color: backgroundColor,
      button_color: buttonColor,
      button_font_color: buttonFontColor,
      font_color: fontColor,
    };
    if (backTypeIsColor) {
      formData.append("image", "");
    } else {
      formData.append("image", backImage.file);
    }
    formData.append("data", JSON.stringify(formJson));

    editProfileDeco(formData).then(() => {
      setInfoChange(true);
      setCustomizeMyInfo(false);
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

  const handleBackgroundColorChangeComplete = (color) => {
    setBackgroundColor(color.hex);
    setBackgroundColorState("verified");
    // setBackgroundColor(color.hex + Math.round(color.rgb.a * 255).toString(16));
  };

  const handleButtonColorChangeComplete = (color) => {
    setButtonColor(color.hex);
    setButtonColorState("verified");
    // setButtonColor(color.hex + Math.round(color.rgb.a * 255).toString(16));
  };

  const handleButtonFontColorChangeComplete = (color) => {
    setButtonFontColor(color.hex);
    setButtonFontColorState("verified");
    // setButtonFontColor(color.hex + Math.round(color.rgb.a * 255).toString(16));
  };

  const handleFontColorChangeComplete = (color) => {
    setFontColor(color.hex);
    setFontColorState("verified");
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
          userId={userId}
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
              rightOnClick={saveProfileDecoEdited}
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
                  {backgroundColorPicker && (
                    <PickerBox>
                      <div ref={pickerRef}>
                        <SketchPicker
                          color={backgroundColor}
                          onChangeComplete={handleBackgroundColorChangeComplete}
                        />
                      </div>
                    </PickerBox>
                  )}
                  <ColorPicker
                    color={backgroundColor}
                    onClick={backColorPickerOnClick}
                  />
                  <ColorHexBox
                    onChange={(e) => {
                      let regExp = /^#([A-Fa-f0-9]{6})$/i;
                      if (regExp.test(e.target.value)) {
                        setBackgroundColorState("verified");
                      } else {
                        setBackgroundColorState("error");
                      }
                      setBackgroundColor(e.target.value);
                    }}
                    defaultValue={backgroundColor}
                    state={backgroundColorState}
                    value={backgroundColor}
                    hexCodeError={hexCodeError}
                    maxLength={7}
                    onKeyDown={handleKeyDown}
                  />
                </ColorBar>
              </ComponentBox>
              <ComponentTitle>버튼</ComponentTitle>
              <ComponentBox>
                <SubTitleBox>버튼 색상</SubTitleBox>
                <ColorBar>
                  {buttonColorPicker && (
                    <PickerBox>
                      <div ref={pickerRef}>
                        <SketchPicker
                          color={buttonColor}
                          onChangeComplete={handleButtonColorChangeComplete}
                        />{" "}
                      </div>
                    </PickerBox>
                  )}
                  <ColorPicker
                    color={buttonColor}
                    onClick={buttonColorPickerOnClick}
                  />
                  <ColorHexBox
                    onChange={(e) => {
                      let regExp = /^#([A-Fa-f0-9]{6})$/i;
                      if (regExp.test(e.target.value)) {
                        setButtonColorState("verified");
                      } else {
                        setButtonColorState("error");
                      }
                      setButtonColor(e.target.value);
                    }}
                    defaultValue={buttonColor}
                    state={buttonColorState}
                    value={buttonColor}
                    hexCodeError={hexCodeError}
                    maxLength={7}
                    onKeyDown={handleKeyDown}
                  />
                </ColorBar>
                <SubTitleBox style={{ marginTop: "24px" }}>
                  버튼 폰트 색상
                </SubTitleBox>
                <ColorBar>
                  {buttonFontColorPicker && (
                    <PickerBox>
                      <div ref={pickerRef}>
                        <SketchPicker
                          color={buttonFontColor}
                          onChangeComplete={handleButtonFontColorChangeComplete}
                        />{" "}
                      </div>
                    </PickerBox>
                  )}
                  <ColorPicker
                    color={buttonFontColor}
                    onClick={buttonFontColorPickerOnClick}
                  />
                  <ColorHexBox
                    onChange={(e) => {
                      let regExp = /^#([A-Fa-f0-9]{6})$/i;
                      if (regExp.test(e.target.value)) {
                        setButtonFontColorState("verified");
                      } else {
                        setButtonFontColorState("error");
                      }
                      setButtonFontColor(e.target.value);
                    }}
                    defaultValue={buttonFontColor}
                    state={buttonFontColorState}
                    value={buttonFontColor}
                    hexCodeError={hexCodeError}
                    maxLength={7}
                    onKeyDown={handleKeyDown}
                  />
                </ColorBar>
              </ComponentBox>
              <ComponentTitle>폰트</ComponentTitle>
              <ComponentBox style={{ marginBottom: "350px" }}>
                <SubTitleBox>폰트 색상</SubTitleBox>
                <ColorBar>
                  {fontColorPicker && (
                    <PickerBox>
                      <div ref={pickerRef}>
                        <SketchPicker
                          color={fontColor}
                          onChangeComplete={handleFontColorChangeComplete}
                        />{" "}
                      </div>
                    </PickerBox>
                  )}
                  <ColorPicker
                    color={fontColor}
                    onClick={fontColorPickerOnClick}
                  />
                  <ColorHexBox
                    onChange={(e) => {
                      let regExp = /^#([A-Fa-f0-9]{6})$/i;
                      if (regExp.test(e.target.value)) {
                        setFontColorState("verified");
                      } else {
                        setFontColorState("error");
                      }
                      setFontColor(e.target.value);
                    }}
                    defaultValue={fontColor}
                    state={fontColorState}
                    value={fontColor}
                    hexCodeError={hexCodeError}
                    maxLength={7}
                    onKeyDown={handleKeyDown}
                  />
                </ColorBar>
              </ComponentBox>
            </ContentBox>
            <UnvalidFormatModal
              visible={showFormatModal}
              onClickEvent={() => {
                setShowFormatModal(false);
              }}
            />
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
