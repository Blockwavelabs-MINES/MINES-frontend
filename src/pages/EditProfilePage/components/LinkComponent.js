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
  justify-content: space-between;
`;

const TItleText = styled.div`
  text-align: left;
  ${Typography.Headline1}
  color: ${palette.Black};
`;

const ListContainer = styled.div`
  width: 100%;
  padding-top: 40px;
  display: grid;
  gap: 10px;
`;

const LinkComponent = () => {
  const [linkList, setLinkList] = useState([
    // {
    //   title: "MEPE",
    //   url: "https://mepe.com",
    // },
    // {
    //   title: "Web3Tree",
    //   url: "https://3tree.io",
    // },
  ]);
  const [deleteModalOn, setDeleteModalOn] = useState(false);
  const [realDelete, setRealDelete] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(-1);
  const [linkModalOn, setLinkModalOn] = useState(false);

  useEffect(() => {
    if (realDelete) {
      // 지우는 action
      var tmpLinkList = linkList;
      tmpLinkList.splice(deleteIdx, 1);
      setLinkList(tmpLinkList);

      setDeleteIdx(-1);
      setRealDelete(false);
    }
  }, [realDelete]);

  const deleteOnClick = (idx) => {
    setDeleteIdx(idx);
    setDeleteModalOn(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOn(false);
  };

  const closeLinkModal = () => {
    setLinkModalOn(false);
  };

  const addLinkOnClick = () => {
    setLinkModalOn(true);
  };

  const editOnClick = () => {
    alert("준비중입니다.");
  };

  const saveAction = ({ title, url }) => {
    // 추가하는 action
    var tmpLinkList = linkList;
    tmpLinkList.push({
      title: title,
      url: url,
    });
    setLinkList(tmpLinkList);
  };

  return (
    <FullContainer>
      {deleteModalOn ? (
        <DeleteModal
          visible={deleteModalOn}
          closable={true}
          maskClosable={true}
          onClose={closeDeleteModal}
          text={
            <>
              이 링크를 정말 삭제하시겠어요?
              <br /> 삭제 된 항목은 되돌릴 수 없어요.
            </>
          }
          setRealDelete={setRealDelete}
        />
      ) : (
        <>
          {linkModalOn ? (
            <AddLinkModal
              visible={linkModalOn}
              closable={true}
              maskClosable={true}
              onClose={closeLinkModal}
              saveAction={saveAction}
            />
          ) : (
            <></>
          )}
        </>
      )}
      <TitleContainer>
        <TItleText>링크</TItleText>
        {linkList.length > 0 ? (
          <ContainedButton
            type="secondary"
            styles="filled"
            states="default"
            size="small"
            label="링크 추가"
            onClick={addLinkOnClick}
          />
        ) : (
          <></>
        )}
      </TitleContainer>
      {linkList.length == 0 ? (
        <>
          <EmptyCard icon={EmptyLink} text="링크" />
          <ContainedButton
            type="primary"
            styles="filled"
            states="default"
            size="large"
            label="링크 추가하기"
            onClick={addLinkOnClick}
          />
        </>
      ) : (
        <ListContainer>
          {linkList.map((link, idx) => (
            <EditableCard
              label={link.title}
              isEdit={true}
              isTrash={true}
              icon={LinkIcon}
              deleteOnClick={() => deleteOnClick(idx)}
              editOnClick={editOnClick}
            />
          ))}
        </ListContainer>
      )}
    </FullContainer>
  );
};

export default LinkComponent;
