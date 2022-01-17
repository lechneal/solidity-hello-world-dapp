# Solidity "Hello World" dApp
A Solidity contract & dApp that allows users to write and read a single String value.
Check out the whole tutorial here: https://medium.com/@a.a.lechner/create-an-avalanche-dapp-with-ethers-metamask-and-react-342d8d22cb30

## Setup

- Install the contract dependencies with `npm install`
- Create a file `secrets.js` with this content:
    ```
  module.exports = {
      AVALANCHE_TEST_PRIVATE_KEY: 'your private key for the avalanche fuji (test) network',
      AVALANCHE_MAIN_PRIVATE_KEY: 'your private key for the avalanche main network'
  } 
  ```
- Install the dApp (frontend) dependencies with `cd frontend && npm install`


## Build
### Contract
- run `npx hardhat compile`. This will create write the built contract files to `./artifacts`
### dApp
- in the folder `frontend`
- run `npm run start` to run it locally (during development)
- run `npm run build` to build the dApp. You will find the generated files in the `./frontend/build` folder

## Deploy
### Contract
- To the test network `npx hardhat run scripts/deploy.js --network avalancheTest`
- to the main network (⚠️ Attention: deploying to Mainnet will cost you real money) `npx hardhat run scripts/deploy.js --network avalancheMain`
### dApp
- You can host the built files in `./frontend/build` with any hosting provider of your choice.

## Additional scripts
- Read the current message `npx hardhat run scripts/getMessage.js --network [network]`
