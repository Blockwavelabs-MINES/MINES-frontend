import { EmptyWallet, MetamaskIcon } from "assets/icons";
import { ContainedButton } from "components/button";
import { EditableCard, EmptyCard } from "components/card";
import { ConfirmModal, DeleteModal } from "components/modal";
import AddWalletAddress from "components/modal/AddWalletAddress";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { addWallet, deleteWallet, getWallet } from "utils/api/wallets";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";

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
  gap: 20px;
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

function isMobileDevice() {
  return (
    ("ontouchstart" in window || "onmsgesturechange" in window) &&
    !window.ethereum
  );
}

const WalletComponent = ({ userId, setInfoChange, infoChange }) => {
  const [walletList, setWalletList] = useState([]);
  const [deleteModalOn, setDeleteModalOn] = useState(false);
  const [realDelete, setRealDelete] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(-1);
  const [addedWallet, setAddedWallet] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    getWallet(userId).then((data) => {
      setWalletList(data);
    });
  }, [infoChange]);

  useEffect(() => {
    (async () => {
      if (realDelete) {
        // 지우는 action
        await deleteWallet(walletList[deleteIdx].walletId)
        .then(() => {
          setDeleteIdx(-1);
          setRealDelete(false);
          setInfoChange(!infoChange);
        });

        // var tmpWalletList = walletList;
        // tmpWalletList.splice(deleteIdx, 1);
        // setLocalUserInfo({
        //   type: "edit",
        //   editKey: "wallets",
        //   editValue: tmpWalletList,
        // });
        // setWalletList(tmpWalletList);
      }
    })();
  }, [realDelete]);

  useEffect(() => {
    (async () => {
      if (addedWallet) {
        //중복 검사
        let notDuplicated = true;
        walletList.map((wallet, idx) => {
          if (wallet.walletAddress == addedWallet) {
            notDuplicated = false;
          }
        });
        if (notDuplicated) {
          // 추가하는 action
          await addWallet("METAMASK", addedWallet)
          .then(() => {
            var tmpWalletList = walletList;
            tmpWalletList.push({
              // type: "Metamask",
              walletAddress: addedWallet,
              // icon: MetamaskIcon,
            });
            // setLocalUserInfo({
            //   type: "edit",
            //   editKey: "wallets",
            //   editValue: tmpWalletList,
            // });
            // setWalletList(tmpWalletList);

            setAddedWallet();
            setInfoChange(!infoChange);
          });
        } else {
          alert(t("manageProfilePage10"));
        }
      }
    })();
  }, [addedWallet]);

  const closeModal = () => {
    setModalVisible(false);
  };

  const deleteOnClick = (idx) => {
    setDeleteIdx(idx);
    setDeleteModalOn(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOn(false);
  };

  const walletConnectOnClick = async () => {
    if (!window.ethereum && !isMobileDevice()) {
      setShowModal(true);
    } else {
      setModalVisible(true);
    }
  };

  return (
    <FullContainer>
      {modalVisible && (
        <AddWalletAddress
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
          setAddedWallet={setAddedWallet}
        />
      )}
      {showModal && (
        <ConfirmModal
          visible={setShowModal}
          onClose={() => setShowModal(false)}
          text={<>{t("addWalletModalAlert")}</>}
          buttonText={<>{t("addWalletModalAlertButton")}</>}
          subActionOnClick={() => {
            window.open(
              "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko"
            );
          }}
        />
      )}
      {deleteModalOn ? (
        <DeleteModal
          visible={deleteModalOn}
          closable={true}
          maskClosable={true}
          onClose={closeDeleteModal}
          text={<>{t("manageProfilePageAlertDeleteWallet1")}</>}
          setRealDelete={setRealDelete}
        />
      ) : (
        <></>
      )}
      <TitleContainer>
        <TItleText>{t("selectWalletPage6")}</TItleText>
        {walletList?.length > 0 ? (
          <>
            <ContainedButton
              type="secondary"
              styles="filled"
              states="default"
              size="small"
              label={t("selectWalletPage7")}
              onClick={walletConnectOnClick}
            />
          </>
        ) : (
          <></>
        )}
      </TitleContainer>
      {walletList.length !== 0 ? (
        <ListContainer>
          {walletList.map((wallet, idx) => (
            <EditableCard
              label={walletConvert(wallet.walletAddress)}
              key={idx}
              isEdit={false}
              isTrash={true}
              // icon={wallet.icon}
              icon={MetamaskIcon}
              deleteOnClick={() => deleteOnClick(idx)}
            />
          ))}
        </ListContainer>
      ) : (
        <>
          <EmptyCard icon={EmptyWallet} text={t("selectWalletPage3_3")} />
          <ContainedButton
            type="primary"
            styles="filled"
            states="default"
            size="large"
            label={t("selectWalletPage5")}
            onClick={walletConnectOnClick}
          />
        </>
      )}
    </FullContainer>
  );
};

export default WalletComponent;
