import styled from "styled-components";
import { ContainedButton } from "../../../components/button";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { BottomModal } from "../../../components/modal";
import { Sender3TreeIcon } from "../../../assets/icons";
import { sendTrxs } from "../../../utils/api/trxs";

const FullContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  //   margin-top: 109px;
  //   padding: 20px;
  z-index: 903;
`;

const IntroTextBox = styled.div`
  width: 100%;
  margin: 0px auto;
  padding-top: 100px;
`;

const FirstIntro = styled.div`
  font-family: Montserrat;
  font-size: 23px;
  font-weight: 600;
  text-align: left;
  color: ${palette.Black};
  line-height: 33.35px;
  padding-left: 16px;
`;

const SecondIntro = styled.div`
  ${Typography.Body}
  color: ${palette.grey_2};
  line-height: 23.8px;
  margin-top: 14px;
`;

const TermsBox = styled.div`
  margin-top: 64px;
  ${Typography.Caption2}
  color: ${palette.grey_5};
`;

const TokenListBox = styled.div`
  padding: 12px 8px;
  margin-top: 10px;
`;

const TokenListItem = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 20px 16px;
`;

const TokenIcon = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin: 4px;
`;

const TokenTextInfo = styled.div`
  margin-left: 8px;
`;

const TokenCurrency = styled.div`
  margin-bottom: 4px;
  ${Typography.Heading2}
  ${palette.Black};
`;

const TokenSemi = styled.div`
  ${Typography.Caption2}
  ${palette.grey3};
`;

const SendAmountInfo = styled.div`
  display: flex;
  align-items: center;
`;

const SendAmountBox = styled.div`
  font-family: Montserrat;
  font-size: 28px;
  font-weight: 600;
  margin-right: 8px;
  text-align: left;
`;

const SendAmountText = styled.div`
  ${Typography.Subhead}
  color: ${palette.grey_1};
`;

const MainInfoBox = styled.div`
  padding: 22px 20px;
`;

const PersonInfoBox = styled.div`
  margin-top: 30px;
  margin-bottom: 40px;
  width: 100%;
`;

const PersonInfoLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  align-items: center;
`;

const PersonCategory = styled.div`
  ${Typography.Body}
  color: ${palette.grey_2};
`;

const PersonInfo = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const PersonId = styled.div`
  ${Typography.Headline3}
`;

const PersonIcon = styled.img`
  width: 20px;
  height: 20px;
`;

function setExpiredDate() {
  var today = new Date();
  today.setDate(today.getDate() + 3);
  today.setHours(today.getHours() + 9);
  return today.toISOString().replace("T", " ").substring(0, 19);
}

