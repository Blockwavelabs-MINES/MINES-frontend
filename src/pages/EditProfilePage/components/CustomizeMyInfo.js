import { CustomIcon } from "assets/icons";
import imageCompression from "browser-image-compression";
import { ContainedButton } from "components/button";
import { EditProfileHeader } from "components/header";
import { UnvalidModal } from "components/modal";
import { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { editProfileDeco, getProfileDeco } from "utils/api/profile";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";
import { Preview } from ".";

const FullContainer = styled.div`
  width: 100%;
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
    outline: ${({ state }) =>
      state === "error"
        ? `${palette.red_1} solid 1px`
        : `${palette.blue_2} solid 1px`};
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

const CustomizeMyInfo = ({ userId, setCustomizeMyInfo, setInfoChange }) => {
  const [backImage, setBackImg] = useState({
    file: "",
    imagePreviewUrl: "",
  });
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
      } catch (error) {
        console.log(error);
      }
    } else {
      setBackImg({ file: fileUploaded, imagePreviewUrl: fileUploaded });
      reader.onloadend = () => {
        setBackImg({ file: fileUploaded, imagePreviewUrl: reader.result });
      };
      reader.readAsDataURL(fileUploaded);
    }
  };

  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      pickerList[pickerIndex].switch(false);
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

    if (!backTypeIsColor) {
      formData.append("image", backImage.file);
    }

    formData.append("backgroundColor", backTypeIsColor ? backgroundColor : '');
    formData.append("buttonColor", buttonColor);
    formData.append("buttonFontColor", buttonFontColor);
    formData.append("fontColor", fontColor);

    editProfileDeco(formData).then(() => {
      setInfoChange(true);
      setCustomizeMyInfo(false);
    });
  };

  const hiddenFileInput = useRef(null);

  const leftOnClick = () => {
    setCustomizeMyInfo(false);
  };

  const handleBackgroundColorChangeComplete = (color) => {
    setBackgroundColor(color.hex);
    setBackgroundColorState("verified");
  };

  const handleButtonColorChangeComplete = (color) => {
    setButtonColor(color.hex);
    setButtonColorState("verified");
  };

  const handleButtonFontColorChangeComplete = (color) => {
    setButtonFontColor(color.hex);
    setButtonFontColorState("verified");
  };

  const handleFontColorChangeComplete = (color) => {
    setFontColor(color.hex);
    setFontColorState("verified");
  };

  const backColorPickerOnClick = () => {
    setPickerIndex(0);
    setBackgroundColorPicker(!backgroundColorPicker);
  };

  const buttonColorPickerOnClick = () => {
    setPickerIndex(1);
    setButtonColorPicker(!buttonColorPicker);
  };

  const buttonFontColorPickerOnClick = () => {
    setPickerIndex(2);
    setButtonFontColorPicker(!buttonFontColorPicker);
  };

  const fontColorPickerOnClick = () => {
    setPickerIndex(3);
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
            <ContentBox>
              <ComponentTitle>{t("customizeProfilePage1")}</ComponentTitle>
              <ComponentBox>
                <SelectBackTypeBox>
                  <BackTypeBox>
                    <BackTypeColorBox
                      is={backTypeIsColor}
                      color={backgroundColor}
                      onClick={() => setBackTypeIsColor(true)}
                    />
                    <BackTypeTextBox>{t("customizeProfilePage2")}</BackTypeTextBox>
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
                    <BackTypeTextBox>{t("customizeProfilePage3")}</BackTypeTextBox>
                  </BackTypeBox>
                </SelectBackTypeBox>
                <SubTitleBox>{t("customizeProfilePage4")}</SubTitleBox>
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
              <ComponentTitle>{t("customizeProfilePage5")}</ComponentTitle>
              <ComponentBox>
                <SubTitleBox>{t("customizeProfilePage6")}</SubTitleBox>
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
                  {t("customizeProfilePage7")}
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
              <ComponentTitle>{t("customizeProfilePage8")}</ComponentTitle>
              <ComponentBox style={{ marginBottom: "350px" }}>
                <SubTitleBox>{t("customizeProfilePage9")}</SubTitleBox>
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
            <UnvalidModal
              visible={showFormatModal}
              onClickEvent={() => {
                setShowFormatModal(false);
              }}
              mainText={t("unvalidFormatModal1")}
              subText={t("unvalidFormatModal2")}
            />
          </FullContainer>
          <ButtonContainer>
            <ContainedButton
              type="primary"
              styles="filled"
              states="default"
              size="large"
              label={t("customizeProfilePage10")}
              onClick={() => setPreviewOn(true)}
            />
          </ButtonContainer>
        </>
      )}
    </>
  );
};

export default CustomizeMyInfo;
