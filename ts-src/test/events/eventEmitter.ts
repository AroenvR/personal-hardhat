import { ethers } from "hardhat";
import { expect } from 'chai';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Contract, Transaction } from 'ethers';
import { Address } from 'hardhat-deploy/types';

import { encrypt, decrypt } from '../util/hashHandler';

// import CryptoJS from 'crypto-js';
// import sha256 from 'crypto-js/sha256';

// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// cd personal-hardhat-template
// npx hardhat test

describe("EventEmitter contract:", () => {

  // Variable setup:
  let contract: Contract;
  let transaction: Transaction;
  let contractAddress: Address;
  let contractFunctions: any;

  let user1: SignerWithAddress;
  let user1Address: Address;
  let user2: SignerWithAddress;
  let user2Address: Address;
  let user3: SignerWithAddress;
  let user3Address: Address;

  beforeEach(async () => {
    [user1, user2, user3] = await ethers.getSigners(); // is an an array of wallet objects.
    user1Address = await user1.getAddress();
    user2Address = await user2.getAddress();
    user3Address = await user3.getAddress();

    const EventEmitter = await ethers.getContractFactory("EventEmitter");
    contract = await EventEmitter.deploy();

    contractAddress = contract.address;
    transaction = contract.deployTransaction;

    const successfullDeploy = await contract.deployed();
    contractFunctions = successfullDeploy.functions;
  });

  // TODO: Check if I need any afterEeach() functions.

  //--------------------------------------------------------------------------------------------------------------------

  it("beforeEach successfully deployed the contract", async () => {
    expect(contract).to.exist;
    expect(transaction).to.exist;
  });

  //--------------------------------------------------------------------------------------------------------------------

  it("sent something and we received an event", async () => {
    let allMessageEvents = await contract.readMessageEventArray();

    // console.log(allMessageEvents);

    expect(Array.isArray(allMessageEvents)).to.be.true;
    expect(allMessageEvents.length).to.equal(0);

    interface MessageEventInterface {
      from: Address,
      to: Address,
      message: string,
    }
    let message: MessageEventInterface = {
      from: user1Address,
      to: user2Address,
      message: "Hello World!",
    }
    await contract.handleMessage(message.from, message.to, message.message);

    allMessageEvents = await contract.readMessageEventArray();

////////////////////////////

    // Contract's string array is empty
    let allStrings = await contract.readStringArray();
    expect(Array.isArray(allStrings)).to.be.true;
    expect(allStrings.length).to.equal(0);


    const hashSalt = process.env.HASH_SALT;    

    // encrypt
    const payload = {
      some: "value",
      another: "value2",
    }
    let jsonPayload = JSON.stringify(payload);
    let encryptedPayload = encrypt(hashSalt!, jsonPayload);

    // send to contract
    await contract.addStringToArray(encryptedPayload);

    // read string from contract
    allStrings = await contract.readStringArray();
    expect(allStrings.length).to.equal(1);

    // assert
    expect(allStrings[0]).to.equal(encryptedPayload);

    let decryptedPayload = decrypt(hashSalt!, allStrings[0]);
    let jsPayload = JSON.parse(decryptedPayload);
    expect(jsPayload).to.deep.equal(payload);
    
    // console.log(CryptoJS.HmacSHA1("Message", "Key"));

    // console.log(hashedPayload);




    // console.log(foo);

    // let jsonString = JSON.stringify(foo);

    

    // console.log(allStrings);


    // allStrings = await contract.readStringArray();
    // expect(Array.isArray(allStrings)).to.be.true;
    // expect(allStrings.length).to.equal(1);

    // console.log(allStrings);

    // // console.log(jsonString);

    // let jsObject = JSON.parse(allStrings[0]);
    // console.log(jsObject);

    // console.log(jsObject);

    




    // // console.log('allMessageEvents 1');
    // console.log(allMessageEvents);

    // expect(allMessageEvents.length).to.equal(1);

    // expect(allMessageEvents.length).to.equal(0);

    // console.log('allMessageEvents 2');
    // console.log(allMessageEvents);

    // expect(Array.isArray(allMessageEvents)).to.be.true;

    // console.log('allMessageEvents 3');
    // console.log(allMessageEvents);

    // expect(allMessageEvents).to.have.length.above(0);

    // console.log('allMessageEvents 4');
    // console.log(allMessageEvents);

    // const tx = await contract.sendSomething();
    // const receipt = await tx.wait();
    // const events = receipt.events;
    // expect(events).to.exist;
    // expect(events[0].event).to.equal("SomethingSent");
  });

  //--------------------------------------------------------------------------------------------------------------------

});

//   it("greets us", async function () {
//     expect(await contract.getGreeting()).to.be.equal("Hi! You've successfully connected to the FenService contract!");
//   });

