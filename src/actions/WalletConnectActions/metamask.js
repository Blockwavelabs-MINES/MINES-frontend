import metamaskMobileOnClick from "./metamaskMobile";

function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}

const metamaskOnClick = (onConnected) => {
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
      localStorage.setItem("currentAddress", accounts[0]);
      onConnected(accounts[0]);
    } catch (error) {
      if (isMobileDevice()) {
        try {
          //   const accounts = await window.ethereum.request({
          //     method: "eth_requestAccounts",
          //   });

          //   onConnected(accounts[0]);
          metamaskMobileOnClick();
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
