import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import DropBox from "./Dropbox";
import MetamaskChainList from "./MetamaskChainlist";
import PlatformList from "./PlatformList";
import { MetamaskIcon } from "../../../assets/icons";

const Container = styled.div`
  width: 100%;
  display: grid;
  gap: 10px;
`;

const ConnectedBox = styled.div`
  width: 100%;
`;

const NetworkBox = styled.div`
  width: 100%;
`;

const BoxHeader = styled.li`
  font-family: Pretendard;
  font-size: 11px;
  font-weight: 600;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  color: ${palette.gray};
  margin-bottom: 4px;
`;

const WalletContainer = styled.div`
  height: 40px;
  width: 100%;
  border-radius: 10px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${palette.background};
  display: flex;
  justify-content: left;
  align-items: center;
`;

const IconBox = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const AddressBox = styled.div`
  font-family: Roboto Mono;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: center;
`;

const TokenBox = styled.div`
  height: 37px;
  width: 100%;
  border-radius: 8px;
  padding: 12px;
  border: 1px solid ${palette.light_gray};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  background-color: ${palette.grey_6};
  color: ${palette.dark_gray};
`;

const AmountInputBox = styled.input`
  width: 100%;
  height: 37px;
  border-radius: 8px;
  padding-left: 12px;
  border: 1px solid ${palette.light_gray};
  font-family: Pretendard;
  font-size: 11px;
  font-weight: 600;
  line-height: 13px;
  letter-spacing: 0em;
  position: relative;
  &::-webkit-input-placeholder {
    color: ${palette.light_gray};
  }
`;

const BalanceBox = styled.div`
  width: 100%;
  margin-top: 4px;
  text-align: right;
  padding-right: 10px;
  color: ${palette.gray};
  font-family: Pretendard;
  font-size: 11px;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0em;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${palette.light_gray};
  margin-top: 27px;
  margin-bottom: 27px;
`;

const HelpTextContainer = styled.div`
  width: 100%;
  font-family: Pretendard;
  font-size: 11px;
  font-weight: 600;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  color: ${palette.gray};
  margin-bottom: 30px;
`;

const HelpTextLi = styled.li`
  padding-left: 1.28571429em;
  text-indent: -1.28571429em;
`;

const MaxButton = styled.button`
  height: 25px;
  width: 64px;
  position: absolute;
  top: 6px;
  right: 7px;
  border-radius: 4px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  color: ${palette.white};
  background-color: ${palette.gray};
  border: hidden;
`;

const AmountContent = styled.div`
  width: 100%;
  position: relative;
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

const Step3 = ({
  setAmount,
  setToken,
  setCurrency,
  currency,
  amount,
  token,
}) => {
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    (async () => {
      await window.ethereum.enable();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];

      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });
      // const balance = accounts[0];

      const decimal = parseInt(balance, 16) / Math.pow(10, 18);
      console.log(decimal);
      setBalance(decimal);

      window.ethereum.on("chainChanged", async function (chainId) {
        // Time to reload your interface with accounts[0]!
        const balance2 = await window.ethereum.request({
          method: "eth_getBalance",
          params: [account, "latest"],
        });
        // const balance = accounts[0];

        const decimal2 = parseInt(balance2, 16) / Math.pow(10, 18);
        console.log(decimal2);
        setBalance(decimal2);
      });
    })();
  }, []);

  useEffect(() => {
    setToken(currency);
    // setCurrency(MetamaskChainList[MetamaskChainList.findIndex((v)=>v.pageProps.chain.chainId)].pageProps.chain.nativeCurrency.symbol);
  }, [token]);

  const amountOnChange = (e) => {
    setAmount(e.target.value);
  };

  const maxOnClick = () => {
    setAmount(balance);
  };

  return (
    <Container>
      <ConnectedBox>
        <BoxHeader>Token</BoxHeader>
        <TokenBox>{currency}</TokenBox>
      </ConnectedBox>
      <NetworkBox>
        <BoxHeader>Amount</BoxHeader>
        <AmountContent>
          <AmountInputBox
            placeholder="0.1"
            value={amount}
            onChange={(e) => amountOnChange(e)}
          />
          <MaxButton onClick={maxOnClick}>max</MaxButton>
        </AmountContent>
        <BalanceBox>Balance: {balance}</BalanceBox>
      </NetworkBox>
      <Divider />
      <HelpTextContainer>
        유의사항 <br />
        <HelpTextLi>
          수령은 전송일로부터 3일 내에 해당 소셜계정으로 인증하면 수령할 수
          있으며, 기한 내 미수령시 반환됩니다.
        </HelpTextLi>
        <HelpTextLi>
          미수령으로 인한 반환시에는 보낸 토큰의 0.5%을 제한 토큰이 자동
          반환됩니다.
        </HelpTextLi>
      </HelpTextContainer>
    </Container>
  );
};

export default Step3;
