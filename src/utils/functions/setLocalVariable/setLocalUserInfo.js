const localUserInfoName = process.env.REACT_APP_LOCAL_USER_INFO_NAME;

const setLocalUserInfo = ({ type, data, editKey, editValue }) => {
  console.log(type);
  console.log(data);
  // type : "init" | "edit"
  if (type == "init") {
    localStorage.setItem(localUserInfoName, JSON.stringify(data));
  } else if (type == "edit") {
    var tmpData = JSON.parse(localStorage.getItem(localUserInfoName));
    tmpData[editKey] = editValue;
    localStorage.setItem(localUserInfoName, JSON.stringify(tmpData));
  }
};

const dataForm = {
  userId: "",
  userToken: "",
  profileImg: "",
  introduction: "",
  linkList: [
    {
      title: "MEPE",
      url: "https://mepe.app",
    },
    {
      title: "Web3Tree",
      url: "https://3tree.io",
    },
  ],
  walletList: [
    {
      type: "Metamask",
      address: "0x07B0ea6D444B9B66F3A7709FB1fA75BcDCD67A16",
      icon: "MetamaskIcon",
    },
    {
      type: "Metamask",
      address: "0xed6631bD706BC910A37cdc41ACd48a5d94F7bCC0",
      icon: "MetamaskIcon",
    },
  ],
};

export default setLocalUserInfo;
