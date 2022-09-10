Currently supported chains: MetisDAO, Binance Smart Chain

## What this template has:
```
Most of the code in this template is example solutions for problems you may encounter while creating / interacting with Smart Contracts

For example:
A basic Solidity object
A basic Solidity object's service
A basic Token
A basic Token's service

Tests for all of those
Tests for wallet balances

The tests contain examples of how a frontend could interact with SmartContracts.
```

## Setup

```
Check if you have npm installed with: npm --version  
    If it is not installed: TODO

cd personal-hardhat-template  
npm i
```

## .env.example

```
Create a .env file and set up your environment variables
```

## Test

```
npm test  
or  
npm run test  
or  
npx hardhat test  

To run a specific file, pass the file location with --grep: npm test --grep ts-src/test/fooService.js
```

## Deploy

```
ts-src/deploy
npm hardhat --network [network-name] deploy // TODO: double check this is works!!!

--> old was yarn hardhat --network <remove this once verified />
```

## Find it

```
The new SmartContract will be under deployments/[network-name]
```

## Verify

```
npm hardhat --network [network-name] etherscan-verify  
// TODO: same yarn vs npm story as in Deploy.
```