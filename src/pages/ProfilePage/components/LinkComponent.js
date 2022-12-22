import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ContainedButton } from "../../../components/button";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { EmptyCard, EditableCard } from "../../../components/card";
import { EmptyLink, LinkIcon } from "../../../assets/icons";
import { DeleteModal } from "../../../components/modal";
import AddLinkModal from "./AddLinkModal";

const FullContainer = styled.div`
  width: 100%;
  padding: 20px;
  padding-bottom: 60px;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const TItleText = styled.div`
  text-align: center;
  ${Typography.Headline1}
  color: ${palette.Black};
`;

const ListContainer = styled.div`
  width: 100%;
  padding-top: 22px;
  display: grid;
  gap: 20px;
`;

const LinkComponent = ({ userLinkList }) => {
  const [linkList, setLinkList] = useState(userLinkList);

  useEffect(() => {
    setLinkList(userLinkList);
  }, [userLinkList]);

  const linkOnClick = (idx) => {
    window.location.href = linkList[idx].link_url;
  };

  return (
    <FullContainer>
      <TitleContainer>
        <TItleText>링크</TItleText>
      </TitleContainer>
      {linkList?.length == 0 ? (
        <>
          <EmptyCard icon={EmptyLink} text="링크가" />
        </>
      ) : (
        <ListContainer>
          {linkList?.map((link, idx) => (
            <EditableCard
              label={link.link_title}
              icon={LinkIcon}
              onClick={() => linkOnClick(idx)}
            />
          ))}
        </ListContainer>
      )}
    </FullContainer>
  );
};

export default LinkComponent;
