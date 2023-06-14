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
  transition: 0.2s;

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

const Switch = ({ checked, handler }) => {
  return (
    <>
      <SwitchContainer>
        <HiddenInput type="checkbox" checked={checked} onChange={handler} />
        <RoundSlider className={checked ? "slider checked" : "slider"} />
      </SwitchContainer>
    </>
  );
};

export default Switch;
