require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-etherscan')
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.7",
  networks: {
    // bsctestnet: {
    //   url: process.env.BSC_TESTNET_RPC_PROVIDER,
    //   chainId: 97,
    //       accounts:
    //       process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    // },
    // bscmainnet: {
    //   url: process.env.BSC_MAINNET_RPC_PROVIDER,
    //   chainId: 56,
    //       accounts:
    //       process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    // },
    mumbai: {
      url: process.env.POLYGON_MUMBAI_RPC_PROVIDER,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
      // rinkeby: process.env.RINKEBY_API_KEY
    }
  }
};
