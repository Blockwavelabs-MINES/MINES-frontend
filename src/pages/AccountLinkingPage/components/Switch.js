import { useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "utils/style/Color/colors";

const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 38px;
  height: 20px;
`;

const HiddenInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + .slider {
    background-color: ${palette.blue_1};
  }

  &:checked + .slider:before {
    transform: translateX(18px);
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${palette.grey_5};
  transition: 0.4s;

  &:before {
    content: "";
    position: absolute;
    height: 18px;
    width: 18px;
    left: 1px;
    bottom: 1px;
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

const Switch = () => {
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
    <SwitchContainer>
      <HiddenInput
        type="checkbox"
        checked={isTwitterOn}
        onChange={handleToggle}
      />
      <RoundSlider className={isTwitterOn ? "slider checked" : "slider"} />
    </SwitchContainer>
  );
};

export default Switch;
