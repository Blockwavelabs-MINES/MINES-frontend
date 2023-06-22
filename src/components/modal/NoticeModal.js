import styled from "styled-components";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography";

const ModalWrapper = styled.div`
  z-index: 101;
  position: fixed;
  bottom: 0;
  width: calc(100% - 40px);
  max-width: 560px;
`;

const ModalItems = styled.div`
  position: relative;
  bottom: -84px;
  animation: slideUp 0.5s ease-out forwards;

  @keyframes slideUp {
    to {
      bottom: 16px;
    }
  }
  display: flex;
  align-items: center;
  height: 53px;
  padding: 23px 16px;
  border-radius: 12px;
  background-color: ${palette.black};
`;

const ModalInfoText = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${Typography.Headline3};

  & > p {
    margin: 0;
    color: ${palette.sky_3};
  }

  & > p:last-of-type {
    color: ${palette.blue_1};
  }
`;

const NoticeModal = ({ visible, onClickEvent, text, linkText }) => {
  return (
    <>
      {visible && (
        <ModalWrapper>
          <ModalItems>
            <ModalInfoText>
              <p>{text}</p>
              <p onClick={onClickEvent}>{linkText}</p>
            </ModalInfoText>
          </ModalItems>
        </ModalWrapper>
      )}
    </>
  );
};

export default NoticeModal;
