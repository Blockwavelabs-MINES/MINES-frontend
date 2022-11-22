import { ContainedButton, TextButton } from "../../components/button";
import { InputBox } from "../../components/input";
import { EditableCard } from "../../components/card";
import styled from "styled-components";

const FullBox = styled.div``;

const ButtonBox = styled.div`
  display: grid;
  margin: 34px;
  gap: 49px;
  grid-template-columns: repeat(2, 1fr);
`;

const ButtonOneContainer = styled.div`
  display: grid;
  gap: 9px;
  grid-template-columns: repeat(2, 1fr);
`;

const typeList = ["primary", "secondary"];
const styleList = ["filled", "outlined"];
const statesList = ["default", "disabled"];
const sizeList = ["large", "medium", "small"];
const label = "Label";
const show_txt = true;

const textStyleList = ["active", "unactive"];
const textSizeList = ["large", "small"];
const textStates = "default";

const inputState = [
  "inactive",
  "filled",
  "typing",
  "verified",
  "error",
  "help",
];
const placeholder = "Place holder";
const message = "Verified Message or Error Message";

const cardMetaData = [
  {
    icon: "https://daotool.s3.ap-northeast-2.amazonaws.com/static/wallet-icon/4fd1f1fe-5869-43c9-a2bf-cdee14c0e4c38.png",
    label: "Link Name",
    isEdit: true,
    isTrash: true,
  },
  {
    icon: "https://daotool.s3.ap-northeast-2.amazonaws.com/static/wallet_kind_icon/da7d03d1-ba3d-46b5-97eb-6cd0f0804e3f1.png",
    label: "Wallet Address",
    isEdit: false,
    isTrash: true,
  },
];

const ComponentTestPage = () => {
  return (
    <>
      <FullBox>
        {sizeList.map((size, sizeIdx) => (
          <ButtonBox>
            {typeList.map((type, typeIdx) => (
              <ButtonOneContainer>
                {statesList.map((state, stateIdx) => (
                  <>
                    {styleList.map((style, styleIdx) => (
                      <ContainedButton
                        type={type}
                        styles={style}
                        states={state}
                        size={size}
                        label={label}
                        show_txt={show_txt}
                      />
                    ))}
                  </>
                ))}
              </ButtonOneContainer>
            ))}
          </ButtonBox>
        ))}
      </FullBox>
      <FullBox>
        {textSizeList.map((size, sizeIdx) => (
          <ButtonBox>
            {textStyleList.map((style, styleIdx) => (
              <TextButton
                styles={style}
                states={textStates}
                size={size}
                label={label}
              />
            ))}
          </ButtonBox>
        ))}
      </FullBox>
      <FullBox>
        {inputState.map((state, stateIdx) => (
          <InputBox
            label={label}
            state={state}
            isRequired={true}
            placeholder={placeholder}
            message={message}
          />
        ))}
      </FullBox>
      <FullBox>
        {cardMetaData.map((data, idx) => (
          <EditableCard
            label={data.label}
            isEdit={data.isEdit}
            isTrash={data.isTrash}
            icon={data.icon}
          />
        ))}
      </FullBox>
    </>
  );
};

export default ComponentTestPage;
