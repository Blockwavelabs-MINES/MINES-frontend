import styled, { css } from "styled-components";
import { COLORS as palette } from "utils/style/Color/colors";

const PrimaryButton = styled.button`
  width: ${({ size }) =>
    size === "large"
      ? "56px"
      : size === "medium"
      ? "40px"
      : size === "small"
      ? "36px"
      : size === "xs"
      ? "32px"
      : "40px"};
  height: ${({ size }) =>
    size === "large"
      ? "56px"
      : size === "medium"
      ? "40px"
      : size === "small"
      ? "36px"
      : size === "xs"
      ? "32px"
      : "40px"};
  border-radius: ${({ size }) =>
    size === "large"
      ? "20px"
      : size === "medium"
      ? "16px"
      : size === "small"
      ? "14px"
      : size === "xs"
      ? "12px"
      : "16px"};
  display: flex;
  justify-content: center;
  background-color: ${({ styles }) =>
    styles === "filled"
      ? palette.blue_1
      : styles === "outlined"
      ? palette.white
      : palette.blue_1};
  background-color: ${({ states, styles }) =>
    states === "disabled" && styles === "filled" ? palette.grey_7 : ""};
  border: ${({ styles }) =>
    styles === "filled"
      ? "hidden"
      : styles === "outlined"
      ? `1px solid ${palette.blue_3}`
      : "hidden"};
  border: ${({ styles, states }) =>
    states === "disabled" && styles === "outlined"
      ? `1px solid ${palette.grey_6}`
      : ""};
  background-image: url(${({ icon }) => icon});
  background-size: calc(100% - 12px);
  background-repeat: no-repeat;
  background-position: center;

  ${props =>
    props.shadow &&
    css`
      box-shadow: 0px 13px 40px 0px rgba(39, 49, 70, 0.12);
    `
  }
`;

const SecondaryButton = styled.button`
  width: ${({ size }) =>
    size === "large"
      ? "56px"
      : size === "medium"
      ? "40px"
      : size === "small"
      ? "36px"
      : size === "xs"
      ? "32px"
      : "40px"};
  height: ${({ size }) =>
    size === "large"
      ? "56px"
      : size === "medium"
      ? "40px"
      : size === "small"
      ? "36px"
      : size === "xs"
      ? "32px"
      : "40px"};
  border-radius: ${({ size }) =>
    size === "large"
      ? "20px"
      : size === "medium"
      ? "16px"
      : size === "small"
      ? "14px"
      : size === "xs"
      ? "12px"
      : "16px"};
  display: flex;
  justify-content: center;
  gap: 2px;
  background-color: ${({ styles }) =>
    styles === "filled"
      ? palette.sky_3
      : styles === "outlined"
      ? palette.white
      : palette.sky_3};
  background-color: ${({ states, styles }) =>
    states === "disabled" && styles === "filled" ? palette.grey_7 : ""};
  border: ${({ styles }) =>
    styles === "filled"
      ? "hidden"
      : styles === "outlined"
      ? `1px solid ${palette.grey_6}`
      : "hidden"};
  border: ${({ styles, states }) =>
    states === "disabled" && styles === "outlined"
      ? `1px solid ${palette.grey_6}`
      : ""};
  background-image: url(${({ icon }) => icon});
  background-size: calc(100% - 12px);
  background-repeat: no-repeat;
  background-position: center;

  ${props =>
    props.zIndex && 
    css`
      z-index: 904;
    `
  }
  ${props =>
    props.shadow &&
    css`
      box-shadow: 0px 13px 40px 0px rgba(39, 49, 70, 0.12);
    `
  }
`;

// type="primary";
// style="filled";
// states="default";
// size="large";
// Show icon=false;

const IconButton = ({ 
  type, 
  styles, 
  states, 
  size, 
  icon, 
  onClick, 
  style, 
  zIndex,
  shadow 
}) => {
  return (
    <>
      {type === "primary" ? (
        <PrimaryButton
          size={size}
          states={states}
          type={type}
          styles={styles}
          icon={icon}
          onClick={onClick}
          style={style}
          shadow={shadow}
        />
      ) : (
        <SecondaryButton
          size={size}
          states={states}
          type={type}
          styles={styles}
          icon={icon}
          onClick={onClick}
          style={style}
          zIndex={zIndex}
          shadow={shadow}
        />
      )}
    </>
  );
};

export default IconButton;
