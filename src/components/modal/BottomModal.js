import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { BottomModalX } from "../../assets/icons";

function BottomModal({
  className,
  onClose,
  maskClosable,
  visible,
  renderInput,
}) {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const closeOnClick = () => {
    onClose();
  };

  const _renderInput = () => {
    if (typeof renderInput === "function") {
      return renderInput();
    }
  };

  return (
    <React.Fragment>
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex="-1"
        visible={visible}
      >
        <ModalInner tabIndex="0" className="modal-inner">
          <ContentContainer>
            <CloseButton onClick={closeOnClick} />
          </ContentContainer>
          {_renderInput()}
        </ModalInner>
      </ModalWrapper>
    </React.Fragment>
  );
}

BottomModal.propTypes = {
  visible: PropTypes.bool,
};

const ModalWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  //   top: 200px;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: hidden;
  //   overflow: auto;
  //   outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  overflow: hidden;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background: rgba(0, 0, 0, 1);
  border-radius: 15px;
  width: 100%;
  max-width: 600px;
  height: 100%;
  margin: 0 auto;
  margin-top: 200px;
  // padding: 40px 20px;
  color: white;
  text-align: center;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  border: none;
  border-radius: 30px 30px 0px 0px;
  background-color: rgba(255, 255, 255, 1);
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 5;
`;

const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: none;
  margin: 0 auto;
  position: absolute;
  top: 37px;
  right: 20px;
  z-index: 5;
  background-image: url(${BottomModalX});
  background-size: 24px 24px;
  background-repeat: no-repeat;
  background-position: center;
`;

export default BottomModal;
