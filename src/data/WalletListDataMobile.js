import WalletConnectIcon from "assets/icons/wallets/icon-walletConnect.svg";
import { WalletConnectOnClick } from "components/WalletGroup/WalletConnectActions";

const WalletList = [
  {
    walletName: "WalletConnect",
    deepLink: "",
    walletIcon: WalletConnectIcon,
    action: WalletConnectOnClick,
    // action: () => {
    //   alert("hi");
    // },
    walletId: 0,
  },
];

export default WalletList;