const LoginModalInner = (
  amount,
  currency,
  sender,
  platform,
  receiver,
  stepStatus,
  setStepStatus,
  onClose,
  networkId,
  userIdx,
  address,
  setExpired,
  setFinalLink,
  tokenInfo,
  setLoading
) => {
  console.log(amount);
  console.log(currency);
  const sendOnClick = async () => {
    document.body.style.overflow = "auto";
    console.log(tokenInfo);

    if (currency == "USDC" || currency == "USDT") {
      console.log("hi");
      let minABI = [
        // balanceOf
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          type: "function",
        },
        // decimals
        {
          constant: true,
          inputs: [],
          name: "decimals",
          outputs: [{ name: "", type: "uint8" }],
          type: "function",
        },
        //transfer
        {
          constant: false,
          inputs: [
            { name: "_to", type: "address" },
            { name: "_value", type: "uint256" },
          ],
          name: "transfer",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
      ];

      const Web3 = require("web3");
      const rpcURL = process.env.REACT_APP_GO_URL;
      // const web3 = new Web3(rpcURL);
      const web3 = new Web3(window.ethereum);
      // const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      // const tempSigner = web3.getSigner();
      const tempContract = new web3.eth.Contract(
        minABI,
        tokenInfo.address
        // tempSigner
      );

      async function sendToken() {
        setLoading(true);
        let data = tempContract.methods
          .transfer(
            process.env.REACT_APP_3TREE_ADDRESS,
            web3.utils.toHex(Number(amount) * Math.pow(10, tokenInfo.decimals))
            // { from: address }
          )
          .send({ from: address })
        // .encodeABI();
        console.log(data);
        return data;
      }

      sendToken()
        .then(async (data) => {
          console.log(data);
          const txHash = data.transactionHash;
          // const txHash = await web3.eth.sendTransaction({
          //   data: data,
          //   value: web3.utils.toHex(Number(amount) * Math.pow(10, 18)),
          //   gas: web3.utils.toHex(200000),
          //   to: process.env.REACT_APP_3TREE_ADDRES,
          //   from: address,
          // });
          // escrow hash와 id 생성 (with escrow Contract)
          console.log(txHash);
          const escrowHash = txHash;
          const escrowId = "1234";
          const expiredDate = setExpiredDate();
          console.log(expiredDate);
          const sendTrxsResult = await sendTrxs(
            userIdx,
            address,
            "metamask",
            "google",
            receiver,
            currency,
            amount,
            escrowHash,
            escrowId,
            expiredDate
          ).then((data) => {
            setLoading(false);
            setFinalLink(data.link_key);
            setExpired(data.expired_at);
          });
          setStepStatus(stepStatus + 1);
          onClose();
        })
        .catch((error) => console.error);
    } else {
      // 보내고 tx값 받은 다음 백호출
      await window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              nonce: "0x00", // ignored by MetaMask
              gasPrice: (Math.pow(10, 8) * 0.1).toString(16), // customizable by user during MetaMask confirmation.
              gas: (Math.pow(10, 6) * 0.1).toString(16), // customizable by user during MetaMask confirmation.
              to: process.env.REACT_APP_3TREE_ADDRESS, // Required except during contract publications.
              from: address, // must match user's active address.
              value: (Math.pow(10, 18) * amount).toString(16), // Only required to send ether to the recipient from the initiating external account.
              data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057", // Optional, but used for defining smart contract creation and interaction.
              chainId: networkId.toString(16), // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
            },
          ],
        })
        .then(async (txHash) => {
          console.log(txHash);
          // escrow hash와 id 생성 (with escrow Contract)

          const escrowHash = txHash;
          const escrowId = "1234";
          const expiredDate = setExpiredDate();
          console.log(expiredDate);
          const sendTrxsResult = await sendTrxs(
            userIdx,
            address,
            "metamask",
            "google",
            receiver,
            currency,
            amount,
            escrowHash,
            escrowId,
            expiredDate
          ).then((data) => {
            setFinalLink(data.link_key);
            setExpired(data.expired_at);
          });

          setStepStatus(stepStatus + 1);
          onClose();
        })
        .catch((error) => console.error);
    }
  };

  return (
    <FullContainer>
      <IntroTextBox>
        <FirstIntro>송금 확인</FirstIntro>
      </IntroTextBox>
      <MainInfoBox>
        <SendAmountInfo>
          <SendAmountBox>
            {amount} {currency}{" "}
            <font size={4} color={palette.grey_1}>
              를 보냅니다
            </font>
          </SendAmountBox>
          {/* <SendAmountText>를 보냅니다.</SendAmountText> */}
        </SendAmountInfo>
        <PersonInfoBox>
          <PersonInfoLine>
            <PersonCategory>받는 분</PersonCategory>
            <PersonInfo>
              <PersonId>{receiver}</PersonId>
              <PersonIcon src={platform} />
            </PersonInfo>
          </PersonInfoLine>
          <PersonInfoLine>
            <PersonCategory>보내는 분</PersonCategory>
            <PersonInfo>
              <PersonId>@{sender}</PersonId>
              <PersonIcon src={Sender3TreeIcon} />
            </PersonInfo>
          </PersonInfoLine>
        </PersonInfoBox>
        <ContainedButton
          type="primary"
          styles="filled"
          states="default"
          size="large"
          label="확인"
          onClick={sendOnClick}
        />
      </MainInfoBox>
    </FullContainer>
  );
};

const CheckSendModal = ({
  visible,
  closable,
  maskClosable,
  onClose,
  amount,
  currency,
  sender,
  platform,
  receiver,
  stepStatus,
  setStepStatus,
  networkId,
  userIdx,
  address,
  setExpired,
  setFinalLink,
  tokenInfo,
  setLoading,
}) => {
  return (
    <BottomModal
      visible={visible}
      closable={closable}
      maskClosable={maskClosable}
      onClose={onClose}
      renderInput={() =>
        LoginModalInner(
          amount,
          currency,
          sender,
          platform,
          receiver,
          stepStatus,
          setStepStatus,
          onClose,
          networkId,
          userIdx,
          address,
          setExpired,
          setFinalLink,
          tokenInfo,
          setLoading
        )
      }
    />
  );
};

export default CheckSendModal;