//   //--------------------------------------------------------------------------------------------------------------------

//   it("asserts the message senders", async function () {
//     // Sending a message to the SmartContract with white's wallet.
//     let initialMsgSender = await contract.getMsgSender();
//     expect(user1Address).to.be.equal(initialMsgSender);

//     // Changing the wallet with which we connect to the SmartContract with.
//     const contractAsBlack = contract.connect(user2);

//     // Sending a message to the SmartContract with black's wallet.
//     let changedMsgSender = await contractAsBlack.getMsgSender();
//     expect(user2Address).to.be.equal(changedMsgSender);
//   });

//   //--------------------------------------------------------------------------------------------------------------------

//   // TODO it creates a new fenboard and returns the current fenboard id. Do I need an ID? Might make searching arrays easier -> some hash of the two addresses could be the ID?

//   it("creates a new Foo and receives a successful transaction", async function () {
//     const transaction = await contract.createFoo();
//     await transaction.wait();

//     expect(transaction.data).to.exist;
//   });

//   //--------------------------------------------------------------------------------------------------------------------

//   it("asserts the Foo's creating address is the FooService contract's address", async function () {
//     const transaction = await contract.createFoo();
//     await transaction.wait();

//     const boardCreator = await contract.getFoosCreator();

//     expect(boardCreator).to.be.equal(contractAddress);
//   });

//   //--------------------------------------------------------------------------------------------------------------------

//   it("accepts donations", async function () {
//     const initialContractBalance = await contract.getTotalBalance();
//     expect(initialContractBalance).to.be.equal(0);

//     // Sends exactly 1.0 ether to the contract.
//     const transactionHash = await user1.sendTransaction({
//       to: contractAddress,
//       value: ethers.utils.parseEther("1.0"), 
//     });

//     const newBalance = await contract.getTotalBalance();
//     expect(newBalance).to.be.equal(ethers.utils.parseEther("1.0"));
//   });

//   //--------------------------------------------------------------------------------------------------------------------

//   it("accepts donations separated by different addresses", async function () {
//     let contractBalance = await contract.getTotalBalance();
//     expect(contractBalance).to.be.equal(0);

//     // Sends exactly 1.0 ether to the contract as white.
//     const transactionHash = await user1.sendTransaction({
//       to: contractAddress,
//       value: ethers.utils.parseEther("1.0"), 
//     });

//     contractBalance = await contract.getTotalBalance();
//     expect(contractBalance).to.be.equal(ethers.utils.parseEther("1.0"));

//     // Sends exactly 1.0 ether to the contract as black.
//     const transactionHash2 = await user2.sendTransaction({
//       to: contractAddress,
//       value: ethers.utils.parseEther("1.5"), 
//     });

//     // Asserts the total balance is equal to both donations.
//     contractBalance = await contract.getTotalBalance();
//     expect(contractBalance).to.be.equal(ethers.utils.parseEther("2.5"));

//     // Asserts that white and black have separate balances.
//     const balanceOfWhite = await contract.getMyBalance();
//     expect(balanceOfWhite).to.be.equal(ethers.utils.parseEther("1.0"));

//     const contractAsBlack = contract.connect(user2);
//     const balanceOfBlack = await contractAsBlack.getMyBalance();
//     expect(balanceOfBlack).to.be.equal(ethers.utils.parseEther("1.5"));
//   });

//   //--------------------------------------------------------------------------------------------------------------------

//   it("only allows correct withdrawals", async function () {
//     let contractBalance = await contract.getTotalBalance();
//     expect(contractBalance).to.be.equal(0);

//     // Sends exactly 1.0 ether to the contract as white.
//     const transactionHash = await user1.sendTransaction({
//       to: contractAddress,
//       value: ethers.utils.parseEther("1.0"), 
//     });

//     // Sends exactly 1.5 ether to the contract as black.
//     const transactionHash2 = await user2.sendTransaction({
//       to: contractAddress,
//       value: ethers.utils.parseEther("1.5"), 
//     });

//     // Asserts the contract's total balance.
//     contractBalance = await contract.getTotalBalance();
//     expect(contractBalance).to.be.equal(ethers.utils.parseEther("2.5"));
    
//     // Withdraw 1.0 ether from the contract.
//     await contract.withdraw(ethers.utils.parseEther("1.0"));

//     contractBalance = await contract.getTotalBalance();
//     expect(contractBalance).to.be.equal(ethers.utils.parseEther("1.5"));
    
//     // Assert that users can only withdraw equal to or less than they have donated.
//     const contractAsSpectator = contract.connect(user3);
//     expect(contractAsSpectator.withdraw(ethers.utils.parseEther("1.0"))).to.be.reverted;
//   });
  
// });
