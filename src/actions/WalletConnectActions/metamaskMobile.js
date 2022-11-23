function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}

const metamaskMobileOnClick = (setFunction) => {
  return new Promise(async (resolve, reject) => {
    // var returnValue = 0;
    console.log("start");
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

      console.log(accounts[0]);
      setFunction(accounts[0]);
    } catch (error) {
      //   alert("metamask 확장 프로그램을 설치해주세요.");
      try {
        // 모바일 실행
        if (isMobileDevice()) {
          console.log("mobile");
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
