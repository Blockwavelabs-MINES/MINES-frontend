import React, { useEffect, useState } from "react";
import Web3 from "web3";

import { ConnectedWallet } from "components/metamask";

import { getBalanceForAccounts, getLogsByAddress } from "utils/api/etherscan";
import { fetchNFTs, getNFTs } from "utils/api/nft";

const { ethers } = require('ethers');

const networks = [
  {
    name: 'Goerli',
    url: process.env.GO_URL
  },
  {
    name: 'Sepolia',
    url: process.env.SEPOLIA_URL
  }
]

const TestPage = () => {
  const [network, setNetwork] = useState("");
  const [networkId, setNetworkId] = useState("");
  const [address, setAddress] = useState("");
  const [accounts, setAccounts] = useState("");

  const onClick1 = async () => {
    await getLogsByAddress(address)
      .then((res) => {
        console.log(res);
      })
  }

  const onClick2 = async () => {
    const web3 = new Web3(window.ethereum);
    const balance = await web3.eth.getBalance(address);
    console.log(web3.utils.fromWei(balance, 'ether'));
  }

  const onClick3 = async () => {
    await window.ethereum.request({
      "method": "eth_accounts",
      "params": []
    })
      .then(res => {
        console.log(res);
        setAccounts(res);
      })
  }

  const onClick4 = async () => {
    await getBalanceForAccounts(accounts)
      .then((res) => {
        console.log(res);
      })
  }

  const onClick5 = async () => {
    getNFTs(address);
  }

  return (
    <>
      <ConnectedWallet 
        network={network}
        setNetwork={setNetwork}
        networkId={networkId}
        setNetworkId={setNetworkId}
        address={address}
        setAddress={setAddress}
      />
      <button onClick={onClick1}>
        Get Transaction logs
      </button>
      <button onClick={onClick2}>
        Get Wallet's balances
      </button>
      <button onClick={onClick3}>
        Get User's accounts
      </button>
      <button onClick={onClick4}>
        Get User's all accounts
      </button>
      <button onClick={onClick5}>
        Get User's NFTs
      </button>
    </>
  );
};

export default TestPage;
