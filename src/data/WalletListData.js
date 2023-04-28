import MetaMaskIcon from "assets/icons/wallets/icon-metamask.svg";
import { MetamaskOnClick } from "components/WalletGroup/WalletConnectActions";
import { metamaskSend } from "components/WalletGroup/WalletSendActions";

const WalletList = [
  {
    walletName: "Metamask",
    deepLink: "https://metamask.app.link/dapp/mepe.app",
    walletIcon: MetaMaskIcon,
    action: MetamaskOnClick,
    sendAction: metamaskSend,
    walletId: 0,
  },
];

export default WalletList;
