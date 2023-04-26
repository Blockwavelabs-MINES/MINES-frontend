function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}

const metamaskSend = (onConnected, settings) => {
  return new Promise(async () => {
    try {
      const hexString = "0x" + Number(settings.value * 10 ** 18).toString(16);
      const networkVersion = await window.ethereum.request({
        method: "net_version",
      });

      var tmpChainId = "0x" + networkVersion;

      if ("0x" + networkVersion != settings.chainId) {
        tmpChainId = settings.chainId;
      }

      if (tmpChainId == settings.chainId) {
        const transactionParameters = {
          nonce: "0x00", // ignored by MetaMask
          gasPrice: "0x09184e72a000", // customizable by user during MetaMask confirmation.
          gas: "0x2710", // customizable by user during MetaMask confirmation.
          to: settings.toAddr, // Required except during contract publications.
          from: settings.fromAddr, // must match user's active address.
          value: hexString, // Only required to send ether to the recipient from the initiating external account.
          // data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057", // Optional, but used for defining smart contract creation and interaction.
          chainId: settings.chainId, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
          asset: settings.asset,
        };

        const txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        });

        const returnValue = {
          toWalletAddress: settings.toAddr,
          fromWalletAddress: settings.fromAddr,
          toUser: settings.toUser,
          fromUser: settings.fromUser,
          gasPrice: transactionParameters.gasPrice,
          gas: transactionParameters.gas,
          value: settings.value,
          chainID: settings.chainId,
          memo: settings.memo,
          udenom: settings.udenom,
          walletType: "Metamask",
          txHash: txHash,
        };

        onConnected(returnValue);
      } else {
        alert(
          "Network is different with current wallet network. Please set again."
        );
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

export default metamaskSend;
