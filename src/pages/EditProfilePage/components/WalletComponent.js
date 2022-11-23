import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ContainedButton } from "../../../components/button";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { EmptyCard, EditableCard } from "../../../components/card";
import { EmptyWallet, MetamaskIcon } from "../../../assets/icons";
import { DeleteModal } from "../../../components/modal";
import { MetamaskOnClick } from "../../../actions/WalletConnectActions";

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

const walletConvert = (walletAddress) => {
  var returnAddress = walletAddress;
  if (walletAddress?.length > 15) {
    returnAddress =
      walletAddress.substr(0, 6) +
      "..." +
      walletAddress.substr(walletAddress.length - 6, walletAddress.length);
  }
  return returnAddress;
};

const WalletComponent = () => {
  const [walletList, setWalletList] = useState([
    {
      type: "Metamask",
      address: "0x07B0ea6D444B9B66F3A7709FB1fA75BcDCD67A16",
      icon: MetamaskIcon,
    },
    {
      type: "Metamask",
      address: "0xed6631bD706BC910A37cdc41ACd48a5d94F7bCC0",
      icon: MetamaskIcon,
    },
  ]);
  const [deleteModalOn, setDeleteModalOn] = useState(false);
  const [realDelete, setRealDelete] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(-1);
  const [addedWallet, setAddedWallet] = useState();

  useEffect(() => {
    if (realDelete) {
      // 지우는 action
      var tmpWalletList = walletList;
      tmpWalletList.splice(deleteIdx, 1);
      setWalletList(tmpWalletList);

      setDeleteIdx(-1);
      setRealDelete(false);
    }
  }, [realDelete]);

  useEffect(() => {
    if (addedWallet) {
      // 추가하는 action
      var tmpWalletList = walletList;
      tmpWalletList.push({
        type: "Metamask",
        address: addedWallet,
        icon: MetamaskIcon,
      });
      setWalletList(tmpWalletList);

      setAddedWallet();
    }
  }, [addedWallet]);

  const deleteOnClick = (idx) => {
    setDeleteIdx(idx);
    setDeleteModalOn(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOn(false);
  };

  const walletConnectOnClick = () => {
    MetamaskOnClick(setAddedWallet);
  };

  return (
    <FullContainer>
      {deleteModalOn ? (
        <DeleteModal
          visible={deleteModalOn}
          closable={true}
          maskClosable={true}
          onClose={closeDeleteModal}
          text={<>이 지갑를 정말 삭제하시겠어요?</>}
          setRealDelete={setRealDelete}
        />
      ) : (
        <></>
      )}
      <TitleContainer>
        <TItleText>지갑</TItleText>
        {walletList.length > 0 ? (
          <ContainedButton
            type="secondary"
            styles="filled"
            states="default"
            size="small"
            label="지갑 추가"
            onClick={walletConnectOnClick}
          />
        ) : (
          <></>
        )}
      </TitleContainer>
      {walletList.length == 0 ? (
        <>
          <EmptyCard icon={EmptyWallet} text="지갑" />
          <ContainedButton
            type="primary"
            styles="filled"
            states="default"
            size="large"
            label="지갑 추가하기"
            onClick={walletConnectOnClick}
          />
        </>
      ) : (
        <ListContainer>
          {walletList.map((wallet, idx) => (
            <EditableCard
              label={walletConvert(wallet.address)}
              isEdit={false}
              isTrash={true}
              icon={wallet.icon}
              deleteOnClick={() => deleteOnClick(idx)}
            />
          ))}
        </ListContainer>
      )}
    </FullContainer>
  );
};

export default WalletComponent;
