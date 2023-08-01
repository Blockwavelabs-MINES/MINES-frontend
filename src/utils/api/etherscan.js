
export const getLogsByAddress = async (address) => {
  let returnValue;
  
  await fetch(`https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`)
    .then((res) => {
      returnValue = res.json();
    })
    
  return returnValue;
}

export const getBalanceForAccounts = async (accounts) => {
  let returnValue;

  const joinedList = accounts.join(",");

  await fetch(`https://api-goerli.etherscan.io/api?module=account&action=balancemulti&address=${joinedList}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}`)
    .then((res) => {
      returnValue = res.json();
    })
  
  return returnValue;
}