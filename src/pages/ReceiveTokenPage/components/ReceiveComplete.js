import { ChevronRight, GreenCheck, MetamaskIcon } from "assets/icons";
import { CompasImage } from "assets/images";
import animation from "assets/lottie/check-lottie.json";
import { EditableCard } from "components/card";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Lottie from "react-lottie-player";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getTrxsLinkInfo } from "utils/api/trxs";
import { postTweet } from "utils/api/twitter";
import { receiveTrxHashState } from "utils/atoms/trxs";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";

const ContentContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 50px;
`;

const LottieContainer = styled.div`
  width: 100px;
  margin: 0px auto;
  padding-top: 140px;
  margin-bottom: 10px;
`;

const WalletBox = styled.div`
  position: relative;
  margin-bottom: 50px;
`;

const TextLine = styled.div`
  ${Typography.Headline1}
  text-align: center;
  margin-bottom: 36px;
  font-family: Montserrat;
`;

const CheckBox = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(-50%, -50%);
`;

const CheckTxTitle = styled.div`
  ${Typography.Headline2}
  color: ${palette.grey_2};
`;

const TxHashCard = styled.button`
  width: 100%;
  min-height: 96px;
  padding: 24px 10px;
  border-radius: 16px;
  display: flex;
  gap: 16px;
  margin-top: 12px;
  margin-bottom: 57px;
  border: 1px solid ${palette.sky_3};
  background-color: ${palette.sky_4};
  align-items: center;
  position: relative;
`;

const TimerBox = styled.img`
  width: 46px;
`;

const TxHashInfobox = styled.div``;

const TxHashInfoTitle = styled.div`
  ${Typography.Caption1}
  color: ${palette.grey_1};
`;

const TxHashAddressBox = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const TxHashAddress = styled.div`
  ${Typography.Headline2}
  color: ${palette.Black};
  text-decoration: underline;
`;

const RightArrow = styled.img`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0%, -50%);
`;

const ComplainLink = styled.a`
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: ${palette.grey_4};
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

const ReceiveComplete = ({ walletList, select }) => {
  const { t } = useTranslation();
  const [receiveInfo, setReceiveInfo] = useState(null);
  const receiveTrxHash = useRecoilValue(receiveTrxHashState);

  const convertDateFormat = (date) => {
    const dateArr = date.substring(4, 33).split(" ");
    let monthNamesEn = {
      Jan: "January",
      Feb: "February",
      Mar: "March",
      Apr: "April",
      May: "May",
      Jun: "June",
      Jul: "July",
      Aug: "August",
      Sep: "September",
      Oct: "October",
      Nov: "November",
      Dec: "December",
    };

    let monthNamesKo = {
      Jan: "1",
      Feb: "2",
      Mar: "3",
      Apr: "4",
      May: "5",
      Jun: "6",
      Jul: "7",
      Aug: "8",
      Sep: "9",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    if (localStorage.getItem("language") === "en") {
      return (
        dateArr[3].substring(0, 5) +
        " on " +
        monthNamesEn[date[0]] +
        " " +
        dateArr[1] +
        ", " +
        dateArr[2] +
        " (" +
        dateArr[4].substring(0, 6) +
        ":" +
        dateArr[4].substring(6, 8) +
        ")" +
        "\n"
      );
    } else {
      return (
        dateArr[2] +
        "년 " +
        monthNamesKo[dateArr[0]] +
        "월 " +
        dateArr[1] +
        "일 " +
        dateArr[3].substring(0, 5) +
        " (" +
        dateArr[4].substring(0, 6) +
        ":" +
        dateArr[4].substring(6, 8) +
        ")" +
        "\n"
      );
    }
  };

  const txHashExplorerOnClick = () => {
    if (Number(receiveInfo.networkId) == 5) {
      window.open(`https://goerli.etherscan.io/tx/${receiveTrxHash}`);
    } else if (Number(receiveInfo.networkId) == 137) {
      window.open(`https://polygonscan.com/tx/${receiveTrxHash}`);
    }
  };

  const pathname = window.location.pathname.split("/");
  const linkKey = pathname[pathname.length - 1];
  const requestPostTweet = async () => {
    const date = new Date().toString();
    const dateInFormat = convertDateFormat(date);

    await postTweet(linkKey, dateInFormat).then((data) => {
      console.log(data);
    });
  };

  useEffect(() => {
    requestPostTweet();
  }, []);

  useEffect(() => {
    const pathname = window.location.pathname.split("/");
    const trxsLink = pathname[pathname.length - 1];
    getTrxsLinkInfo(trxsLink).then((data) => {
      setReceiveInfo(data);
    });
  }, []);

  return (
    <>
      <ContentContainer>
        <LottieContainer>
          <Lottie animationData={animation} loop={false} play />
        </LottieContainer>
        <TextLine>
          {receiveInfo?.tokenAmount} {receiveInfo?.tokenUdenom}
          <br />
          {t("receiveTokenComplete2")}
        </TextLine>
        <WalletBox>
          <CheckBox src={GreenCheck} />
          <EditableCard
            label={walletConvert(walletList[select].walletAddress)}
            isEdit={false}
            isTrash={false}
            icon={MetamaskIcon}
          />
        </WalletBox>
        <CheckTxTitle>{t("receiveTokenComplete3")}</CheckTxTitle>
        <TxHashCard onClick={txHashExplorerOnClick}>
          <RightArrow src={ChevronRight} />
          <TimerBox src={CompasImage} />
          <TxHashInfobox>
            <TxHashInfoTitle>{t("receiveTokenComplete4")}</TxHashInfoTitle>
            <TxHashAddressBox>
              <TxHashAddress>{walletConvert(receiveTrxHash)}</TxHashAddress>
            </TxHashAddressBox>
          </TxHashInfobox>
        </TxHashCard>
        <ComplainLink
          href="https://forms.gle/4CGoKQAWzJVG2dd69"
          target="_blank"
        >
          {t("receiveTokenComplete5")}
        </ComplainLink>
      </ContentContainer>
    </>
  );
};

export default ReceiveComplete;
