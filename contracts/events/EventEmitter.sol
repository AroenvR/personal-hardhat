// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EventEmitter {

    // Create a type-strict structure for message events
    struct MessageEventStruct {
        uint date;
        address from; // indexed keyword 'helps finding this event'. Max 3 indexes per event. Look into this more.
        address to;
        string message;
    }

    // Initialize a type-strict Array to hold all messages received.
    MessageEventStruct[] private messageEventArray;

    // A Solidity Event Emitter
    event MessageEvent(MessageEventStruct messageEvent);

    // TOOD: Documentation
    // modifier protect this that only the address to can read the event.
    function handleMessage(address from, address to, string memory message) external {
        MessageEventStruct memory messageEvent = MessageEventStruct(block.timestamp, from, to, message);

        messageEventArray.push(messageEvent); // Secure this, it should not be readable for any other than the partaking addresses.

        emit MessageEvent(messageEvent); // Check if it got emitted.
    }
    
    function readMessageEventArray () external view returns (MessageEventStruct[] memory) {
        return messageEventArray;
    }


    string[] private stringArray;
    function addStringToArray(string memory fooString) external {
        stringArray.push(fooString);
    }

    function readStringArray() external view returns (string[] memory) {
        return stringArray;
    }










    // function createMessage () public {
    //     TradeEventStruct memory tradeEvent = TradeEventStruct(block.timestamp, msg.sender, address(0), 100);
    //     emit TradeEvent(tradeEvent);
    // }

    // /**
    //  * @dev This function emits a trade event.
    //  */
    // function trade (address to, uint amount) external {
    //     emit TradeEvent(TradeEventStruct(block.timestamp, msg.sender, to, amount));
    // }
















    enum ActionChoices { GoLeft, GoRight, GoStraight, SitStill } // Just found that on the internet, could be useful at some point.
    ActionChoices choice;
    ActionChoices constant defaultChoice = ActionChoices.GoStraight;

    function setGoStraight() public {
        choice = ActionChoices.GoStraight;
    }

    function getChoice() public view returns (ActionChoices) {
        return choice;
    }

    function getDefaultChoice() public pure returns (uint) {
        return uint(defaultChoice);
    }





    // address private immutable creator;

    // // public constructor
    // constructor() {
    //     creator = msg.sender;
    // }

    // /**
    // * public getter for this contract's address.
    // * modifier: Only the creator of this contract may call this.
    // */
    // // function getContractAddress() public onlyCreator view returns (address) {
    // //     return address(this);
    // // }

    // /**
    // * returns the creator's address.
    // * modifier: Only the creator of this contract may call this.
    // */
    // function getCreatorAddress() public onlyCreator view returns(address) {
    //     return creator;
    // }

    // //---------------Modifiers------------------

    // /**
    // * modifier to check if the sender is the creator of this board.
    // */
    // modifier onlyCreator() {
    //     require(creator == msg.sender, "Only the creator may call this.");
    //     _;
    // }

}