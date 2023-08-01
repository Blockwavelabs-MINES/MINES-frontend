import axios from 'axios';

const ALCHEMY_KEY = process.env.ALCHEMY_API_KEY;

export const fetchNFTs = async (address) => {
  let returnValue;

  await axios.get(`https://api.opensea.io/api/v2/assets?owner=${address}&order_direction=desc&offset=1&limit=20`)
    .then((res) => {
      console.log(res);
    })
}

export const getNFTs = async (address) => {
  let returnValue;

  await axios.get(`https://eth-mainnet.g.alchemy.com/nft/v2/lk_uxgWNF_3ZIEs4MZUo4Om8_yjxMdG7/getNFTs?owner=${address}`)
    .then(res => {
      console.log(res);
    })
}