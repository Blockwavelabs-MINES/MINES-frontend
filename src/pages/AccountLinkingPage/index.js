import { LoginHeader } from "components/header";
import { useState } from "react";
import styled from "styled-components";

const FullContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 75px;
`;

const SettingPage = () => {
  const [isTwitterOn, setIsTwitterOn] = useState(false);
  const handleToggle = () => {
    setIsTwitterOn(!isTwitterOn);
    console.log("twitter");
    //1. 서버에 step1 요청

    //2. step1응답 바탕으로 Url 생성
    //     window.location.href = "";
    //   };
    // 응답 전달.
  };

  //3. step3 응답받으면

  return (
    <FullContainer>
      <LoginHeader />
      <h2>Twitter</h2>
      <SwitchContainer>
        <HiddenInput
          type="checkbox"
          checked={isTwitterOn}
          onChange={handleToggle}
        />
        <RoundSlider className={isTwitterOn ? "slider checked" : "slider"} />
      </SwitchContainer>
    </FullContainer>
  );
};

export default SettingPage;

const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const HiddenInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + .slider {
    background-color: #2196f3;
  }

  &:checked + .slider:before {
    transform: translateX(26px);
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;

  &:before {
    content: "";
    position: absolute;
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
  }
`;

const RoundSlider = styled(Slider)`
  border-radius: 34px;

  &:before {
    border-radius: 50%;
  }
`;
