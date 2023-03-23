function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}

const metamaskOnClick = (walletList, onConnected) => {
  // if (!window.ethereum) {
  //   alert("Get MetaMask!");
  //   return;
  // }
  return new Promise(async (resolve, reject) => {
    try {
      await window.ethereum.request({
        // method: "wallet_requestPermissions",
        method: "eth_requestAccounts",
        // params: [
        //   {
        //     eth_accounts: {},
        //   },
        // ],
      });

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      console.log(accounts[0]);
      console.log(walletList.findIndex((v) => v.walletAddress === accounts[0]));
      if (walletList.findIndex((v) => v.walletAddress == accounts[0]) > -1) {
        console.log(walletList);
        alert("중복되는 주소가 있습니다.");
      } else {
        // localStorage.setItem("currentAddress", accounts[0]);
        onConnected(accounts[0]);
      }
    } catch (error) {
      if (isMobileDevice()) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          onConnected(accounts[0]);
        } catch (error) {
          alert(error.message);
          console.error(error.message);
        }
      } else {
        alert(error.message);
        console.error(error.message);
      }
    }
  });
  // const accounts = await window.ethereum.request({
  //   method: "eth_requestAccounts",
  // });
};

async function checkIfWalletIsConnected(onConnected) {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length > 0) {
      const account = accounts[0];
      onConnected(account);
      return;
    }

    if (isMobileDevice()) {
      await metamaskOnClick(onConnected);
    }
  }
}

export default metamaskOnClick;
