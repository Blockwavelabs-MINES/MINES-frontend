import { COLORS as palette } from "../../utils/style/Color/colors";
import Typograpy from "../../utils/style/Typography";
import styled from "styled-components";
import { CardEdit, CardTrash } from "../../assets/icons";

const CardContainer = styled.div`
  width: 100%;
//   min-width: 350px;
  padding: 18px 16px;
  border-radius: 16px;
  background-color: ${palette.white};
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 0px 6px 0px #F0F1F2;
//   box-shadow: 0px 4px 20px 0px #E9EAEC33;
//   border: 1px solid;
`;

const CardInfoBox = styled.div`
  display: flex;
  justify-content: left;
  gap: 8px;
`;

const CardLabel = styled.div`
  ${Typograpy.Headline2}
  color: ${palette.Black};
  margin: auto 0px;
`;

const CardIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const CardToolBox = styled.div`
  display: flex;
  justify-content: right;
`;

const CardToolButton = styled.button`
  width: 32px;
  height: 32px;
  background-image: url(${({ icon }) => icon});
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  padding: 6px;
  border: hidden;
`;

const EditableCard = ({ label, icon, isEdit, isTrash }) => {
  return (
    <CardContainer>
      <CardInfoBox>
        <CardIcon src={icon} />
        <CardLabel>{label}</CardLabel>
      </CardInfoBox>
      <CardToolBox>
        {isEdit ? <CardToolButton icon={CardEdit} /> : <></>}
        {isTrash ? <CardToolButton icon={CardTrash} /> : <></>}
      </CardToolBox>
    </CardContainer>
  );
};

export default EditableCard;
