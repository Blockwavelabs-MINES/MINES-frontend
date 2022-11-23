import { COLORS as palette } from "../../utils/style/Color/colors";
import Typograpy from "../../utils/style/Typography";
import styled from "styled-components";

const PrimaryButton = styled.button`
  min-width: ${({ size }) =>
    size === "large" ? "75px" : size === "small" ? "68px" : "75px"};
  height: 30px;
  border-radius: 15px;
  background-color: ${palette.white};
  border: hidden;
  &:hover {
    background-color: ${palette.grey_6};
  }
  display: flex;
  justify-content: center;
`;

const PrimaryTextBox = styled.div`
  ${Typograpy.Caption1}
  font-size: ${({ size }) =>
    size === "large" ? "15px" : size === "small" ? "10px" : "15px"};
  color: ${({ styles }) =>
    styles === "active"
      ? palette.blue_1
      : styles === "unactive"
      ? palette.grey_5
      : palette.blue_1};
  margin: auto 0px;
`;

// type="primary";
// style="filled";
// states="default";
// size="large";
// label="송금하기";
// Show icon=false;
// Show txt=true;

const TextButton = ({ styles, states, size, label }) => {
  return (
    <PrimaryButton size={size} states={states} styles={styles}>
      <PrimaryTextBox styles={styles} states={states} size={size}>
        {label}
      </PrimaryTextBox>
    </PrimaryButton>
  );
};

export default TextButton;
