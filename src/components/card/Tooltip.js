import { COLORS as palette } from "../../utils/style/Color/colors";
import Typograpy from "../../utils/style/Typography";
import styled from "styled-components";
import { TooltipBubbleTail } from "../../assets/icons";

const FullBox = styled.div`
  display: absolute;
`;

const BubbleTailBox = styled.img`
  width: 14px;
  position: absolute;
  top: 20px;
  left: -5px;
`;

const Container = styled.div`
  width: 227px;
  padding: 18px 16px;
  border-radius: 16px;
  background-color: ${palette.grey_1};
  display: flex;
  position: absolute;
  top: 27px;
  left: -34px;
`;

const DropBoxOuterBox = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100%;
  margin: 0px auto;
  position: relative;
  z-index: 900;
  display: ${(props) => (props.visible ? "block" : "none")};
`;

const Tooltip = ({ className, onClose, maskClosable, visible, text }) => {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  return (
    <>
      <ModalOverlay visible={visible} />
      {/* <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex="-1"
        visible={visible}
      > */}
        <DropBoxOuterBox
          className={className}
          onClick={maskClosable ? onMaskClick : null}
          tabIndex="-1"
          visible={visible}
        >
          <FullBox>
            <BubbleTailBox src={TooltipBubbleTail} />
            <Container>{text}</Container>
          </FullBox>
        </DropBoxOuterBox>
      {/* </ModalWrapper> */}
    </>
  );
};

const ModalWrapper = styled.div`
  // width: 100%;
  //   max-width: 600px;
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: transparent;
  z-index: 999;
`;

export default Tooltip;
