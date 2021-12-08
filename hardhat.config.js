require("@nomiclabs/hardhat-waffle");
const {AVALANCHE_TEST_PRIVATE_KEY, AVALANCHE_MAIN_PRIVATE_KEY} = require("./secrets")

module.exports = {
  solidity: "0.7.3",
  networks: {
    avalancheTest: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: [`0x${AVALANCHE_TEST_PRIVATE_KEY}`]
    },
    // avalancheMain: {
    //   url: 'https://api.avax.network/ext/bc/C/rpc',
    //   gasPrice: 225000000000,
    //   chainId: 43114,
    //   accounts: [`0x${AVALANCHE_MAIN_PRIVATE_KEY}`]
    // }
  }
};