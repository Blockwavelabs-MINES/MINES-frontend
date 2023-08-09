import { EmptyLink, LinkIcon } from "assets/icons";
import { EditableCard, EmptyCard } from "components/card";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";

const FullContainer = styled.div`
  width: 100%;
  padding: 0px 16px 0px 16px;
`;

const ListContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 16px;
`;

const LinkComponent = ({ userLinkList, profileDecorate }) => {
  const [linkList, setLinkList] = useState(userLinkList);
  const { t } = useTranslation();

  useEffect(() => {
    setLinkList(userLinkList);
  }, [userLinkList]);

  const linkOnClick = (idx) => {
    window.location.href = linkList[idx].linkUrl;
  };

  return (
    <FullContainer>
      {linkList?.length === 0 ? (
        <>
          <EmptyCard icon={EmptyLink} text={t("selectWalletPage3_4")} />
        </>
      ) : (
        <ListContainer>
          {linkList?.map((link, idx) => (
            <EditableCard
              label={link.linkTitle}
              icon={LinkIcon}
              onClick={() => linkOnClick(idx)}
              style={{
                backgroundColor: profileDecorate.buttonColor,
                color: profileDecorate.buttonFontColor,
              }}
            />
          ))}
        </ListContainer>
      )}
    </FullContainer>
  );
};

export default LinkComponent;