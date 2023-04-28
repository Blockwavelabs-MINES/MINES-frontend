function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}

const metamaskMobileOnClick = (setFunction) => {
  return new Promise(async () => {
    try {
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      setFunction(accounts[0]);
    } catch (error) {
      try {
        // 모바일 실행
        if (isMobileDevice()) {
          const dappUrl = "mepe.app";
          const metamaskAppDeepLink =
            "https://metamask.app.link/dapp/" + dappUrl;
          window.location.replace = metamaskAppDeepLink;
        }
      } catch (error) {
        alert(error.message);
        console.error(error.message);
      }
    }
  });
};

export default metamaskMobileOnClick;
