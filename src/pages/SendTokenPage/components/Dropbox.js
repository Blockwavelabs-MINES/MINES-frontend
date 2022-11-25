import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { DropIcon } from "../../../assets/icons";
// import LoadCurrencyInputPanel from "./LoadCurrencyInputPanel";
// import { isAddress, getAllQueryParams } from "../utils";

const Container = styled.button`
  width: 100%;
  height: 37px;
  border-radius: 8px;
  background-color: ${palette.white};
  display: flex;
  justify-content: space-between;
  //   box-shadow: 0px 2px 10px #c4c4c440;
  padding: 8px 16px;
  margin: 10px auto;
  border: 1px solid ${palette.light_gray};
  position: relative;
`;

const SideBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin: auto 0px;
`;

const OpenBox = styled.div`
  width: 100%;
  max-height: 133px;
  border-radius: 10px;
  border: 1px solid ${palette.light_gray};
  overflow-y: auto;
  margin: 10px auto;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -10px);
  z-index: 5;
  background-color: ${palette.white};
`;

const OpenBoxItem = styled.button`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: left;
  background-color: ${palette.white};
  border: hidden;
  text-align: left;
  padding: 8px 16px;
  gap: 10px;
`;

const WalletIconBox = styled.img`
  width: 24px;
  height: 24px;
`;

const WalletAddress = styled.div`
  max-width: 200px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  color: ${palette.light_black};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DropIconBox = styled.img`
  width: 24px;
  height: 24px;
`;

const walletAddressConverter = (walletAddress) => {
  let returnString = "";
  if (walletAddress?.length > 15) {
    returnString =
      walletAddress.substr(0, 6) +
      "..." +
      walletAddress.substr(walletAddress.length - 6, walletAddress.length);
  }
  return returnString;
};

