function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}

const metamaskOnClick = (walletList, onConnected) => {
  return new Promise(async () => {
    try {
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (walletList.findIndex((v) => v.walletAddress == accounts[0]) > -1) {
        console.log(walletList);
        alert("중복되는 주소가 있습니다.");
      } else {
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
};

export default metamaskOnClick;