const DropBox = (props) => {
  const [selectIndex, setSelectIndex] = useState(0);
  const [itemList, setItemList] = useState([]);
  const [dropboxType, setDropboxType] = useState("");
  const [open, setOpen] = useState(false);
  const [denom, setDenom] = useState("");
  //   const params = getAllQueryParams();

  useEffect(() => {
    setItemList(props.itemList);
    console.log(props.itemList);
  }, [props.itemList]);

  useEffect(() => {
    (async () => {
      setDropboxType(props.dropboxType);
      if (props.dropboxType == "chain") {
        console.log(props.itemList[0]?.pageProps.chain.networkId);
        const networkVersion = await window.ethereum.request({
          method: "net_version",
        });
        console.log(networkVersion.toString());
        var selectIdx = props.itemList.findIndex(
          (v) =>
            v.pageProps.chain.networkId.toString() == networkVersion.toString()
        );
        if (props.isSet) {
          var selectIdx = props.itemList.findIndex(
            (v) =>
              v.pageProps.chain.networkId.toString() ==
              props.urlInfo.chainId.toString().split("x")[1]
          );
        }
        if (selectIdx < 0) {
          setSelectIndex(0);
        } else {
          setSelectIndex(selectIdx);
          console.log(
            props.itemList.findIndex(
              (v) =>
                v.pageProps.chain.networkId.toString() ==
                networkVersion.toString()
            )
          );
          props.setChainNetwork("0x" + networkVersion);
          console.log(
            itemList[selectIdx]?.pageProps.chain.nativeCurrency.symbol
          );
          console.log("here3", selectIdx);
          props.setCurrency(
            itemList[selectIdx]?.pageProps.chain.nativeCurrency.symbol
          );
        }
      } else if (props.dropboxType == "myWallet") {
        console.log(props.isInit);
        if (props.isSet) {
          var myAddrIdx = props.itemList.findIndex(
            (v) =>
              v.walletAddress.toLowerCase() ==
              props.urlInfo.fromAddr.toLowerCase()
          );
          setSelectIndex(myAddrIdx);
          props.setSenderIcon(itemList[myAddrIdx]?.walletIcon);
          props.setSenderAddress(itemList[myAddrIdx]?.walletAddress);
        } else {
          if (props.isInit) {
            console.log(props.itemList);

            setSelectIndex(
              props.itemList.findIndex(
                (v) => v.walletAddress == localStorage.getItem("currentWallet")
              )
            );
            props.setIsInit(false);
          }
        }
      } else if (props.dropboxType == "friendWallet") {
        if (props.isSet) {
          console.log(props.urlInfo.toAddr);
          console.log(props.itemList);
          var friendAddrIdx = props.itemList.findIndex(
            (v) =>
              v.walletAddress.toLowerCase() ==
              props.urlInfo.toAddr.toLowerCase()
          );
          props.setReceiverIcon(props.itemList[friendAddrIdx]?.walletIcon);
          props.setReceiverAddress(
            props.itemList[friendAddrIdx]?.walletAddress
          );
          setSelectIndex(friendAddrIdx);
        } else {
          props.setReceiverAddress(props.itemList[0]?.walletAddress);
          props.setReceiverIcon(props.itemList[0]?.walletIcon);
          console.log(props.itemList[0]?.walletIcon);
          setSelectIndex(0);
        }
      }
    })();
  }, [props.itemList, props.dropboxType, props.urlInfo, props.isSet]);

  useEffect(() => {}, []);

  useEffect(() => {
    (async () => {
      if (props.dropboxType == "chain" && !denom) {
        const networkVersion = await window.ethereum.request({
          method: "net_version",
        });
        const selectIdx = props.itemList.findIndex(
          (v) =>
            v.pageProps.chain.networkId.toString() == networkVersion.toString()
        );
        if (selectIdx != -1) {
          console.log("here", selectIdx);
          props.setCurrency(
            itemList[selectIdx]?.pageProps.chain.nativeCurrency.symbol
          );
          setDenom(itemList[selectIdx]?.pageProps.chain.nativeCurrency.symbol);
        }
      }
    })();
  }, [props]);

  const dropBoxOnClick = () => {
    setOpen(!open);
  };

  const openItemOnClick = (idx) => {
    setSelectIndex(idx);
    if (dropboxType == "myWallet") {
      props.setSenderAddress(itemList[idx]?.walletAddress);
      props.setSenderWallet(itemList[idx]?.walletType);
      props.setSenderIcon(itemList[idx]?.walletIcon);
      console.log(itemList[idx]?.walletIcon);
    } else if (dropboxType == "friendWallet") {
      props.setReceiverAddress(itemList[idx]?.walletAddress);
      props.setReceiverIcon(itemList[idx]?.walletIcon);
      console.log(itemList[idx]?.walletIcon);
    } else if (dropboxType == "chain") {
      if (props.realType == "platform") {
        props.setChainNetwork(itemList[idx]?.pageProps.chain.networkId);
      } else {
        console.log(itemList[idx]?.pageProps.chain.nativeCurrency.symbol);
        props.setChainNetwork("0x" + itemList[idx]?.pageProps.chain.networkId);
      }
      console.log("here2", idx);
      props.setCurrency(itemList[idx]?.pageProps.chain.nativeCurrency.symbol);
    }
    setOpen(false);
  };

  return (
    <>
      {dropboxType == "myWallet" || dropboxType == "friendWallet" ? (
        <>
          <Container onClick={dropBoxOnClick}>
            <SideBox>
              <WalletIconBox src={itemList[selectIndex]?.walletIcon} />
              <WalletAddress>
                {walletAddressConverter(itemList[selectIndex]?.walletAddress)}
              </WalletAddress>
            </SideBox>
            <SideBox>
              <DropIconBox src={DropIcon} />
            </SideBox>
          </Container>
          {open ? (
            <OpenBox>
              {itemList?.map((val, idx) => (
                <OpenBoxItem
                  style={{
                    backgroundColor:
                      idx == selectIndex ? palette.light_gray : palette.white,
                  }}
                  onClick={() => openItemOnClick(idx)}
                >
                  <WalletIconBox src={val.walletIcon} />
                  <WalletAddress>
                    {walletAddressConverter(val.walletAddress)}
                  </WalletAddress>
                </OpenBoxItem>
              ))}
            </OpenBox>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {dropboxType == "chain" ? (
            <>
              <Container style={{ margin: "0px" }} onClick={dropBoxOnClick}>
                <SideBox>
                  <WalletAddress>
                    {itemList[selectIndex]?.pageProps.chain.name}
                  </WalletAddress>
                </SideBox>
                <SideBox>
                  <DropIconBox src={DropIcon} />
                </SideBox>
                {open ? (
                  <OpenBox
                    style={{
                      width: "100%",
                      // margin: "50px 0px",
                      // left: "0px",
                      top: "40px",
                      // transform: "translate(0%, 10px)",
                    }}
                  >
                    {itemList?.map((val, idx) => (
                      <OpenBoxItem
                        style={{
                          backgroundColor:
                            idx == selectIndex
                              ? palette.light_gray
                              : palette.white,
                        }}
                        onClick={() => openItemOnClick(idx)}
                      >
                        <WalletAddress>
                          {val.pageProps.chain.name}
                        </WalletAddress>
                      </OpenBoxItem>
                    ))}
                  </OpenBox>
                ) : (
                  <></>
                )}
              </Container>
            </>
          ) : (
            <>
              {/* {dropboxType == "token" ? (
                <>
                  <LoadCurrencyInputPanel
                    setToken={props.setToken}
                    initialCurrency={isAddress("tokenaddress")}
                    params={params}
                  />
                </>
              ) : (
                <></>
              )} */}
            </>
          )}
        </>
      )}
    </>
  );
};

export default DropBox;
